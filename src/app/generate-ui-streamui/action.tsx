"use server";

import { createAI, getMutableAIState, streamUI } from "ai/rsc";
import { ReactNode } from "react";
import { z } from "zod";
import { nanoid } from "nanoid";
import { generateObject } from "ai";
import { groq } from "@ai-sdk/groq";
import { WeatherComponent } from "./weather-component";
import { weatherSchema } from "./weather";

export interface ServerMessage {
	role: "user" | "assistant";
	content: string;
}

interface GroqChatSettings {
	apiKey: string;
}

export interface ClientMessage {
	id: string;
	role: "user" | "assistant";
	display: ReactNode;
}

export async function continueConversation(
	input: string,
): Promise<ClientMessage> {
	"use server";

	const history = getMutableAIState();

	const model = groq("llama3-70b-8192", {
		apiKey: process.env.GROQ_API_KEY as string,
	});

	const result = await streamUI({
		model: model,
		messages: [...history.get(), { role: "user", content: input }],
		text: ({ content, done }) => {
			if (done) {
				history.done((messages: ServerMessage[]) => [
					...messages,
					{ role: "assistant", content },
				]);
			}

			return <div>{content}</div>;
		},
		tools: {
			getWeather: {
				description: "Obter o clima para um local específico",
				parameters: z.object({
					location: z.string().describe("o local para obter o clima"),
				}),
				generate: async function* ({ location }) {
					yield <div>Carregando dados do clima...</div>;
					const weather = await generateObject({
						model: model,
						schema: weatherSchema,
						prompt: `Obtenha o clima com base neste local: ${location}`,
					});
					return <WeatherComponent weather={weather.object} />;
				},
			},
		},
	});

	return {
		id: nanoid(),
		role: "assistant",
		display: result.value,
	};
}

export const AI = createAI<ServerMessage[], ClientMessage[]>({
	actions: {
		continueConversation,
	},
	initialAIState: [],
	initialUIState: [],
});
