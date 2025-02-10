import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CACHE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

const ERROR_MESSAGES = {
  SERVICE_UNAVAILABLE:
    "Oops! We're having some issues. Please try again in a moment.",
  BAD_REQUEST:
    "Something went wrong with your request. Try refreshing the page.",
  FAILED_TO_LOAD: "Unable to load images right now. Please try again.",
} as const;

export async function GET(request: NextRequest) {
  if (!API_URL) {
    console.error("[Proxy] API_URL environment variable is not configured");
    return NextResponse.json(
      { error: ERROR_MESSAGES.SERVICE_UNAVAILABLE },
      { status: 503 }
    );
  }

  try {
    const targetUrl = new URL(API_URL);
    request.nextUrl.searchParams.forEach((value, key) =>
      targetUrl.searchParams.append(key, value)
    );

    const response = await fetch(targetUrl.toString(), {
      next: { revalidate: CACHE_MAX_AGE },
    });

    if (!response.ok) {
      console.error(
        `[Proxy] External API error: ${response.status} ${response.statusText}`
      );

      const errorMessage = (() => {
        switch (response.status) {
          case 400:
            return ERROR_MESSAGES.BAD_REQUEST;
          case 503:
            return ERROR_MESSAGES.SERVICE_UNAVAILABLE;
          default:
            return ERROR_MESSAGES.FAILED_TO_LOAD;
        }
      })();

      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    return NextResponse.json(await response.json());
  } catch (error) {
    console.error("[Proxy] Unexpected error:", error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.SERVICE_UNAVAILABLE },
      { status: 503 }
    );
  }
}
