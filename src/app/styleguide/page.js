"use client";
// MODULES //

// COMPONENTS //
import Modal, { openModal } from "@/components/Modal";
import InnerBanner from "@/components/InnerBanner";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTitle,
} from "@/components/Accordian";
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/components/Styleguide.module.scss";

// IMAGES //

// DATA //
import accordianData from "@/data/accordianData.json";

/** Styleguide Page */
const StyleGuide = () => {
	const colors = ["primary", "secondary"];

	return (
		<div className={styles.styleguide}>
			{/* ============ InnerBanner ================ */}
			<h2 className="text_xxxxl font_primary">InnerBanner</h2>
			<section>
				<InnerBanner
					bannerTitle={"About Us"}
					bannerDescription={"About Us Description"}
					desktopImage=""
					mobileImage=""
				/>
			</section>

			{/* ============ Accordian ================ */}
			<h2 className="text_xxxxl font_primary">Accordian</h2>
			<section>
				<Accordion>
					{/* Accordian Items using json */}
					{accordianData.map((data, index) => (
						<AccordionItem key={index}>
							<AccordionTitle>{data.title}</AccordionTitle>
							<AccordionContent>{data.description}</AccordionContent>
						</AccordionItem>
					))}
					{/* Accordian Items using Static content */}
					<AccordionItem>
						<AccordionTitle>Test Accordian title</AccordionTitle>
						<AccordionContent>
							<h1>Test Accordian Content</h1>
							<p>
								Learn how to implement accordions using JavaScript, including event
								handling, DOM manipulation, and integrating with front-end frameworks
								like React or Vue.js.
							</p>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</section>

			{/* ============ Fonts ================ */}
			<h2 className="text_xxxxl font_primary">Fonts</h2>
			<section>
				<p className="text_xxxxl font_primary">86 - paytone font</p>
			</section>

			{/* ============ Text colors ================ */}
			<h2 className="text_xxxxl font_primary">Text colors</h2>
			<section>
				{colors.map((color, ind) => {
					return (
						<p key={ind} className={`text_reg font_secondary color_${color}`}>
							color {color}
						</p>
					);
				})}
			</section>

			{/* ============ Background colors ================ */}
			<h2 className="text_xxxxl font_primary">Background Colors</h2>
			<section>
				<div className={styles.color_palette}>
					{colors.map((color, ind) => {
						return (
							<div
								key={ind}
								className={`${styles.cp_item} text_sm font_secondary bg_${color}`}
							>
								Bg color {color}
							</div>
						);
					})}
				</div>
			</section>

			{/* ============ Modal ================ */}
			<h2 className="text_xxxxl font_primary">Modal</h2>
			<section>
				<div className="btn_event_box" onClick={() => openModal("demo")}>
					<Button color="secondary" variant="filled" shape="rounded">
						Open Modal
					</Button>
				</div>
				<Modal id={"demo"}>
					<h1>Hello</h1>
				</Modal>
			</section>

			{/* ============ Button ================ */}
			<h2 className="text_xxxxl font_primary">Buttons</h2>
			<section>
				<div className={styles.color_palette}>
					<div className={styles.btn_box}>
						<Button color="primary" variant="filled" shape="rounded">
							Read More
						</Button>
						<Button color="primary" variant="filled" shape="squared">
							Read More
						</Button>
						<Button
							color="primary"
							variant="filled"
							fontFamily="font_primary"
							fontWeight="text_400"
						>
							Read More
						</Button>
					</div>
				</div>
				<div className={styles.color_palette}>
					<div className={styles.btn_box}>
						<Button color="secondary" variant="filled" shape="rounded">
							Read More
						</Button>
						<Button color="secondary" variant="filled" shape="squared">
							Read More
						</Button>
						<Button color="secondary" variant="filled">
							Read More
						</Button>
					</div>
				</div>
				<div className={styles.color_palette}>
					<div className={styles.btn_box}>
						<Button color="primary" variant="outlined" shape="rounded">
							Read More
						</Button>
						<Button color="primary" variant="outlined" shape="squared">
							Read More
						</Button>
						<Button color="primary" variant="outlined">
							Read More
						</Button>
					</div>
				</div>
				<div className={styles.color_palette}>
					<div className={styles.btn_box}>
						<Button color="secondary" variant="outlined" shape="rounded">
							Read More
						</Button>
						<Button color="secondary" variant="outlined" shape="squared">
							Read More
						</Button>
						<Button color="secondary" variant="outlined">
							Read More
						</Button>
					</div>
				</div>
				<div className={styles.color_palette}>
					<div className={styles.btn_box}>
						<Button color="secondary" variant="underline">
							Read More
						</Button>
						<Button color="primary" variant="underline">
							Read More
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
};

export default StyleGuide;
