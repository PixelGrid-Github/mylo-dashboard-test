// MODULES //

// COMPONENTS //
import Image from "next/image";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/components/SliderArrow.module.scss";

// IMAGES //
import ArrowIcon from "public/img/icons/arrow.svg";

// DATA //

/** Slider with progress bar and custom arrows */
export default function SliderArrow({ sliderRef }) {
	return (
		<div className={styles.arrowWrap}>
			<div className={styles.arrow_prev}>
				<Image
					src={ArrowIcon}
					width="25"
					height="25"
					alt=""
					className={styles.arrow_img}
					onClick={() => {
						sliderRef.current.slickPrev();
					}}
				/>
			</div>
			<div className={styles.arrow_next}>
				<Image
					src={ArrowIcon.src}
					width="25"
					height="25"
					alt=""
					className={styles.arrow_img}
					onClick={() => {
						sliderRef.current.slickNext();
					}}
				/>
			</div>
		</div>
	);
}
