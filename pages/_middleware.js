const USERNAME = process.env.AUTH_USERNAME;
const PASSWORD = process.env.AUTH_PASSWORD;
const IS_DEV_ENV = process.env.NODE_ENV === "development";
const COOKIE_NAME = "basic-auth";
const QUERY_NAME = "share";
import { NextRequest, NextResponse } from "next/server";

// Notes:
// Share url: http://localhost:3000/?share=b2JsOmJhc2tldGJhbGw=
// share value is username:password base64 encoded, btoa("mega:pizzaparty");
export function middleware(req, res) {
  // basicAuth checks for:
  // 1. Cookie with name equal to COOKIE_NAME
  // 2. Query params with name equal to QUERY_NAME
  // 3. Authorization header
  const basicAuth =
    req.cookies[COOKIE_NAME] ||
    req.nextUrl.searchParams.get(QUERY_NAME) ||
    req.headers.get("authorization")?.split(" ")[1];
  // If any from basicAuth matches, check if USERNAME and PASSWORD matches
  if (basicAuth) {
    const [user, pwd] = Buffer.from(basicAuth, "base64").toString().split(":");
    if (user === USERNAME && pwd === PASSWORD) {
      let nextRes = NextResponse.next();
      // Set cookie with base64 encoded username:password
      nextRes.cookie(COOKIE_NAME, basicAuth);
      // Display the request
      return nextRes;
    }
  } else if (IS_DEV_ENV) {
    let nextRes = NextResponse.next();
    // Display the request
    return nextRes;
  }

  // Display authentication dialog and deny access with incorrect login
  return new Response("Authentication required...", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"'
    }
  });
}
