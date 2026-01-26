import nodemailer from "nodemailer";
import { z } from "zod";

export const runtime = "nodejs";

const interestSchema = z.object({
  email: z.string().email(),
  pageUrl: z.string().url().optional()
});

function getEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name}`);
  }
  return value;
}

export async function POST(request: Request) {
  try {
    const payload = interestSchema.parse(await request.json());

    const transporter = nodemailer.createTransport({
      host: getEnv("SMTP_HOST"),
      port: Number(getEnv("SMTP_PORT")),
      secure: Number(getEnv("SMTP_PORT")) === 465,
      auth: {
        user: getEnv("SMTP_USER"),
        pass: getEnv("SMTP_PASS")
      }
    });

    const to = process.env.INTEREST_TO ?? "hello@entazis.dev";
    const from = getEnv("SMTP_FROM");

    await transporter.sendMail({
      to,
      from,
      subject: "New interest in blog updates",
      text: [
        "Someone requested updates on entazis.dev.",
        "",
        `Email: ${payload.email}`,
        payload.pageUrl ? `Page: ${payload.pageUrl}` : null,
        "",
        "--",
        "Sent from entazis.dev"
      ]
        .filter(Boolean)
        .join("\n")
    });

    return Response.json({ ok: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ ok: false }, { status: 400 });
    }

    console.error("Interest email failed:", error);
    return Response.json({ ok: false }, { status: 500 });
  }
}
