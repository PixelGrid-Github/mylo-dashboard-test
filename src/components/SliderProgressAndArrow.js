// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/components/SliderProgressAndArrow.module.scss";

// IMAGES //
import SliderArrow from "@/components/SliderArrow";

// DATA //

/** Slider with Progress Bar and Custom arrows */
export default function SliderProgressAndArrow({
	sliderRef,
	currentSlideIndex,
}) {
	const [progressWidth, setProgressWidth] = useState(0);

	// Initially "currentSlideIndex" is 1 --> passed from parent component
	// It changes when the slide changes and we get the active slide index
	// Accordingly we change the width of the progress indicator
	useEffect(() => {
		fillProgress(currentSlideIndex);
	}, [currentSlideIndex]);

	/** Function to set the width of progress indicator */
	const fillProgress = (currInd) => {
		setProgressWidth((currInd / sliderRef.current.props.children.length) * 100);
	};

	return (
		<div className={styles.slider_progress_and_arrow_wrap}>
			{/* Slider progress bar */}
			<div className={styles.progress_bar_wrap}>
				<div
					className={styles.progress_indicator}
					style={{ width: `${progressWidth}%` }}
				></div>
			</div>

			{/* Slider custom arrows */}
			<SliderArrow sliderRef={sliderRef} />
		</div>
	);
}
