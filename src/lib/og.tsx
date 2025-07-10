import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export type OgImageProps = {
  title: string;
  size: {
    width: number;
    height: number;
  };
};

export async function generateOgImage({ title, size }: OgImageProps) {
  const inter = await readFile(join(process.cwd(), "src/assets/Inter-Bold.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0a0a0a",
          justifyContent: "space-between",
          fontFamily: "Inter-Bold",
          color: "#ededed",
          padding: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              marginTop: "40px",
              fontSize: "96px",
              fontWeight: "900",
              lineHeight: "6rem",
              padding: "0 0 100px 0",
              letterSpacing: "-0.025em",
              color: "#ededed",
              fontFamily: "Inter-Bold",
              lineClamp: 4,
            }}
          >
            {title}
          </div>
        </div>
        <div
          style={{
            fontSize: "32px",
            fontWeight: "900",
            color: "#ededed",
            display: "flex",
            textAlign: "right",
            width: "100%",
            justifyContent: "flex-end",
          }}
        >
          divin.me
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: inter,
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
