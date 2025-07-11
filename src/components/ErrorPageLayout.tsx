import Link from "next/link";

type ErrorPageLayoutProps = {
  title: string;
  description: string;
};

export default function ErrorPageLayout({ title, description }: ErrorPageLayoutProps) {
  return (
    <div className="text-text flex h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="mb-10 text-lg">{description}</p>
        <div className="text-center">
          <Link href="/" className="text-primary hover:text-primary-accent">
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}
