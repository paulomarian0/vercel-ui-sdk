"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Weather } from "./weather";

export const WeatherComponent = ({ weather }: { weather?: Weather }) => {
	const [showDetails, setShowDetails] = useState(false);

	return (
		<div className="bg-white p-6 rounded-lg shadow-md max-w-prose mx-auto border border-gray-200">
			<div className="space-y-4">
				<p className="text-gray-700 text-lg font-medium">
					{weather?.summary || "Nenhum resumo disponível."}
				</p>

				{showDetails && (
					<div className="space-y-2">
						<h3 className="text-gray-800 font-semibold">Outros dias:</h3>
						<p className="text-gray-700">
							{weather?.yesterday || "Nenhuma previsão disponível para ontem."}
						</p>

						<p className="text-gray-700">
							{weather?.tomorrow || "Nenhuma previsão disponível para amanhã."}
						</p>
					</div>
				)}
			</div>

			<div className="mt-4">
				<Button
					onClick={() => setShowDetails(!showDetails)}
					className="w-full sm:w-auto"
					variant={showDetails ? "secondary" : "default"}
				>
					{showDetails ? "Ocultar detalhes" : "Ver próximos dias"}
				</Button>
			</div>
		</div>
	);
};
