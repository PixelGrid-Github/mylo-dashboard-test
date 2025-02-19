"use client";
// MODULES //

// COMPONENTS //
import { useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import Calendar from "@/components/Calendar";

// SECTIONS //

// PLUGINS //
import "jquery-ui/themes/base/all.css";
import "jquery-ui/themes/base/datepicker.css";

// UTILS //

// STYLES //
import styles from "@/styles/pages/Booking.module.scss";

// IMAGES //
import BuildingIcon from "../../../public/img/building.svg";
import TimeIcon from "../../../public/img/time.svg";
import DownIcon from "../../../public/img/down-arrow.svg";

// DATA //

/** Page */
export default function Page() {
	const [isActive, setIsActive] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);
	const [activeIndexCity, setActiveIndexCity] = useState(0);
	const cities = ["VIKHROLI (E)", "Powai", "BKC"];

	/** handleTabClick */
	const handleTabClick = (index) => {
		setActiveIndex(index);
	};
	/** handleTabClickCity */
	const handleTabClickCity = (index) => {
		setActiveIndexCity(index);
	};
	/** toggleHandler */
	const toggleHandler = () => {
		setIsActive(!isActive);
	};

	return (
		<div>
			{/* Page Content starts here */}
			<main className={`${styles.BookingPage}`}>
				<div className={`${styles.TabSec} AppContainer`}>
					<div
						className={`${styles.TabName} ${activeIndex === 0 ? styles.active : ""}`}
						onClick={() => handleTabClick(0)}
					>
						My Request form
					</div>
					<div
						className={`${styles.TabName} ${activeIndex === 1 ? styles.active : ""}`}
						onClick={() => handleTabClick(1)}
					>
						My Trips
					</div>
					<div
						className={`${styles.TabName} ${activeIndex === 2 ? styles.active : ""}`}
						onClick={() => handleTabClick(2)}
					>
						<div className={styles.Notification}>2</div>
						Leader Dash
					</div>
				</div>

				<div className="RequestForm">
					<div className={`${styles.InnerTabSec} AppContainer`}>
						{/* <div className={`${styles.TabName} ${styles.active}`}>
							<div className={styles.Location}>VIKHROLI (E)</div>
							<div className={styles.LocationCategory}>Office</div>
						</div>
						<div className={styles.TabName}>
							<div className={styles.Location}>Powai</div>
							<div className={styles.LocationCategory}>Office</div>
						</div>
						<div className={styles.TabName}>
							<div className={styles.Location}>BKC</div>
							<div className={styles.LocationCategory}>Office</div>
						</div> */}
						{cities.map((city, index) => (
							<div
								key={index}
								className={`${styles.TabName} ${
									activeIndexCity === index ? styles.active : ""
								}`}
								onClick={() => handleTabClickCity(index)}
							>
								<div className={styles.Location}>{city}</div>
								<div className={styles.LocationCategory}>Office</div>
							</div>
						))}
					</div>

					<div className={`${styles.body} AppContainer`}>
						<p className={styles.Label}>
							I would like to request for a CAB SERVICE...
						</p>
						<div className={styles.PickAndDrop}>
							<div
								style={{
									color: isActive ? "#E4DFDF" : "var(--color_primary)",
								}}
							>
								PICKUP <br />
								from home
							</div>
							<div className={styles.ToggleContainer} onClick={toggleHandler}>
								<div
									className={styles.ToggleCircle}
									style={{ left: isActive ? "33px" : "-3px" }}
								></div>
							</div>
							<div
								style={{
									color: isActive ? "var(--color_primary)" : "#E4DFDF",
								}}
							>
								drop to <br />
								home
							</div>
						</div>

						<div className={styles.SelectOptions}>
							<div className={styles.Option}>
								<div className={styles.Icon}>
									<img src={BuildingIcon.src} alt="building" />
								</div>
								<select defaultValue="" name="building" id="building" required>
									<option value="" disabled>
										Select Office building
									</option>
									<option value="Building 1">Building 1</option>
									<option value="Building 2">Building 2</option>
								</select>
							</div>
							<div className={styles.Option}>
								<div className={styles.Icon}>
									<img src={TimeIcon.src} alt="time" />
								</div>
								<select defaultValue="" name="time" id="time" required>
									<option value="" disabled>
										Select Shift Time
									</option>
									<option value="Building 1">9:00 AM</option>
									<option value="Building 2">10:00 AM</option>
								</select>
							</div>
						</div>

						<div className="Calendar">
							<Calendar />
						</div>
					</div>

					<div className={`${styles.BottomSubmit} AppContainer`}>
						<div className={styles.Note}>
							Note:-
							<br />
							Request Ends 2 Hours Prior to trip
						</div>
						<form className={styles.Submit}>
							<button>SUBMIT</button>
						</form>
					</div>
				</div>
			</main>
			{/* Page Content ends here */}
		</div>
	);
}
