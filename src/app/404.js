"use client";
// MODULES //

// COMPONENTS //
import Link from "next/link";
import MetaTags from "@/components/MetaTags";
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/404.module.scss";

// IMAGES //

// DATA //

/** 404 Page */
export default function NotFoundPage() {
	return (
		<div>
			{/* Metatags */}
			<MetaTags
				Title={"Page Not Found"}
				Desc={"Page Not Found Desp"}
				OgImg={""}
				Url={"/404"}
			/>

			{/* Page Content starts here */}
			<main className={styles.not_found_page}>
				<div className={styles.not_found_wrap}>
					<h2 className={styles.title}>404</h2>
					<p className={`${styles.desp} text_center`}>
						The page that you are
						<br /> looking for does not exist!
					</p>
					<Link href={"/"}>
						<div className={styles.home_btn}>
							<Button color="primary" variant="filled" shape="rounded">
								Go to Homepage
							</Button>
						</div>
					</Link>
				</div>
			</main>
			{/* Page Content ends here */}
		</div>
	);
}
