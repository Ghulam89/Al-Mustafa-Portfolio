import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

function validatePayload(body: ContactPayload) {
  return Boolean(
    body.name?.trim() &&
      body.email?.trim() &&
      body.message?.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email),
  );
}

export async function POST(request: Request) {
  const body = (await request.json()) as ContactPayload;

  if (!validatePayload(body)) {
    return NextResponse.json(
      { error: "Invalid payload. Please fill all fields correctly." },
      { status: 400 },
    );
  }

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const to = process.env.CONTACT_TO_EMAIL ?? "ghulam.mustafa.dev@gmail.com";

  if (!user || !pass || !host) {
    // Safe fallback in development when SMTP is not configured.
    return NextResponse.json(
      { message: "SMTP not configured. Use env vars to enable email sending." },
      { status: 200 },
    );
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"Portfolio Contact" <${user}>`,
    to,
    replyTo: body.email,
    subject: `New portfolio message from ${body.name}`,
    text: `${body.message}\n\nFrom: ${body.name} <${body.email}>`,
  });

  return NextResponse.json({ message: "Email sent successfully." }, { status: 200 });
}
