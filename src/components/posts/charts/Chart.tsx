"use client";

import { ReactNode } from "react";

interface ChartProps {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export default function Chart({ children, title, description, className = "" }: ChartProps) {
  return (
    <figure className={`chart-container ${className}`}>
      {(title || description) && (
        <figcaption className="chart-header">
          {title && <h3 className="chart-title">{title}</h3>}
          {description && <p className="chart-description">{description}</p>}
        </figcaption>
      )}

      <div className="chart-content">{children}</div>

      <style jsx>{`
        .chart-container {
          margin: 3rem 0;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.02),
            rgba(255, 255, 255, 0.01)
          );
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 2rem;
          backdrop-filter: blur(8px);
          animation: fadeInUp 0.6s ease-out;
          overflow: hidden;
          max-width: 100%;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .chart-header {
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .chart-title {
          font-family: "Fraunces", "Playfair Display", Georgia, serif;
          font-size: 1.75rem;
          font-weight: 600;
          line-height: 1.3;
          margin: 0 0 0.5rem 0;
          color: rgba(255, 255, 255, 0.95);
          letter-spacing: -0.02em;
        }

        .chart-description {
          font-family: "Sentient", "Charter", Georgia, serif;
          font-size: 1rem;
          line-height: 1.6;
          margin: 0;
          color: rgba(255, 255, 255, 0.6);
          max-width: 65ch;
        }

        .chart-content {
          position: relative;
          min-height: 320px;
          overflow: hidden;
          width: 100%;
        }

        @media (max-width: 768px) {
          .chart-container {
            margin: 2rem -1rem;
            border-radius: 0;
            padding: 1.5rem 1rem;
          }

          .chart-title {
            font-size: 1.5rem;
          }

          .chart-description {
            font-size: 0.95rem;
          }

          .chart-content {
            min-height: 280px;
          }
        }
      `}</style>
    </figure>
  );
}
