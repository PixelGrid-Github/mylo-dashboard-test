"use client";
// MODULES //
import React, { useState } from "react";

// COMPONENTS //
import Image from "next/image";

// SECTIONS //

// PLUGINS //

// STYLES //
import styles from "@/styles/components/Tabs.module.scss";

// IMAGES //

/** Tabs  */
const Tabs = ({ activeIndexCity, handleTabClickCity, data }) => (
	<div className={`${styles.InnerTabSec} AppContainer`}>
		<div
			className={`${styles.TabName} ${activeIndexCity === 0 ? styles.active : ""}`}
			onClick={() => handleTabClickCity(0)}
		>
			<div className={styles.Location}>
				<div className={styles.num}>{data?.counts?.unassigned || 0}</div>
				<div className={styles.name}>NEW</div>
			</div>
		</div>
		<div
			className={`${styles.TabName} ${activeIndexCity === 1 ? styles.active : ""}`}
			onClick={() => handleTabClickCity(1)}
		>
			<div className={styles.Location}>
				<div className={styles.num}>{data?.counts?.group_count || 0}</div>
				<div className={styles.name}>GROUPED</div>
			</div>
		</div>
		<div
			className={`${styles.TabName} ${activeIndexCity === 2 ? styles.active : ""}`}
			onClick={() => handleTabClickCity(2)}
		>
			<div className={styles.Location}>
				<div className={styles.num}>{data?.counts?.assign_count || 0}</div>
				<div className={styles.name}>ASSIGNED</div>
			</div>
		</div>
	</div>
);

export default Tabs;
