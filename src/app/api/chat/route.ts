import { NextResponse } from "next/server";
import { scanMessageForDisintermediation } from "@/lib/anti-scam-regex";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text, orderNumber, sender } = body;

    if (!text) {
      return NextResponse.json(
        { error: "Message content cannot be empty" },
        { status: 400 }
      );
    }

    const scanResult = scanMessageForDisintermediation(text);

    return NextResponse.json({
      success: true,
      orderNumber,
      sender,
      text,
      scanResult,
      isFlagged: scanResult.isSuspicious,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to process chat message" },
      { status: 500 }
    );
  }
}
