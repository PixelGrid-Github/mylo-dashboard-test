// MODULES //

// COMPONENTS //

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/components/Buttons/Button.module.scss";

// IMAGES //

// DATA //

/** Button Component */
export default function Button({
	children,
	shape,
	color,
	variant,
	fontWeight,
	fontFamily,
	buttonIcon,
}) {
	return (
		<button
			className={`text_sm ${fontWeight} ${fontFamily}
				${styles.btn_common_styles}
				${styles[`btn_${color}`]}
				${styles[`btn_${variant}`]}
				${styles[shape]}
				`}
		>
			{buttonIcon && <img src={buttonIcon} />}
			{children}
		</button>
	);
}
