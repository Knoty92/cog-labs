import { getSubmissions, addSubmission } from "~/lib/store";

export async function GET() {
  const submissions = getSubmissions();
  return Response.json({ data: submissions.reverse() });
}

export async function POST({ request }: { request: Request }) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message, service } = body;

    if (!name || !email || !message) {
      return Response.json(
        { error: "Name, email and message are required" },
        { status: 400 }
      );
    }

    const submission = addSubmission({
      name,
      email: email.trim().toLowerCase(),
      phone: phone || "",
      company: company || "",
      message,
      service: service || "general",
    });

    return Response.json({ data: submission }, { status: 201 });
  } catch (err) {
    return Response.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
