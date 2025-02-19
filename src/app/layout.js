"use client";
// MODULES //
import { useEffect } from "react";

// COMPONENTS //
import "jquery-ui/themes/base/all.css";
import "jquery-ui/themes/base/datepicker.css";
import Script from "next/script";
import $ from "jquery";

// SECTIONS //

// PLUGINS //

// UTILS //
// import SmoothScrolling from "@/utils/SmoothScrolling";

// STYLES //
import "@/styles/globals/globals.scss";

// IMAGES //

// DATA //

// CONTEXT //
import AuthContextProvider from "@/context/auth.context";

// export const metadata = {
// 	title: "Home",
// 	description: "Homepage",
// };

/** Layout */
export default function RootLayout({ children }) {
	useEffect(() => {
		// SmoothScrolling();
		if (typeof window !== "undefined") {
			window.$ = window.jQuery = $;
		}
	}, []);

	return (
		<html lang="en">
			<body>
				<AuthContextProvider>{children}</AuthContextProvider>
			</body>
		</html>
	);
}
