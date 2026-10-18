import { NextRequest, NextResponse } from "next/server";
import { getNotificationStatus, sendPortfolioNotification } from "@/lib/notifications";
import { verifyAuth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const user = verifyAuth(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const status = getNotificationStatus();
  return NextResponse.json(status);
}

export async function POST(req: NextRequest) {
  const user = verifyAuth(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const status = getNotificationStatus();
  if (!status.anyConfigured) {
    return NextResponse.json(
      {
        error: "No notification channels configured",
        message:
          "Configure at least one channel in your .env.local file: TELEGRAM_BOT_TOKEN & TELEGRAM_CHAT_ID, DISCORD_WEBHOOK_URL, or RESEND_API_KEY.",
      },
      { status: 400 }
    );
  }

  const testPayload = {
    name: user.name || "Portfolio Admin",
    email: user.email || "admin@portfolio.local",
    subject: "Test Notification",
    message:
      "This is a test notification from your Portfolio Dashboard! Your notification channel is working perfectly.",
  };

  const result = await sendPortfolioNotification(testPayload);

  return NextResponse.json({
    success: true,
    message: "Test notifications dispatched",
    results: result.results,
  });
}
