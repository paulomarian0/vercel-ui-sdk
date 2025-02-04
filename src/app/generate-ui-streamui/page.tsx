"use client";

import { useState } from "react";
import type { ClientMessage } from "./action";
import { useActions, useUIState } from "ai/rsc";
import { nanoid } from "nanoid";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandInput,
	CommandList,
	CommandItem,
	CommandEmpty,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cities } from "@/constants/cities";

export default function GenerateUI() {
	const [input, setInput] = useState<string>("");
	const [open, setOpen] = useState(false);
	const [conversation, setConversation] = useUIState();
	const { continueConversation } = useActions();

	return (
		<div className="min-h-screen bg-gray-300 p-4 sm:p-6 flex items-center justify-center">
			<div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-4 sm:p-6 space-y-4 mb-20 sm:mb-60">
				<form
					onSubmit={async (e) => {
						e.preventDefault();
						setInput("");
						setConversation((currentConversation: ClientMessage[]) => [
							...currentConversation,
							{ id: nanoid(), role: "user", display: input },
						]);

						const message = await continueConversation(input);

						setConversation((currentConversation: ClientMessage[]) => [
							...currentConversation,
							message,
						]);
					}}
					className="flex flex-col sm:flex-row gap-2"
				>
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								role="combobox"
								aria-expanded={open}
								className="flex-1 justify-between text-sm sm:text-base lg:text-lg"
							>
								{input || "Search for a city..."}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-[300px] p-4">
							<Command>
								<CommandInput
									placeholder="Search for a city..."
									value={input}
									onValueChange={(value) => setInput(value)}
									className="text-sm sm:text-base lg:text-lg"
								/>
								<CommandList>
									<CommandEmpty className="text-sm sm:text-base lg:text-lg">
										No city found.
									</CommandEmpty>
									{cities
										.filter((city) =>
											city.toLowerCase().includes(input.toLowerCase()),
										)
										.map((city) => (
											<CommandItem
												key={nanoid()}
												value={city}
												onSelect={() => {
													setInput(city);
													setOpen(false);
												}}
												className="text-sm sm:text-base lg:text-lg"
											>
												{city}
											</CommandItem>
										))}
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>

					<Button
						type="submit"
						className="w-full sm:w-auto text-sm sm:text-base lg:text-lg"
					>
						Search
					</Button>
				</form>

				<div className="space-y-4">
					{conversation.map((message: ClientMessage) => (
						<div
							key={message.id}
							className={`p-4 rounded-lg text-sm sm:text-base lg:text-lg ${
								message.role === "user"
									? "bg-blue-50 text-blue-900 ml-auto"
									: "bg-gray-50 text-gray-900"
							}`}
						>
							{message.display}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
