import Lenis from "@studio-freight/lenis";

/** Function for smooth scrolling of the website */
export default function SmoothScrolling() {
	const lenis = new Lenis();
	lenis.on("scroll", () => {
		// console.log(e);
	});
	/** Function For Smooth Scroll */
	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}
	requestAnimationFrame(raf);
}
