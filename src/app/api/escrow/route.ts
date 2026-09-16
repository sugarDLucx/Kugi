import { NextResponse } from "next/server";
import { transitionMilestone, MilestoneState } from "@/lib/escrow-engine";
import { calculateTaxWithholding } from "@/lib/tax-calculator";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, currentMilestone } = body;

    if (!action || !currentMilestone) {
      return NextResponse.json(
        { error: "Missing required action or milestone data" },
        { status: 400 }
      );
    }

    const updated = transitionMilestone(currentMilestone as MilestoneState, action);
    const tax = calculateTaxWithholding(updated.escrowDeposit);

    return NextResponse.json({
      success: true,
      milestone: updated,
      taxSummary: tax,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to process escrow transition" },
      { status: 500 }
    );
  }
}
