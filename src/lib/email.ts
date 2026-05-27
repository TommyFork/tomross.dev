export function getEmailAddress(): string {
  const user = process.env.NEXT_PUBLIC_EMAIL_USER ?? "tommyross";
  const domain = process.env.NEXT_PUBLIC_EMAIL_DOMAIN ?? "me.com";
  return `${user}@${domain}`;
}
