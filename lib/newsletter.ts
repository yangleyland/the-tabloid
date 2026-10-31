const NEWSLETTER_ENDPOINT =
  "https://sheet.best/api/sheets/08da85a5-c7fd-477c-8051-40b8b7f2461a";

export function subscribeToNewsletter(email: string): void {
  fetch(NEWSLETTER_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  }).catch((error: unknown) => {
    console.error(error);
  });
}
