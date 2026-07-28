import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export type OgImageProps = {
  title: string;
  description?: string;
  type?: "project" | "thought";
  size: {
    width: number;
    height: number;
  };
};

export async function generateOgImage({ title, description, type, size }: OgImageProps) {
  const fontData = await readFile(join(process.cwd(), "public/assets/Inter-Bold.ttf"));

  return new ImageResponse(
    <div
      tw="w-full h-full flex flex-col justify-between relative"
      style={{
        background: "#0a0a0a",
      }}
    >
      {/* Brand mark */}
      <div tw="flex items-center p-16">
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
          }}
        />
        <div
          tw="text-xl font-bold ml-3"
          style={{
            color: "#ededed",
          }}
        >
          divin
        </div>
      </div>

      {/* Content */}
      <div tw="flex flex-col px-16">
        {type && (
          <div
            tw="text-sm font-bold uppercase tracking-widest mb-6"
            style={{
              color: "#a8a29e",
            }}
          >
            {type === "project" ? "Project" : "Thought"}
          </div>
        )}

        {/* Title */}
        <div
          tw="text-6xl font-bold leading-tight tracking-tight"
          style={{
            color: "#ededed",
            maxWidth: "950px",
            lineHeight: 1.1,
          }}
        >
          {title}
        </div>

        {/* Description */}
        {description && (
          <div
            tw="text-2xl mt-6"
            style={{
              color: "#a8a29e",
              maxWidth: "800px",
              lineHeight: 1.4,
            }}
          >
            {description.length > 140 ? description.slice(0, 140) + "..." : description}
          </div>
        )}
      </div>

      {/* Footer */}
      <div tw="flex items-center p-16" style={{ borderTop: "1px solid #44403c" }}>
        <div
          tw="text-lg"
          style={{
            color: "#78716c",
          }}
        >
          divin.me
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: fontData,
          style: "normal",
          weight: 700,
        },
      ],
      headers: {
        "Cache-Control": "public, max-age=3600, immutable",
      },
    }
  );
}
