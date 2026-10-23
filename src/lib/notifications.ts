import nodemailer from "nodemailer";

export interface NotificationPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  sourceUrl?: string;
}

export interface NotificationStatus {
  telegram: boolean;
  discord: boolean;
  resend: boolean;
  smtp: boolean;
  whatsapp: boolean;
  sms: boolean;
  anyConfigured: boolean;
  recipientEmail?: string;
  recipientPhone?: string;
}

/**
 * Checks which notification channels are configured in environment variables.
 */
export function getNotificationStatus(): NotificationStatus {
  const telegram = Boolean(
    process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID
  );
  const discord = Boolean(process.env.DISCORD_WEBHOOK_URL);
  const resend = Boolean(process.env.RESEND_API_KEY);

  // SMTP (Gmail or custom mail server)
  const smtp = Boolean(
    process.env.SMTP_USER &&
      (process.env.SMTP_PASS || process.env.SMTP_PASSWORD)
  );

  // WhatsApp can be configured either via CallMeBot (free instant) or Twilio WhatsApp
  const whatsappCallMeBot = Boolean(
    process.env.CALLMEBOT_PHONE && process.env.CALLMEBOT_API_KEY
  );
  const whatsappTwilio = Boolean(
    process.env.TWILIO_ACCOUNT_SID &&
      process.env.TWILIO_AUTH_TOKEN &&
      process.env.TWILIO_WHATSAPP_NUMBER &&
      process.env.NOTIFICATION_PHONE_NUMBER
  );
  const whatsapp = whatsappCallMeBot || whatsappTwilio;

  // SMS Text via Twilio
  const sms = Boolean(
    process.env.TWILIO_ACCOUNT_SID &&
      process.env.TWILIO_AUTH_TOKEN &&
      process.env.TWILIO_PHONE_NUMBER &&
      process.env.NOTIFICATION_PHONE_NUMBER
  );

  return {
    telegram,
    discord,
    resend,
    smtp,
    whatsapp,
    sms,
    anyConfigured: telegram || discord || resend || smtp || whatsapp || sms,
    recipientEmail:
      (process.env.NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL || process.env.SMTP_USER || "")
        .split(",")
        .map((e) => e.trim())
        .filter((e) => e && !e.toLowerCase().endsWith("@chaitanya.dev"))
        .join(", ") || undefined,
    recipientPhone:
      process.env.CALLMEBOT_PHONE || process.env.NOTIFICATION_PHONE_NUMBER || undefined,
  };
}

/**
 * Send notification to Telegram bot
 */
async function sendTelegramNotification(payload: NotificationPayload) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error("Telegram credentials not configured");
  }

  const text = [
    `📬 <b>New Portfolio Message!</b>`,
    ``,
    `👤 <b>Name:</b> ${escapeHtml(payload.name)}`,
    `📧 <b>Email:</b> ${escapeHtml(payload.email)}`,
    `📌 <b>Subject:</b> ${escapeHtml(payload.subject)}`,
    ``,
    `💬 <b>Message:</b>`,
    `<blockquote>${escapeHtml(payload.message)}</blockquote>`,
    ``,
    `⏰ <i>${new Date().toLocaleString()}</i>`,
  ].join("\n");

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Telegram error (${res.status}): ${errorText}`);
  }

  return true;
}

/**
 * Send notification to Discord via Webhook
 */
async function sendDiscordNotification(payload: NotificationPayload) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    throw new Error("Discord webhook URL not configured");
  }

  const embed = {
    title: "📬 New Portfolio Message",
    description: `You received a new inquiry from your portfolio website.`,
    color: 0x6366f1, // Indigo
    fields: [
      { name: "👤 Sender", value: payload.name, inline: true },
      { name: "📧 Email", value: payload.email, inline: true },
      { name: "📌 Subject", value: payload.subject, inline: false },
      {
        name: "💬 Message",
        value:
          payload.message.length > 1000
            ? payload.message.substring(0, 997) + "..."
            : payload.message,
        inline: false,
      },
    ],
    timestamp: new Date().toISOString(),
    footer: {
      text: "Portfolio Notification System",
    },
  };

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "Portfolio Bot",
      avatar_url: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
      embeds: [embed],
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Discord error (${res.status}): ${errorText}`);
  }

  return true;
}

/**
 * Send email notification via Gmail / Custom SMTP (using nodemailer)
 */
