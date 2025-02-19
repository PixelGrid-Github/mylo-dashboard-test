"use client";
// MODULES //
import React, { useState } from "react";

// COMPONENTS //
import Image from "next/image";

// SECTIONS //

// PLUGINS //

// STYLES //
import styles from "@/styles/components/Bottom1.module.scss";

// IMAGES //
import MaleIcon from "../../public/img/male.svg";
import FemaleIcon from "../../public/img/female.svg";
import DeleteIcon from "../../public/img/delete.svg";

/** Bottom3  */
export default function Bottom3() {
	return (
		<div className={styles.BottomNavigation}>
			<div className="AppContainer">
				<form>
					<div className={styles.flex}>
						<div>
							<input
								type="submit"
								value="SHARE WITH DRIVERS"
								className="greenBtn"
								style={{ width: "260px", marginBottom: "6px", fontSize: "15px" }}
							/>
							<div className="text-center">
								<label style={{ fontWeight: "400" }}>
									Update last shared with drivers on 20.04.2024 @ 10:00 AM
								</label>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
