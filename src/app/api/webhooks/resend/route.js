import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();

    // Resend sends the email_id in the payload for inbound emails
    const emailId = body.email_id || (body.data && body.data.email_id);

    if (!emailId) {
      return new Response("No email_id provided", { status: 400 });
    }

    // Forward the email to the destination address
    await resend.emails.receiving.forward({
      emailId: emailId,
      to: process.env.CAREERS_RECEIVER_EMAIL || "suryakantsubudhi@protonmail.com",
      from: process.env.CAREERS_FROM_EMAIL || "hello@superxepic.dev",
    });

    return new Response("Email forwarded successfully", { status: 200 });
  } catch (error) {
    console.error("Resend Forwarding Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