async function sendSmtpNotification(payload: NotificationPayload) {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
  const rawTo =
    process.env.NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL || user;

  if (!user || !pass || !rawTo) {
    throw new Error(
      "SMTP credentials not fully configured (need SMTP_USER, SMTP_PASS, NOTIFICATION_EMAIL)"
    );
  }

  // Parse comma-separated emails, trim whitespace, and filter out placeholder domains like @chaitanya.dev
  const recipients = rawTo
    .split(",")
    .map((e) => e.trim())
    .filter((e) => e && !e.toLowerCase().endsWith("@chaitanya.dev"));

  if (recipients.length === 0) {
    if (user && !user.toLowerCase().endsWith("@chaitanya.dev")) {
      recipients.push(user.trim());
    } else {
      recipients.push("chaitanya7101@gmail.com");
    }
  }

  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT) || 465;
  const secure = port === 465;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: user.trim(),
      pass: pass.replace(/\s+/g, ""),
    },
  });

  const replyTo =
    payload.email && !payload.email.toLowerCase().endsWith("@chaitanya.dev")
      ? payload.email
      : undefined;

  const mailOptions = {
    from: `"Portfolio Alert" <${user}>`,
    to: recipients.join(", "),
    replyTo,
    subject: `[Portfolio Inquiry] ${payload.subject} (from ${payload.name})`,
    text: `You received a new message on your portfolio:\n\nName: ${payload.name}\nEmail: ${payload.email}\nSubject: ${payload.subject}\n\nMessage:\n${payload.message}\n\nReceived at: ${new Date().toLocaleString()}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #eaeaea; border-radius: 8px;">
        <h2 style="color: #6366f1; margin-top: 0;">📬 New Message on Your Portfolio</h2>
        <p style="margin: 4px 0;"><strong>From:</strong> ${escapeHtml(payload.name)} (&lt;<a href="mailto:${payload.email}">${payload.email}</a>&gt;)</p>
        <p style="margin: 4px 0;"><strong>Subject:</strong> ${escapeHtml(payload.subject)}</p>
        <div style="margin-top: 16px; padding: 16px; background: #f9f9fb; border-left: 4px solid #6366f1; border-radius: 4px;">
          <p style="margin: 0; white-space: pre-wrap; font-size: 15px; line-height: 1.5; color: #333;">${escapeHtml(payload.message)}</p>
        </div>
        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #eaeaea;">
          <a href="mailto:${payload.email}?subject=Re: ${encodeURIComponent(payload.subject)}" style="display: inline-block; background: #6366f1; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: 500;">Reply directly to ${escapeHtml(payload.name)}</a>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
  return true;
}

/**
 * Send email notification via Resend
 */
async function sendResendNotification(payload: NotificationPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const rawTo =
    process.env.NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL;

  if (!apiKey || !rawTo) {
    throw new Error("Resend API key or notification recipient email not configured");
  }

  const recipients = rawTo
    .split(",")
    .map((e) => e.trim())
    .filter((e) => e && !e.toLowerCase().endsWith("@chaitanya.dev"));

  if (recipients.length === 0) {
    recipients.push("chaitanya7101@gmail.com");
  }

  const fromEmail =
    process.env.RESEND_FROM_EMAIL || "Portfolio Alert <onboarding@resend.dev>";

  const replyTo =
    payload.email && !payload.email.toLowerCase().endsWith("@chaitanya.dev")
      ? payload.email
      : undefined;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: recipients,
      reply_to: replyTo,
      subject: `[Portfolio Contact] ${payload.subject} (from ${payload.name})`,
      text: `You received a new message on your portfolio:\n\nName: ${payload.name}\nEmail: ${payload.email}\nSubject: ${payload.subject}\n\nMessage:\n${payload.message}\n\nReceived at: ${new Date().toLocaleString()}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #eaeaea; border-radius: 8px;">
          <h2 style="color: #6366f1; margin-top: 0;">📬 New Message on Your Portfolio</h2>
          <p style="margin: 4px 0;"><strong>From:</strong> ${escapeHtml(payload.name)} (&lt;<a href="mailto:${payload.email}">${payload.email}</a>&gt;)</p>
          <p style="margin: 4px 0;"><strong>Subject:</strong> ${escapeHtml(payload.subject)}</p>
          <div style="margin-top: 16px; padding: 16px; background: #f9f9fb; border-left: 4px solid #6366f1; border-radius: 4px;">
            <p style="margin: 0; white-space: pre-wrap; font-size: 15px; line-height: 1.5; color: #333;">${escapeHtml(payload.message)}</p>
          </div>
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #eaeaea;">
            <a href="mailto:${payload.email}?subject=Re: ${encodeURIComponent(payload.subject)}" style="display: inline-block; background: #6366f1; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: 500;">Reply to ${escapeHtml(payload.name)}</a>
          </div>
        </div>
      `,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Resend error (${res.status}): ${errorText}`);
  }

  return true;
}

/**
 * Send WhatsApp notification (supports CallMeBot or Twilio WhatsApp)
 */
