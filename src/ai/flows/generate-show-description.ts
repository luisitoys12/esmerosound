'use server';

/**
 * @fileOverview Generates show descriptions based on music library and programming schedule.
 *
 * - generateShowDescription - A function that generates the show description.
 * - GenerateShowDescriptionInput - The input type for the generateShowDescription function.
 * - GenerateShowDescriptionOutput - The return type for the generateShowDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateShowDescriptionInputSchema = z.object({
  showName: z.string().describe('The name of the show.'),
  musicLibraryDescription: z
    .string()
    .describe('The description of the music library.'),
  programmingSchedule: z
    .string()
    .describe('The programming schedule of the radio.'),
});

export type GenerateShowDescriptionInput = z.infer<
  typeof GenerateShowDescriptionInputSchema
>;

const GenerateShowDescriptionOutputSchema = z.object({
  showDescription: z.string().describe('The generated show description.'),
});

export type GenerateShowDescriptionOutput = z.infer<
  typeof GenerateShowDescriptionOutputSchema
>;

export async function generateShowDescription(
  input: GenerateShowDescriptionInput
): Promise<GenerateShowDescriptionOutput> {
  return generateShowDescriptionFlow(input);
}

const generateShowDescriptionPrompt = ai.definePrompt({
  name: 'generateShowDescriptionPrompt',
  input: {schema: GenerateShowDescriptionInputSchema},
  output: {schema: GenerateShowDescriptionOutputSchema},
  prompt: `You are a radio show description writer.

  You will generate a show description based on the music library and programming schedule.

  Music Library Description: {{{musicLibraryDescription}}}
  Programming Schedule: {{{programmingSchedule}}}
  Show Name: {{{showName}}}

  Write a engaging show description for the show.  The description should be 2-3 sentences long.
  `,
});

const generateShowDescriptionFlow = ai.defineFlow(
  {
    name: 'generateShowDescriptionFlow',
    inputSchema: GenerateShowDescriptionInputSchema,
    outputSchema: GenerateShowDescriptionOutputSchema,
  },
  async input => {
    const {output} = await generateShowDescriptionPrompt(input);
    return output!;
  }
);
