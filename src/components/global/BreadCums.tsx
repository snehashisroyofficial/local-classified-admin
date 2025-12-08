"use client";
import { useSearchParams, usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const pathname = usePathname();

  const crumbs = [];

  if (from) {
    crumbs.push({
      name: from.split("/").pop(), // readable last segment
      href: from,
    });
  }

  crumbs.push({
    name: "User Details",
    href: pathname,
  });

  return (
    <nav className="flex gap-2 text-sm text-gray-600">
      {crumbs.map((c, i) => (
        <span key={c.href} className="flex items-center gap-1">
          <a href={c.href} className="hover:underline capitalize">
            {c.name.replaceAll("-", " ")}
          </a>
          {i < crumbs.length - 1 && "/"}
        </span>
      ))}
    </nav>
  );
}
