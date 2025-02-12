import { z } from 'zod';

export const ColorSchema = z.object({
  color_id: z.number(),
  name: z.string(),
});

export type Color = z.infer<typeof ColorSchema>;

export const getColorClass = (colorName = 'gray'): string => {
  const colorMap: Record<string, string> = {
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
    pink: 'bg-pink-500',
    black: 'bg-black',
    gray: 'bg-gray-500',
  };
  return colorMap[colorName];
};
