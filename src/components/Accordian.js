"use client";
// MODULES //
import React, { useState } from "react";

// COMPONENTS //
import Image from "next/image";

// SECTIONS //

// PLUGINS //

// STYLES //
import styles from "@/styles/components/Accordian.module.scss";

// IMAGES //
import ArrowIcon from "@/../public/img/icons/acc_arrow.svg";

/** Accordian  */
const Accordion = ({ children }) => {
	return <div className="accordion">{children}</div>;
};

/** Accordion Item  */
const AccordionItem = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false);
	/** Toggle Accordion  */
	const toggleAccordion = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div
			className={`accordian_wrap ${styles.accordian_wrap} ${
				isOpen && styles.active
			}`}
		>
			{React.Children.map(children, (child) => {
				if (child.type === AccordionTitle) {
					return React.cloneElement(child, { isOpen, toggleAccordion });
				}
				if (child.type === AccordionContent && isOpen) {
					return child;
				}
				return null;
			})}
		</div>
	);
};

/** Accordion Title  */
const AccordionTitle = ({ children, isOpen, toggleAccordion }) => {
	return (
		<div className={`${styles.accordian_title_wrap}`} onClick={toggleAccordion}>
			{children}
			<div className={styles.arrow_icon}>
				<Image src={ArrowIcon} width={30} height={27} alt="Accordian Arrow" />
			</div>
		</div>
	);
};
/** Accordion Content  */
const AccordionContent = ({ children }) => {
	return <div className={`${styles.accordian_content_wrap}`}>{children}</div>;
};

export { Accordion, AccordionItem, AccordionTitle, AccordionContent };
