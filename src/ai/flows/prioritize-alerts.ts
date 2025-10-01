'use server';

/**
 * @fileOverview This file defines a Genkit flow for prioritizing alerts based on urgency and relevance.
 *
 * It includes:
 * - `prioritizeAlerts`: A function that takes a list of alerts and user context as input and returns a prioritized list of alerts.
 * - `PrioritizeAlertsInput`: The input type for the `prioritizeAlerts` function.
 * - `PrioritizeAlertsOutput`: The output type for the `prioritizeAlerts` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AlertSchema = z.object({
  id: z.string().describe('Unique identifier for the alert.'),
  message: z.string().describe('The content of the alert message.'),
  timestamp: z.string().describe('The timestamp of when the alert was generated (ISO format).'),
  category: z.string().describe('Category of the alert (e.g., payment, system, announcement).'),
  severity: z.enum(['high', 'medium', 'low']).describe('Severity level of the alert.'),
  status: z.enum(['read', 'unread']).describe('The read status of the alert.'),
  starred: z.boolean().describe('Whether the alert is starred or not.'),
});

export type Alert = z.infer<typeof AlertSchema>;

const PrioritizeAlertsInputSchema = z.object({
  alerts: z.array(AlertSchema).describe('An array of alerts to be prioritized.'),
  userContext: z
    .string()
    .describe(
      'Context about the user, including role (student, library admin, company admin), preferences, and recent activity.'
    ),
});

export type PrioritizeAlertsInput = z.infer<typeof PrioritizeAlertsInputSchema>;

const PrioritizeAlertsOutputSchema = z.array(AlertSchema).describe('A prioritized list of alerts.');

export type PrioritizeAlertsOutput = z.infer<typeof PrioritizeAlertsOutputSchema>;

export async function prioritizeAlerts(input: PrioritizeAlertsInput): Promise<PrioritizeAlertsOutput> {
  return prioritizeAlertsFlow(input);
}

const prioritizeAlertsPrompt = ai.definePrompt({
  name: 'prioritizeAlertsPrompt',
  input: {schema: PrioritizeAlertsInputSchema},
  output: {schema: PrioritizeAlertsOutputSchema},
  prompt: `You are an AI assistant specializing in prioritizing alerts for users of a library management platform.

Given a list of alerts and user context, your task is to prioritize the alerts based on their urgency and relevance to the user.

Consider the following factors when prioritizing:

*   **Severity**: High severity alerts should be prioritized higher than medium or low severity alerts.
*   **Category**: Alerts related to payments or security should be prioritized higher for all users. Alerts related to seat assignments or dues are high priority for students.
*   **User Context**: Tailor the prioritization based on the user's role and recent activity. For example, overdue payment alerts are more critical for students with outstanding dues.
*   **Timestamp:** More recent alerts should be considered higher priority.

Alerts:
{{#each alerts}}
  - ID: {{this.id}}, Message: {{this.message}}, Timestamp: {{this.timestamp}}, Category: {{this.category}}, Severity: {{this.severity}}, Status: {{this.status}}, Starred: {{this.starred}}
{{/each}}

User Context: {{{userContext}}}

Prioritized Alerts (most important first):
`,
});

const prioritizeAlertsFlow = ai.defineFlow(
  {
    name: 'prioritizeAlertsFlow',
    inputSchema: PrioritizeAlertsInputSchema,
    outputSchema: PrioritizeAlertsOutputSchema,
  },
  async input => {
    const {output} = await prioritizeAlertsPrompt(input);
    return output!;
  }
);
