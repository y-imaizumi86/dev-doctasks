import { z } from 'zod';

export const ColorSchema = z.object({
  color_id: z.number(),
  name: z.string(),
});

export type Color = z.infer<typeof ColorSchema>
