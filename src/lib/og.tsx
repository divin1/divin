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
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1025 50%, #0a0a0a 100%)",
      }}
    >
      {/* Gradient accent orb */}
      <div
        tw="absolute"
        style={{
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(233,78,170,0.15) 0%, transparent 70%)",
          top: "-200px",
          right: "-100px",
        }}
      />
      <div
        tw="absolute"
        style={{
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
          bottom: "-100px",
          left: "-50px",
        }}
      />

      {/* Content */}
      <div tw="flex flex-col p-16 z-10">
        {/* Type badge */}
        {type && (
          <div
            tw="flex items-center mb-6"
            style={{
              gap: "8px",
            }}
          >
            <div
              tw="text-sm font-bold uppercase tracking-widest"
              style={{
                color: type === "project" ? "#e94eaa" : "#818cf8",
              }}
            >
              {type === "project" ? "Project" : "Thought"}
            </div>
          </div>
        )}

        {/* Title */}
        <div
          tw="text-6xl font-bold leading-tight tracking-tight"
          style={{
            color: "#ffffff",
            maxWidth: "900px",
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
              color: "rgba(255,255,255,0.6)",
              maxWidth: "800px",
              lineHeight: 1.4,
            }}
          >
            {description.length > 120 ? description.slice(0, 120) + "..." : description}
          </div>
        )}
      </div>

      {/* Footer */}
      <div tw="flex items-center justify-between p-16 z-10">
        <div tw="flex items-center" style={{ gap: "12px" }}>
          {/* Circular avatar */}
          <div
            tw="flex items-center justify-center text-xl font-bold"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #e94eaa 0%, #6366f1 100%)",
              color: "#ffffff",
              boxShadow: "0 0 20px rgba(233, 78, 170, 0.3)",
            }}
          ></div>
          <div
            tw="text-xl font-bold"
            style={{
              color: "rgba(255,255,255,0.9)",
            }}
          >
            divin.me
          </div>
        </div>

        {/* Decorative line */}
        <div
          tw="flex"
          style={{
            width: "200px",
            height: "4px",
            borderRadius: "2px",
            background: "linear-gradient(90deg, #e94eaa 0%, #6366f1 100%)",
          }}
        />
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
