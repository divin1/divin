import { APP_CONFIG } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-background flex min-h-32 w-full flex-col items-center space-y-4 p-12 text-base">
      <span className="text-[13px] text-gray-400">
        Copyright © {APP_CONFIG.fullName} {new Date().getFullYear()}. All rights reserved.
      </span>

      <span className="text-[13px] text-gray-400">
        No LLMs were harmed in the making of this website. Here&rsquo;s the{" "}
        <a href="http://github.com/divin1/divin" className="underline">
          code
        </a>
        .
      </span>
    </footer>
  );
}