async function sendWhatsAppNotification(payload: NotificationPayload) {
  // Method 1: Free CallMeBot WhatsApp Gateway
  if (process.env.CALLMEBOT_PHONE && process.env.CALLMEBOT_API_KEY) {
    const phone = process.env.CALLMEBOT_PHONE.replace(/[^0-9]/g, "");
    const apiKey = process.env.CALLMEBOT_API_KEY;

    const messageText = [
      `📬 *New Portfolio Message!*`,
      `*From:* ${payload.name} (${payload.email})`,
      `*Subject:* ${payload.subject}`,
      `*Message:*`,
      payload.message,
    ].join("\n");

    const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(
      phone
    )}&text=${encodeURIComponent(messageText)}&apikey=${encodeURIComponent(apiKey)}`;

    const res = await fetch(url, { method: "GET" });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`CallMeBot WhatsApp error: ${err}`);
    }
    return true;
  }

  // Method 2: Twilio WhatsApp
  if (
    process.env.TWILIO_ACCOUNT_SID &&
    process.env.TWILIO_AUTH_TOKEN &&
    process.env.TWILIO_WHATSAPP_NUMBER &&
    process.env.NOTIFICATION_PHONE_NUMBER
  ) {
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    const from = process.env.TWILIO_WHATSAPP_NUMBER.startsWith("whatsapp:")
      ? process.env.TWILIO_WHATSAPP_NUMBER
      : `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`;
    const to = process.env.NOTIFICATION_PHONE_NUMBER.startsWith("whatsapp:")
      ? process.env.NOTIFICATION_PHONE_NUMBER
      : `whatsapp:${process.env.NOTIFICATION_PHONE_NUMBER}`;

    const bodyText = `📬 New Portfolio Message\nFrom: ${payload.name} (${payload.email})\nSubject: ${payload.subject}\n\nMessage:\n${payload.message}`;

    const params = new URLSearchParams();
    params.append("From", from);
    params.append("To", to);
    params.append("Body", bodyText);

    const authHeader = "Basic " + Buffer.from(`${sid}:${token}`).toString("base64");
    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Twilio WhatsApp error (${res.status}): ${err}`);
    }
    return true;
  }

  throw new Error("WhatsApp credentials not configured");
}

/**
 * Send SMS Text message notification via Twilio
 */
async function sendSmsNotification(payload: NotificationPayload) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_PHONE_NUMBER;
  const to = process.env.NOTIFICATION_PHONE_NUMBER;

  if (!sid || !token || !from || !to) {
    throw new Error("Twilio SMS credentials not configured");
  }

  // Keep SMS concise to fit standard SMS limit
  const shortMsg =
    payload.message.length > 100
      ? payload.message.substring(0, 97) + "..."
      : payload.message;
  const bodyText = `[Portfolio Alert] ${payload.name} (${payload.email}) sent: "${shortMsg}"`;

  const params = new URLSearchParams();
  params.append("From", from);
  params.append("To", to);
  params.append("Body", bodyText);

  const authHeader = "Basic " + Buffer.from(`${sid}:${token}`).toString("base64");
  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Twilio SMS error (${res.status}): ${err}`);
  }

  return true;
}

/**
 * Dispatches notification across all configured channels in parallel.
 * Won't throw: always returns a result summary so the caller remains robust.
 */
export async function sendPortfolioNotification(payload: NotificationPayload) {
  const status = getNotificationStatus();
  const results: Record<string, { sent: boolean; error?: string }> = {};

  const promises: Promise<void>[] = [];

  // Gmail / SMTP Email
  if (status.smtp) {
    promises.push(
      sendSmtpNotification(payload)
        .then(() => {
          results.smtp = { sent: true };
        })
        .catch((err) => {
          results.smtp = { sent: false, error: err.message };
          console.error("Gmail SMTP notification failed:", err.message);
        })
    );
  }

  // Resend Email API
  if (status.resend && !status.smtp) {
    promises.push(
      sendResendNotification(payload)
        .then(() => {
          results.resend = { sent: true };
        })
        .catch((err) => {
          results.resend = { sent: false, error: err.message };
          console.error("Resend notification failed:", err.message);
        })
    );
  }

  // Telegram
  if (status.telegram) {
    promises.push(
      sendTelegramNotification(payload)
        .then(() => {
          results.telegram = { sent: true };
        })
        .catch((err) => {
          results.telegram = { sent: false, error: err.message };
          console.error("Telegram notification failed:", err.message);
        })
    );
  }

  // Discord
  if (status.discord) {
    promises.push(
      sendDiscordNotification(payload)
        .then(() => {
          results.discord = { sent: true };
        })
        .catch((err) => {
          results.discord = { sent: false, error: err.message };
          console.error("Discord notification failed:", err.message);
        })
    );
  }

  // WhatsApp
  if (status.whatsapp) {
    promises.push(
      sendWhatsAppNotification(payload)
        .then(() => {
          results.whatsapp = { sent: true };
        })
        .catch((err) => {
          results.whatsapp = { sent: false, error: err.message };
          console.error("WhatsApp notification failed:", err.message);
        })
    );
  }

  // SMS Text
  if (status.sms) {
    promises.push(
      sendSmsNotification(payload)
        .then(() => {
          results.sms = { sent: true };
        })
        .catch((err) => {
          results.sms = { sent: false, error: err.message };
          console.error("SMS notification failed:", err.message);
        })
    );
  }

  await Promise.allSettled(promises);

  return {
    dispatched: Object.keys(results).length > 0,
    results,
  };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
