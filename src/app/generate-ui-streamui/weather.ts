import type { DeepPartial } from "ai";
import { z } from "zod";

export const weatherSchema = z.object({
  summary: z
    .string()
    .describe(
      "uma previsão do tempo da região, com a temperatura e previsão (nublado, ensolarado ou chuvoso), adicione no texto o nome da cidade"
    ),
  climate: z
    .string()
    .describe(
      "o tempo atual da região, descreva com apenas uma palavra (nublado, ensolarado ou chuvoso)."
    ),
  details: z
    .string()
    .describe(
      "adicione detalhes a previsão do tempo, como humidade, índices de UV se forem muito altos, qualidade do ar e etc. Seja descritivo em forma de texto"
    ),
});

export type Weather = DeepPartial<typeof weatherSchema>;
