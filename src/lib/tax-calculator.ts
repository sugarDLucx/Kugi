/**
 * BIR Revenue Regulations No. 16-2023 Tax Withholding Engine for Kugi.ph
 * Automates 0.5% Creditable Withholding Tax (CWT) calculation and BIR Form 2307 dossier preparation.
 */

export const BIR_CWT_THRESHOLD = 500000; // PHP 500,000.00 statutory annual threshold
export const BIR_CWT_RATE = 0.005; // 0.5% effective CWT rate (1% on 50% gross remittance)
export const PROVINCIAL_RDO = "RDO 112 - Tagum City, Davao del Norte";

export interface TaxComputationResult {
  grossAmount: number;
  isTaxWithholdingApplicable: boolean;
  withholdingTaxAmount: number;
  netFreelancerDisbursement: number;
  platformEscrowFee: number;
  atcCode: string;
  rdoJurisdiction: string;
}

export interface Bir2307Dossier {
  certificateNumber: string;
  quarter: string;
  payeeName: string;
  payeeTin: string;
  payeeAddress: string;
  payorName: string;
  payorTin: string;
  grossAmount: number;
  taxWithheld: number;
  dateGenerated: string;
  atcCode: string;
}

/**
 * Format any currency value in standard Philippine Peso format with comma separators.
 */
export function formatCurrency(amount: number | string): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(num)) return "₱0.00";
  return (
    "₱" +
    num.toLocaleString("en-PH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

/**
 * Compute BIR RR 16-2023 CWT deductions for a milestone disbursement.
 */
export function calculateTaxWithholding(
  grossAmount: number,
  annualEarningsSoFar: number = 620000,
  hasSwornDeclaration: boolean = false
): TaxComputationResult {
  const platformEscrowFee = 0.0; // 0% promotional during Start in DavNor launch
  const isAboveThreshold = annualEarningsSoFar >= BIR_CWT_THRESHOLD;
  const isTaxWithholdingApplicable = isAboveThreshold && !hasSwornDeclaration;

  const withholdingTaxAmount = isTaxWithholdingApplicable
    ? Math.round(grossAmount * BIR_CWT_RATE * 100) / 100
    : 0.0;

  const netFreelancerDisbursement =
    grossAmount - withholdingTaxAmount - platformEscrowFee;

  return {
    grossAmount,
    isTaxWithholdingApplicable,
    withholdingTaxAmount,
    netFreelancerDisbursement,
    platformEscrowFee,
    atcCode: "WI700", // Online marketplace seller CWT
    rdoJurisdiction: PROVINCIAL_RDO,
  };
}

/**
 * Generate structured Form 2307 voucher metadata.
 */
export function generateBir2307Voucher(
  payeeName: string,
  payeeTin: string,
  payeeAddress: string,
  grossAmount: number,
  taxWithheld: number
): Bir2307Dossier {
  const now = new Date();
  const quarter = `Q${Math.floor(now.getMonth() / 3) + 1} ${now.getFullYear()}`;

  return {
    certificateNumber: `2307-DVO-${Math.floor(100000 + Math.random() * 900000)}`,
    quarter,
    payeeName,
    payeeTin: payeeTin || "009-842-114-000",
    payeeAddress,
    payorName: "Kugi Escrow Technologies Inc.",
    payorTin: "010-332-901-000",
    grossAmount,
    taxWithheld,
    dateGenerated: now.toISOString().split("T")[0],
    atcCode: "WI700",
  };
}
