import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not Found",
};

export default function NotFound() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="text-center">
        <p className="text-4xl font-semibold tracking-tight">404</p>
        <p className="mt-2 text-lg text-muted-foreground">
          Oops! The page you requested is not found.
        </p>
      </div>
    </div>
  );
}
