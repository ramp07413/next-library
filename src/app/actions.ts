// @/app/actions.ts
"use server";

import { prioritizeAlerts } from "@/ai/flows/prioritize-alerts";
import { mockAlerts, mockUserContext } from "@/app/lib/alerts-data";

export async function getPrioritizedAlerts(role: "company" | "library" | "student") {
  const alerts = mockAlerts[role] || [];
  const severityOrder = { high: 1, medium: 2, low: 3 };
  const sortedAlerts = [...alerts].sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

  // Check if API key is available. If not, return sorted alerts without calling AI.
  if (!process.env.GEMINI_API_KEY && !process.env.GOOGLE_API_KEY) {
    console.warn("GEMINI_API_KEY or GOOGLE_API_KEY not set. Returning sorted alerts without AI prioritization.");
    return sortedAlerts;
  }

  try {
    const userContext = mockUserContext[role];
    if (!userContext || !alerts) {
      return [];
    }
    const prioritized = await prioritizeAlerts({ alerts, userContext });
    return prioritized;
  } catch (error) {
    console.error("Error prioritizing alerts:", error);
    // Return alerts sorted by severity as a fallback
    return sortedAlerts;
  }
}
