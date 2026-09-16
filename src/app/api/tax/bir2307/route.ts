import { NextResponse } from "next/server";
import { generateBir2307Voucher, calculateTaxWithholding } from "@/lib/tax-calculator";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const payee = searchParams.get("payee") || "Ar. Mark Tan, UAP";
    const tin = searchParams.get("tin") || "284-910-382-000";
    const address = searchParams.get("address") || "Mankilam, Tagum City, Davao del Norte";
    const amountParam = searchParams.get("amount");
    const grossAmount = amountParam ? parseFloat(amountParam) : 38500.0;

    const taxResult = calculateTaxWithholding(grossAmount);
    const voucher = generateBir2307Voucher(
      payee,
      tin,
      address,
      grossAmount,
      taxResult.withholdingTaxAmount
    );

    return NextResponse.json({
      success: true,
      voucher,
      legalFramework: "BIR Revenue Regulations No. 16-2023 / RMC No. 8-2024",
      rdoBranch: "RDO 112 - Tagum City, Davao del Norte",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to generate BIR Form 2307 voucher" },
      { status: 500 }
    );
  }
}
