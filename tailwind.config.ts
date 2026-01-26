import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      typography: () => ({
        DEFAULT: {
          css: {
            maxWidth: "72ch",
            a: {
              textDecoration: "none"
            },
            "a:hover": {
              textDecoration: "underline"
            },
            code: {
              fontWeight: "500"
            }
          }
        }
      })
    }
  },
  plugins: [typography]
} satisfies Config;

