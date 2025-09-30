// @/app/actions.ts
"use server";

import { prioritizeAlerts } from "@/ai/flows/prioritize-alerts";
import { mockAlerts, mockUserContext } from "@/app/lib/alerts-data";

export async function getPrioritizedAlerts(role: "company" | "library" | "student") {
  try {
    const userContext = mockUserContext[role];
    const alerts = mockAlerts[role];
    if (!userContext || !alerts) {
      return [];
    }
    const prioritized = await prioritizeAlerts({ alerts, userContext });
    return prioritized;
  } catch (error) {
    console.error("Error prioritizing alerts:", error);
    // Return alerts sorted by severity as a fallback
    const alerts = mockAlerts[role] || [];
    const severityOrder = { high: 1, medium: 2, low: 3 };
    return alerts.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);
  }
}
