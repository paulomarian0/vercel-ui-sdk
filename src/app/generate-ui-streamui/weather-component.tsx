"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Weather } from "./weather";
import { Sun, Cloud, CloudRain } from "lucide-react";

export const WeatherComponent = ({ weather }: { weather?: Weather }) => {
	const [showDetails, setShowDetails] = useState(false);

	const getBackgroundClass = () => {
		switch (weather?.climate) {
			case "sunny":
				return "bg-gradient-to-b from-yellow-400 to-orange-500 border-yellow-600";
			case "cloudy":
				return "bg-gradient-to-b from-gray-300 to-gray-600 border-gray-500";
			case "rainy":
				return "bg-gradient-to-b from-blue-400 to-blue-700 border-blue-600";
			default:
				return "bg-gray-200 border-gray-400";
		}
	};

	const getWeatherIcon = () => {
		switch (weather?.climate) {
			case "sunny":
				return <Sun size={40} className="text-yellow-200 opacity-30" />;
			case "cloudy":
				return <Cloud size={40} className="text-gray-300 opacity-30" />;
			case "rainy":
				return <CloudRain size={40} className="text-blue-300 opacity-30" />;
			default:
				return null;
		}
	};

	return (
		<div
			className={`p-4 sm:p-6 rounded-lg shadow-md max-w-prose mx-auto border text-white relative overflow-hidden ${getBackgroundClass()}`}
		>
			<div className="absolute top-2 sm:top-4 right-2">{getWeatherIcon()}</div>
			<div className="space-y-4">
				<p className="text-base sm:text-lg lg:text-xl font-medium drop-shadow-lg">
					{weather?.summary || "No summary available."}
				</p>

				{showDetails && (
					<div className="space-y-2 bg-white bg-opacity-20 p-3 sm:p-4 rounded-lg backdrop-blur-md">
						<h3 className="text-gray-100 font-semibold text-sm sm:text-base lg:text-lg">
							Details:
						</h3>
						<p className="text-gray-100 text-sm sm:text-base lg:text-lg">
							{weather?.details || "No forecast available for yesterday."}
						</p>
					</div>
				)}
			</div>

			<div className="mt-4">
				<Button
					onClick={() => setShowDetails(!showDetails)}
					className="w-full sm:w-auto bg-white text-gray-800 hover:bg-gray-300 shadow-md text-sm sm:text-base lg:text-lg"
					variant={showDetails ? "secondary" : "default"}
				>
					{showDetails ? "Hide details" : "Show details"}
				</Button>
			</div>
		</div>
	);
};
