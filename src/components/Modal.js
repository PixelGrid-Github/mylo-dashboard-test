// MODULES //

// COMPONENTS //
import Image from "next/image";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/components/Modal.module.scss";

// IMAGES //
import CrossIcon from "public/img/icons/close.svg";

// DATA //

/** Modal Component */
export default function Modal({ children, id }) {
	return (
		<div className={`modal ${styles.modal}`} id={id ? id : "modal"}>
			{/** Modal Backdrop */}
			<div onClick={() => closeModal(id)} className={styles.overlay}></div>
			<div className={styles.content}>
				{/**  Close Icon */}
				<div
					className={`${styles.closeBtn} next_image`}
					onClick={() => closeModal(id)}
				>
					<Image width={20} height={20} src={CrossIcon} alt="X" />
				</div>
				{/** Modal Content */}
				{children}
			</div>
		</div>
	);
}

/** Open Modal Function */
export const openModal = (id) => {
	const modalHtml = document.querySelector(id ? `#${id}` : ".modal");
	modalHtml.style.opacity = "1";
	modalHtml.style.pointerEvents = "all";
	// Disable background scrolling
	document.body.style.overflow = "hidden";
};

/** Close Modal Function */
export const closeModal = (id) => {
	const modalHtml = document.querySelector(id ? `#${id}` : ".modal");
	modalHtml.style.opacity = "0";
	modalHtml.style.pointerEvents = "none";
	// Enable background scrolling when the modal is closed
	document.body.style.overflow = "auto";
};
