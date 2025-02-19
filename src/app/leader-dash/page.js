"use client";
// MODULES //

// COMPONENTS //
import { useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";

// SECTIONS //

// PLUGINS //
import "jquery-ui/themes/base/all.css";
import "jquery-ui/themes/base/datepicker.css";

// UTILS //

// STYLES //
import styles from "@/styles/pages/Booking.module.scss";

// IMAGES //
import CancelRide from "../../../public/img/cancel-ride.png";
import CloseIcon from "../../../public/img/close.svg";

// DATA //

/** Page */
export default function Page() {
	const [activeIndex, setActiveIndex] = useState(2);
	const [activeIndexCity, setActiveIndexCity] = useState(0);
	const [activeTripIndex, setActiveTripIndex] = useState(null);
	const [isPopupVisible, setIsPopupVisible] = useState(false);

	/** handleTabClick */
	const handleTabClick = (index) => {
		setActiveIndex(index);
	};
	/** handleTabClickCity */
	const handleTabClickCity = (index) => {
		setActiveIndexCity(index);
	};
	/** handleTripClick */
	const handleTripClick = (index) => {
		setActiveTripIndex((prevIndex) => (prevIndex === index ? null : index));
	};

	/** handleCancelClick */
	const handleCancelClick = (event) => {
		event.stopPropagation();
		// Check if the parent has the Cancelled class
		const parentElement = event.currentTarget.closest(`.${styles.Trip}`);
		if (parentElement?.classList.contains(styles.Cancelled)) {
			return; // Do nothing if the parent has the Cancelled class
		}
		setIsPopupVisible(true); // Show popup
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
						<div
							className={`${styles.TabName} ${
								activeIndexCity === 0 ? styles.active : ""
							}`}
							onClick={() => handleTabClickCity(0)}
						>
							<div className={styles.Location}>
								<div className={styles.Notification}>2</div>
								ALL REQUESTS
							</div>
						</div>
						<div
							className={`${styles.TabName} ${
								activeIndexCity === 1 ? styles.active : ""
							}`}
							onClick={() => handleTabClickCity(1)}
						>
							<div className={styles.Location}>EXPIRED</div>
						</div>
						<div
							className={`${styles.TabName} ${
								activeIndexCity === 2 ? styles.active : ""
							}`}
							onClick={() => handleTabClickCity(2)}
						>
							<div className={styles.Location}>PLACE REQUEST</div>
						</div>
					</div>

					<div className="AppContainer">
						<div className={styles.AllRequests}>
							<div className={`${styles.Trip} ${styles.active}`}>
								<div className={styles.Info}>
									<div className={styles.Flex}>
										<div>
											<label>Request From:</label>
											<div className={styles.VehicleNumber}>Shrinivasan Iyer</div>
										</div>
										<div>
											<label>Request Date:</label>
											<div className={styles.PickupTime}>29.10.2024</div>
										</div>
										<div>
											<label>Request Expires in:</label>
											<div
												className={styles.GroupCode}
												style={{ color: "#F80404", fontWeight: 500, fontSize: "14px" }}
											>
												00:00:00
											</div>
										</div>
									</div>

									<div className={styles.Flex} style={{ alignItems: "center" }}>
										<div>
											<label>Request For:</label>
											<div className={styles.BoardingTime}>Pickup</div>
										</div>
										<div>
											<label>From Location:</label>
											<div className={styles.BoardingTime}>Borivali (W)</div>
										</div>
										<div>
											<label>Shift Time:</label>
											<div className={styles.BoardingTime}>2:30 AM</div>
										</div>
									</div>

									<div className={styles.Buttons}>
										<div className={styles.Reject}>REJECT</div>
										<div className={styles.Approve}>APPROVE REQUEST</div>
									</div>
								</div>
							</div>

							<div className={`${styles.Trip} ${styles.active}`}>
								<div className={styles.Info}>
									<div className={styles.Flex}>
										<div>
											<label>Request From:</label>
											<div className={styles.VehicleNumber}>Shrinivasan Iyer</div>
										</div>
										<div>
											<label>Request Date:</label>
											<div className={styles.PickupTime}>29.10.2024</div>
										</div>
										<div>
											<label>Request Expires in:</label>
											<div
												className={styles.GroupCode}
												style={{ color: "#F80404", fontWeight: 500, fontSize: "14px" }}
											>
												00:00:00
											</div>
										</div>
									</div>

									<div className={styles.Flex} style={{ alignItems: "center" }}>
										<div>
											<label>Request For:</label>
											<div className={styles.BoardingTime}>Pickup</div>
										</div>
										<div>
											<label>From Location:</label>
											<div className={styles.BoardingTime}>Borivali (W)</div>
										</div>
										<div>
											<label>Shift Time:</label>
											<div className={styles.BoardingTime}>2:30 AM</div>
										</div>
									</div>

									<div className={styles.Buttons}>
										<div className={styles.Reject}>REJECT</div>
										<div className={styles.Approve}>APPROVE REQUEST</div>
									</div>
								</div>
							</div>

							<div className={`${styles.Trip} ${styles.active} ${styles.Expired} `}>
								<div className={styles.Info}>
									<div className={styles.Flex}>
										<div>
											<label>Request From:</label>
											<div className={styles.VehicleNumber}>Shrinivasan Iyer</div>
										</div>
										<div>
											<label>Request Date:</label>
											<div className={styles.PickupTime}>29.10.2024</div>
										</div>
										<div>
											<label>Request Expires in:</label>
											<div
												className={styles.GroupCode}
												style={{ color: "#F80404", fontWeight: 500, fontSize: "14px" }}
											>
												00:00:00
											</div>
										</div>
									</div>

									<div className={styles.Flex} style={{ alignItems: "center" }}>
										<div>
											<label>Request For:</label>
											<div className={styles.BoardingTime}>Pickup</div>
										</div>
										<div>
											<label>From Location:</label>
											<div className={styles.BoardingTime}>Borivali (W)</div>
										</div>
										<div>
											<label>Shift Time:</label>
											<div className={styles.BoardingTime}>2:30 AM</div>
										</div>
									</div>

									<div className={styles.Buttons}>
										<div className={styles.Reject}>THIS REQUEST EXPIRED AT 12:45 AM </div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
			{/* Page Content ends here */}
		</div>
	);
}
