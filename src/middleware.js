import Constants from "@/constants/constants";
import { NextResponse } from "next/server";

/** This function can be marked `async` if using `await` inside */
export function middleware(request) {
	// const path = request.nextUrl.pathname;

	// const isAuthPath = Constants.authPaths.includes(path); // Pages that require authentication
	// const isPublicPath = Constants.publicPaths.includes(path); // Public pages that don't need login

	// const token = request.cookies.get("token")?.value; // Check if the user has a token
	// // const token = true;

	// // If the user is authenticated and tries to access login or signup page, redirect to home
	// if (isAuthPath && token) {
	// 	return NextResponse.redirect(new URL("/", request.url)); // Redirect to homepage
	// }

	// // If the user is not authenticated and tries to access protected pages, redirect to login
	// if (!isPublicPath && !token) {
	// 	return NextResponse.redirect(new URL("/login", request.url)); // Redirect to login
	// }

	// No need to redirect if the user has access to the page
	return NextResponse.next(); // Continue to the requested page
}

/** See "Matching Paths" below to learn more */
export const config = {
	matcher: [
		"/login",
		"/",
		"/contact",
		"/01",
		"/blogs",
		"/leader-dash",
		"/my-trips",
		"/place-request",
		"/request-form",
		"/review",
	], // Match all paths
};
