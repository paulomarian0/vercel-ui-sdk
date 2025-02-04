import { DeepPartial } from "ai";
import { z } from "zod";

export const weatherSchema = z.object({
  summary: z
    .string()
    .describe(
      "um resumo do clima na região, com a temperatura, adicione no texto o nome da cidade"
    ),
  yesterday: z
    .string()
    .describe("adicione a previsão de ontem, com a temperatura inclusa"),
  tomorrow: z
    .string()
    .describe("adicione a previsão de amanhã, com a temperatura inclusa"),
});

export type Weather = DeepPartial<typeof weatherSchema>;
