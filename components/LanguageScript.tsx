export function LanguageScript() {
  const code = `
(() => {
  try {
    const p = window.location && window.location.pathname ? window.location.pathname : "/";
    const isHu = p === "/hu" || p.startsWith("/hu/");
    const isEn = p === "/en" || p.startsWith("/en/");
    const locale = isHu ? "hu" : isEn ? "en" : null;
    if (!locale) return;

    document.documentElement.lang = locale;

    // Persist user preference for server-side redirects (NGINX) ONLY when the
    // user is already on an explicit locale path. (Avoid forcing "en" on "/".)
    // Max-Age: 1 year.
    document.cookie = "locale=" + locale + "; Path=/; Max-Age=31536000; SameSite=Lax";
  } catch {}
})();
`.trim();

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

