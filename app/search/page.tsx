import { SearchClient } from "@/components/search/SearchClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false, follow: true }
};

export default function SearchPage() {
  return <SearchClient />;
}

