import type { DeepPartial } from "ai";
import { z } from "zod";

export const weatherSchema = z.object({
  summary: z
    .string()
    .describe(
      "a weather forecast for the region, including temperature and forecast (cloudy, sunny, or rainy), include the name of the city in the text"
    ),
  climate: z
    .string()
    .describe(
      "the current weather of the region, describe with just one word (cloudy, sunny, or rainy)."
    ),
  details: z
    .string()
    .describe(
      "add details to the weather forecast, such as humidity, UV indices if they are very high, air quality, etc. Be descriptive in text form"
    ),
});

export type Weather = DeepPartial<typeof weatherSchema>;
