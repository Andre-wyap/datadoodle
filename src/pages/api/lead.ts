import type { APIRoute } from "astro";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const malaysiaMobilePattern = /^(?:\+?60|0)1[0-46-9]\d{7,8}$/;

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Submit the form again." }, { status: 400 });
  }

  if (body.company_site) {
    return Response.json({ ok: true });
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim().toLowerCase();
  const mobile = String(body.mobile || "").replace(/[\s-]/g, "");
  const company = String(body.company || "").trim();
  // The page carries one form component, rendered in the hero modal or the
  // footer panel. Anything else is treated as the hero.
  const allowedSources = new Set(["hero", "footer"]);
  const source = allowedSources.has(String(body.source)) ? String(body.source) : "hero";

  if (name.length < 2) return Response.json({ field: "name", error: "Enter your name." }, { status: 422 });
  if (company.length < 2)
    return Response.json({ field: "company", error: "Enter your company name." }, { status: 422 });
  if (!emailPattern.test(email)) return Response.json({ field: "email", error: "Enter a valid email address." }, { status: 422 });
  if (!malaysiaMobilePattern.test(mobile))
    return Response.json({ field: "mobile", error: "Enter a valid Malaysian phone number." }, { status: 422 });

  const webhookUrl = import.meta.env.N8N_LEAD_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("N8N_LEAD_WEBHOOK_URL is not configured");
    return Response.json({ error: "The form is temporarily unavailable. WhatsApp us instead." }, { status: 503 });
  }

  const payload = {
    name,
    company,
    email,
    mobile,
    source,
    utm_source: String(body.utm_source || ""),
    utm_medium: String(body.utm_medium || ""),
    utm_campaign: String(body.utm_campaign || ""),
    utm_term: String(body.utm_term || ""),
    utm_content: String(body.utm_content || ""),
    referrer: String(body.referrer || ""),
    timestamp: new Date().toISOString(),
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(import.meta.env.N8N_WEBHOOK_SECRET
          ? { authorization: `Bearer ${import.meta.env.N8N_WEBHOOK_SECRET}` }
          : {}),
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) throw new Error(`Lead webhook returned ${response.status}`);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Lead forwarding failed", error);
    return Response.json({ error: "Your details could not be sent. WhatsApp us to get your score." }, { status: 502 });
  }
};
