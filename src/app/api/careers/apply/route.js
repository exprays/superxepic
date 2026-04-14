import { NextResponse } from "next/server";
import { Resend } from "resend";

const MAX_RESUME_SIZE_BYTES = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");

const hasAllowedExtension = (filename = "") => {
  const lower = filename.toLowerCase();
  return ALLOWED_EXTENSIONS.some((ext) => lower.endsWith(ext));
};

export async function POST(request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("RESEND_API_KEY is missing from environment variables.");
      return NextResponse.json(
        { error: "Mail service configuration missing." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const formData = await request.formData();

    const role = String(formData.get("role") || "General Application").trim();
    const fullName = String(formData.get("fullName") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const portfolio = String(formData.get("portfolio") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const resume = formData.get("resume");

    // Portfolio is now optional
    if (!fullName || !email || !message || !resume) {
      return NextResponse.json(
        { error: "Please complete all required fields and attach your resume." },
        { status: 400 }
      );
    }

    const isFile = typeof resume === "object" && typeof resume.arrayBuffer === "function";

    if (!isFile) {
      return NextResponse.json(
        { error: "Resume upload is required." },
        { status: 400 }
      );
    }

    if (!resume.name || !hasAllowedExtension(resume.name)) {
      return NextResponse.json(
        { error: "Resume must be a .pdf, .doc, or .docx file." },
        { status: 400 }
      );
    }

    if (resume.size > MAX_RESUME_SIZE_BYTES) {
      return NextResponse.json(
        { error: "Resume file is too large. Max size is 10MB." },
        { status: 400 }
      );
    }

    const toEmail = process.env.CAREERS_RECEIVER_EMAIL || "studio@politechaos.com";
    const fromEmail = process.env.CAREERS_FROM_EMAIL || "hello@superxepic.dev";

    const resumeBuffer = Buffer.from(await resume.arrayBuffer());

    // Send notification email to the studio
    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `Career Application: ${role} - ${fullName}`,
      text: [
        `Role: ${role}`,
        `Full name: ${fullName}`,
        `Email: ${email}`,
        portfolio ? `Portfolio: ${portfolio}` : "Portfolio: Not provided",
        `Phone: ${phone || "Not provided"}`,
        "",
        "Why you:",
        message,
      ].join("\n"),
      html: `
        <h2>New Career Application</h2>
        <p><strong>Role:</strong> ${escapeHtml(role)}</p>
        <p><strong>Full Name:</strong> ${escapeHtml(fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${portfolio ? `<p><strong>Portfolio:</strong> <a href="${escapeHtml(portfolio)}" target="_blank" rel="noreferrer noopener">${escapeHtml(portfolio)}</a></p>` : "<p><strong>Portfolio:</strong> Not provided</p>"}
        <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
        <p><strong>Why You:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
      attachments: [
        {
          filename: resume.name,
          content: resumeBuffer,
        },
      ],
    });

    // Send confirmation email to applicant
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: `Application Received: ${role} @ SuperXEpic`,
      html: `
        <div style="background-color: #e3e3db; color: #1a1614; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 48px 24px; line-height: 1.5;">
          <div style="max-width: 540px; margin: 0 auto;">
            <div style="margin-bottom: 40px;">
              <h1 style="font-size: 32px; font-weight: 900; line-height: 0.9; margin: 0; text-transform: uppercase; letter-spacing: -2px;">SUPERXEPIC</h1>
            </div>

            <h2 style="font-size: 26px; font-weight: 800; line-height: 1; margin: 0 0 24px; text-transform: uppercase;">Mischief Managed.</h2>
            
            <p style="font-size: 18px; margin: 0 0 24px;">Hi ${escapeHtml(fullName)},</p>
            
            <p style="font-size: 18px; margin: 0 0 32px;">We've received your application for the <strong>${escapeHtml(role)}</strong> position. Our team is currently sifting through portfolios to find the right amount of chaos.</p>

            <div style="background-color: rgba(26, 22, 20, 0.05); border-left: 4px solid #ff6e14; padding: 24px; margin-bottom: 32px;">
              <h3 style="font-size: 14px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px; color: #8c7e77;">What's Next?</h3>
              <p style="font-size: 16px; margin: 0;">If your work makes us look twice, we'll be in touch. In the meantime, feel free to keep building strange things.</p>
            </div>

            <p style="font-size: 14px; color: #8c7e77; text-transform: uppercase; letter-spacing: 1px; margin-top: 48px;">
              Stay unpredictable.<br />
              <strong style="color: #1a1614;">— The SuperXEpic Team</strong>
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("careers-apply-error", error);
    return NextResponse.json(
      {
        error:
          "We could not send your application right now. Please try again shortly.",
      },
      { status: 500 }
    );
  }
}
