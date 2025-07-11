import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export type OgImageProps = {
  title: string;
  size: {
    width: number;
    height: number;
  };
};

export async function generateOgImage({ title, size }: OgImageProps) {
  const fontData = await readFile(join(process.cwd(), "public/assets/Inter-Bold.ttf"));

  return new ImageResponse(
    (
      <div tw="w-full h-full flex flex-col bg-[#0a0a0a] text-[#ededed] justify-between p-10">
        <div tw="flex flex-col">
          <div tw="mt-10 text-6xl font-bold leading-[6rem] px-0 pb-24 tracking-tight text-[#ededed]">
            {title}
          </div>
        </div>
        <div tw="text-2xl font-bold text-text flex justify-end w-full">divin.me</div>
      </div>
    ),
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
