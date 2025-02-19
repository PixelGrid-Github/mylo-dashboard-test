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
	const [activeIndex, setActiveIndex] = useState(1);
	const [activeIndexCity, setActiveIndexCity] = useState(0);
	const [activeTripIndex, setActiveTripIndex] = useState(null);
	const [isPopupVisible, setIsPopupVisible] = useState(false);
	const cities = ["VIKHROLI (E)", "Powai", "BKC"];

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

					<div className="location1 AppContainer">
						<p className={styles.Label} style={{ marginBottom: "4px" }}>
							ALL TRIPS:{" "}
						</p>
						<div className={styles.AllTrips}>
							<div
								className={`${styles.Trip} ${
									activeTripIndex === 0 ? styles.active : ""
								}`}
								onClick={() => handleTripClick(0)}
							>
								<div className={styles.TripFlex}>
									<div className={styles.PickBox}>PU</div>
									<div className={styles.TripDate}>
										<label>TRIP DATE:</label>
										<div>10.11.2022</div>
									</div>
									<div className={styles.Shift}>
										<label>SHIFT:</label>
										<div>07:30 PM</div>
									</div>
								</div>

								<div className={styles.Info}>
									<div className={styles.Flex}>
										<div>
											<label>Vehicle Number:</label>
											<div className={styles.VehicleNumber}>MH04CT1234</div>
										</div>
										<div>
											<label>Pickup Time:</label>
											<div className={styles.PickupTime}>06:15 PM</div>
										</div>
										<div>
											<label style={{ color: "#FF9906" }}>GROUP CODE</label>
											<div className={styles.GroupCode} style={{ color: "#FF9906" }}>
												G31
											</div>
										</div>
									</div>

									<div className={styles.Flex} style={{ alignItems: "center" }}>
										<div>
											<label>Boarding Time:</label>
											<div className={styles.BoardingTime}>06:21 PM</div>
										</div>
										<div>
											<label>Deboarding Time:</label>
											<div className={styles.DeboardingTime}>--:-- --</div>
										</div>
										<div>
											<div
												onClick={handleCancelClick}
												className={styles.CancelRide}
												style={{ color: "#F80404", fontSize: "9px" }}
											>
												CANCEL RIDE
											</div>
										</div>
									</div>

									<div className={styles.AddressFlex}>
										<div>
											<label>Pickup Address:</label>
											<div className={styles.Address}>
												A704, Narayan Heritage, Kanderpada, Dahisar W, Mumbai 400068
											</div>
										</div>
										<div className={styles.Line}>---------</div>
										<div>
											<label>Drop Address:</label>
											<div className={styles.Address} style={{ textAlign: "right" }}>
												A704, Narayan Heritage, Kanderpada, Dahisar W, Mumbai 400068
											</div>
										</div>
									</div>
								</div>
							</div>

							<div
								className={`${styles.Trip} ${
									activeTripIndex === 1 ? styles.active : ""
								}`}
								onClick={() => handleTripClick(1)}
							>
								<div className={styles.TripFlex}>
									<div className={styles.DropBox}>DP</div>
									<div className={styles.TripDate}>
										<label>TRIP DATE:</label>
										<div>10.11.2022</div>
									</div>
									<div className={styles.Shift}>
										<label>SHIFT:</label>
										<div>07:30 PM</div>
									</div>
								</div>

								<div className={styles.Info}>
									<div className={styles.Flex}>
										<div>
											<label>Vehicle Number:</label>
											<div className={styles.VehicleNumber}>MH04CT1234</div>
										</div>
										<div>
											<label>Pickup Time:</label>
											<div className={styles.PickupTime}>06:15 PM</div>
										</div>
										<div>
											<label style={{ color: "#FF9906" }}>GROUP CODE</label>
											<div className={styles.GroupCode} style={{ color: "#FF9906" }}>
												G31
											</div>
										</div>
									</div>

									<div className={styles.Flex} style={{ alignItems: "center" }}>
										<div>
											<label>Boarding Time:</label>
											<div className={styles.BoardingTime}>06:21 PM</div>
										</div>
										<div>
											<label>Deboarding Time:</label>
											<div className={styles.DeboardingTime}>--:-- --</div>
										</div>
										<div>
											<div
												onClick={handleCancelClick}
												className={styles.CancelRide}
												style={{ color: "#F80404", fontSize: "9px" }}
											>
												CANCEL RIDE
											</div>
										</div>
									</div>

									<div className={styles.AddressFlex}>
										<div>
											<label>Pickup Address:</label>
											<div className={styles.Address}>
												A704, Narayan Heritage, Kanderpada, Dahisar W, Mumbai 400068
											</div>
										</div>
										<div className={styles.Line}>---------</div>
										<div>
											<label>Drop Address:</label>
											<div className={styles.Address} style={{ textAlign: "right" }}>
												A704, Narayan Heritage, Kanderpada, Dahisar W, Mumbai 400068
											</div>
										</div>
									</div>
								</div>
							</div>

							<div
								className={`${styles.Trip} ${
									activeTripIndex === 2 ? styles.active : ""
								}`}
								onClick={() => handleTripClick(2)}
							>
								<div className={styles.TripFlex}>
									<div className={styles.PickBox}>PU</div>
									<div className={styles.TripDate}>
										<label>TRIP DATE:</label>
										<div>10.11.2022</div>
									</div>
									<div className={styles.Shift}>
										<label>SHIFT:</label>
										<div>07:30 PM</div>
									</div>
								</div>

								<div className={styles.Info}>
									<div className={styles.Flex}>
										<div>
											<label>Vehicle Number:</label>
											<div className={styles.VehicleNumber}>MH04CT1234</div>
										</div>
										<div>
											<label>Pickup Time:</label>
											<div className={styles.PickupTime}>06:15 PM</div>
										</div>
										<div>
											<label style={{ color: "#FF9906" }}>GROUP CODE</label>
											<div className={styles.GroupCode} style={{ color: "#FF9906" }}>
												G31
											</div>
										</div>
									</div>

									<div className={styles.Flex} style={{ alignItems: "center" }}>
										<div>
											<label>Boarding Time:</label>
											<div className={styles.BoardingTime}>06:21 PM</div>
										</div>
										<div>
											<label>Deboarding Time:</label>
											<div className={styles.DeboardingTime}>--:-- --</div>
										</div>
										<div>
											<div
												onClick={handleCancelClick}
												className={styles.CancelRide}
												style={{ color: "#F80404", fontSize: "9px" }}
											>
												CANCEL RIDE
											</div>
										</div>
									</div>

									<div className={styles.AddressFlex}>
										<div>
											<label>Pickup Address:</label>
											<div className={styles.Address}>
												A704, Narayan Heritage, Kanderpada, Dahisar W, Mumbai 400068
											</div>
										</div>
										<div className={styles.Line}>---------</div>
										<div>
											<label>Drop Address:</label>
											<div className={styles.Address} style={{ textAlign: "right" }}>
												A704, Narayan Heritage, Kanderpada, Dahisar W, Mumbai 400068
											</div>
										</div>
									</div>
								</div>
							</div>

							<div
								className={`${styles.Trip} ${styles.Cancelled} ${
									activeTripIndex === 3 ? styles.active : ""
								}`}
								onClick={() => handleTripClick(3)}
							>
								<div className={styles.TripFlex}>
									<div className={styles.PickBox}>PU</div>
									<div className={styles.TripDate}>
										<label>TRIP DATE:</label>
										<div>10.11.2022</div>
									</div>
									<div className={styles.Shift}>
										<label>SHIFT:</label>
										<div>07:30 PM</div>
									</div>
								</div>

								<div className={styles.Info}>
									<div className={styles.Flex}>
										<div>
											<label>Vehicle Number:</label>
											<div className={styles.VehicleNumber}>MH04CT1234</div>
										</div>
										<div>
											<label>Pickup Time:</label>
											<div className={styles.PickupTime}>06:15 PM</div>
										</div>
										<div>
											<label style={{ color: "#FF9906" }}>GROUP CODE</label>
											<div className={styles.GroupCode} style={{ color: "#FF9906" }}>
												G31
											</div>
										</div>
									</div>

									<div className={styles.Flex} style={{ alignItems: "center" }}>
										<div>
											<label>Boarding Time:</label>
											<div className={styles.BoardingTime}>06:21 PM</div>
										</div>
										<div>
											<label>Deboarding Time:</label>
											<div className={styles.DeboardingTime}>--:-- --</div>
										</div>
										<div>
											<div
												onClick={handleCancelClick}
												className={styles.CancelRide}
												style={{ color: "#F80404", fontSize: "9px" }}
											>
												CANCEL RIDE
											</div>
										</div>
									</div>

									<div className={styles.AddressFlex}>
										<div>
											<label>Pickup Address:</label>
											<div className={styles.Address}>
												A704, Narayan Heritage, Kanderpada, Dahisar W, Mumbai 400068
											</div>
										</div>
										<div className={styles.Line}>---------</div>
										<div>
											<label>Drop Address:</label>
											<div className={styles.Address} style={{ textAlign: "right" }}>
												A704, Narayan Heritage, Kanderpada, Dahisar W, Mumbai 400068
											</div>
										</div>
									</div>
								</div>
							</div>

							<div
								className={`${styles.Trip} ${
									activeTripIndex === 4 ? styles.active : ""
								}`}
								onClick={() => handleTripClick(4)}
							>
								<div className={styles.TripFlex}>
									<div className={styles.PickBox}>PU</div>
									<div className={styles.TripDate}>
										<label>TRIP DATE:</label>
										<div>10.11.2022</div>
									</div>
									<div className={styles.Shift}>
										<label>SHIFT:</label>
										<div>07:30 PM</div>
									</div>
								</div>

								<div className={styles.Info}>
									<div className={styles.Flex}>
										<div>
											<label>Vehicle Number:</label>
											<div className={styles.VehicleNumber}>MH04CT1234</div>
										</div>
										<div>
											<label>Pickup Time:</label>
											<div className={styles.PickupTime}>06:15 PM</div>
										</div>
										<div>
											<label style={{ color: "#FF9906" }}>GROUP CODE</label>
											<div className={styles.GroupCode} style={{ color: "#FF9906" }}>
												G31
											</div>
										</div>
									</div>

									<div className={styles.Flex} style={{ alignItems: "center" }}>
										<div>
											<label>Boarding Time:</label>
											<div className={styles.BoardingTime}>06:21 PM</div>
										</div>
										<div>
											<label>Deboarding Time:</label>
											<div className={styles.DeboardingTime}>--:-- --</div>
										</div>
										<div>
											<div
												onClick={handleCancelClick}
												className={styles.CancelRide}
												style={{ color: "#F80404", fontSize: "9px" }}
											>
												CANCEL RIDE
											</div>
										</div>
									</div>

									<div className={styles.AddressFlex}>
										<div>
											<label>Pickup Address:</label>
											<div className={styles.Address}>
												A704, Narayan Heritage, Kanderpada, Dahisar W, Mumbai 400068
											</div>
										</div>
										<div className={styles.Line}>---------</div>
										<div>
											<label>Drop Address:</label>
											<div className={styles.Address} style={{ textAlign: "right" }}>
												A704, Narayan Heritage, Kanderpada, Dahisar W, Mumbai 400068
											</div>
										</div>
									</div>
								</div>
							</div>

							<div
								className={`${styles.Trip} ${
									activeTripIndex === 5 ? styles.active : ""
								}`}
								onClick={() => handleTripClick(5)}
							>
								<div className={styles.TripFlex}>
									<div className={styles.PickBox}>PU</div>
									<div className={styles.TripDate}>
										<label>TRIP DATE:</label>
										<div>10.11.2022</div>
									</div>
									<div className={styles.Shift}>
										<label>SHIFT:</label>
										<div>07:30 PM</div>
									</div>
								</div>

								<div className={styles.Info}>
									<div className={styles.Flex}>
										<div>
											<label>Vehicle Number:</label>
											<div className={styles.VehicleNumber}>MH04CT1234</div>
										</div>
										<div>
											<label>Pickup Time:</label>
											<div className={styles.PickupTime}>06:15 PM</div>
										</div>
										<div>
											<label style={{ color: "#FF9906" }}>GROUP CODE</label>
											<div className={styles.GroupCode} style={{ color: "#FF9906" }}>
												G31
											</div>
										</div>
									</div>

									<div className={styles.Flex} style={{ alignItems: "center" }}>
										<div>
											<label>Boarding Time:</label>
											<div className={styles.BoardingTime}>06:21 PM</div>
										</div>
										<div>
											<label>Deboarding Time:</label>
											<div className={styles.DeboardingTime}>--:-- --</div>
										</div>
										<div>
											<div
												onClick={handleCancelClick}
												className={styles.CancelRide}
												style={{ color: "#F80404", fontSize: "9px" }}
											>
												CANCEL RIDE
											</div>
										</div>
									</div>

									<div className={styles.AddressFlex}>
										<div>
											<label>Pickup Address:</label>
											<div className={styles.Address}>
												A704, Narayan Heritage, Kanderpada, Dahisar W, Mumbai 400068
											</div>
										</div>
										<div className={styles.Line}>---------</div>
										<div>
											<label>Drop Address:</label>
											<div className={styles.Address} style={{ textAlign: "right" }}>
												A704, Narayan Heritage, Kanderpada, Dahisar W, Mumbai 400068
											</div>
										</div>
									</div>
								</div>
							</div>

							<div
								className={`${styles.Trip} ${
									activeTripIndex === 6 ? styles.active : ""
								}`}
								onClick={() => handleTripClick(6)}
							>
								<div className={styles.TripFlex}>
									<div className={styles.PickBox}>PU</div>
									<div className={styles.TripDate}>
										<label>TRIP DATE:</label>
										<div>10.11.2022</div>
									</div>
									<div className={styles.Shift}>
										<label>SHIFT:</label>
										<div>07:30 PM</div>
									</div>
								</div>

								<div className={styles.Info}>
									<div className={styles.Flex}>
										<div>
											<label>Vehicle Number:</label>
											<div className={styles.VehicleNumber}>MH04CT1234</div>
										</div>
										<div>
											<label>Pickup Time:</label>
											<div className={styles.PickupTime}>06:15 PM</div>
										</div>
										<div>
											<label style={{ color: "#FF9906" }}>GROUP CODE</label>
											<div className={styles.GroupCode} style={{ color: "#FF9906" }}>
												G31
											</div>
										</div>
									</div>

									<div className={styles.Flex} style={{ alignItems: "center" }}>
										<div>
											<label>Boarding Time:</label>
											<div className={styles.BoardingTime}>06:21 PM</div>
										</div>
										<div>
											<label>Deboarding Time:</label>
											<div className={styles.DeboardingTime}>--:-- --</div>
										</div>
										<div>
											<div
												onClick={handleCancelClick}
												className={styles.CancelRide}
												style={{ color: "#F80404", fontSize: "9px" }}
											>
												CANCEL RIDE
											</div>
										</div>
									</div>

									<div className={styles.AddressFlex}>
										<div>
											<label>Pickup Address:</label>
											<div className={styles.Address}>
												A704, Narayan Heritage, Kanderpada, Dahisar W, Mumbai 400068
											</div>
										</div>
										<div className={styles.Line}>---------</div>
										<div>
											<label>Drop Address:</label>
											<div className={styles.Address} style={{ textAlign: "right" }}>
												A704, Narayan Heritage, Kanderpada, Dahisar W, Mumbai 400068
											</div>
										</div>
									</div>
								</div>
							</div>

							<div
								className={`${styles.Trip} ${
									activeTripIndex === 7 ? styles.active : ""
								}`}
								onClick={() => handleTripClick(7)}
							>
								<div className={styles.TripFlex}>
									<div className={styles.PickBox}>PU</div>
									<div className={styles.TripDate}>
										<label>TRIP DATE:</label>
										<div>10.11.2022</div>
									</div>
									<div className={styles.Shift}>
										<label>SHIFT:</label>
										<div>07:30 PM</div>
									</div>
								</div>

								<div className={styles.Info}>
									<div className={styles.Flex}>
										<div>
											<label>Vehicle Number:</label>
											<div className={styles.VehicleNumber}>MH04CT1234</div>
										</div>
										<div>
											<label>Pickup Time:</label>
											<div className={styles.PickupTime}>06:15 PM</div>
										</div>
										<div>
											<label style={{ color: "#FF9906" }}>GROUP CODE</label>
											<div className={styles.GroupCode} style={{ color: "#FF9906" }}>
												G31
											</div>
										</div>
									</div>

									<div className={styles.Flex} style={{ alignItems: "center" }}>
										<div>
											<label>Boarding Time:</label>
											<div className={styles.BoardingTime}>06:21 PM</div>
										</div>
										<div>
											<label>Deboarding Time:</label>
											<div className={styles.DeboardingTime}>--:-- --</div>
										</div>
										<div>
											<div
												onClick={handleCancelClick}
												className={styles.CancelRide}
												style={{ color: "#F80404", fontSize: "9px" }}
											>
												CANCEL RIDE
											</div>
										</div>
									</div>

									<div className={styles.AddressFlex}>
										<div>
											<label>Pickup Address:</label>
											<div className={styles.Address}>
												A704, Narayan Heritage, Kanderpada, Dahisar W, Mumbai 400068
											</div>
										</div>
										<div className={styles.Line}>---------</div>
										<div>
											<label>Drop Address:</label>
											<div className={styles.Address} style={{ textAlign: "right" }}>
												A704, Narayan Heritage, Kanderpada, Dahisar W, Mumbai 400068
											</div>
										</div>
									</div>
								</div>
							</div>

							<div
								className={`${styles.Trip} ${
									activeTripIndex === 8 ? styles.active : ""
								}`}
								onClick={() => handleTripClick(8)}
							>
								<div className={styles.TripFlex}>
									<div className={styles.PickBox}>PU</div>
									<div className={styles.TripDate}>
										<label>TRIP DATE:</label>
										<div>10.11.2022</div>
									</div>
									<div className={styles.Shift}>
										<label>SHIFT:</label>
										<div>07:30 PM</div>
									</div>
								</div>

								<div className={styles.Info}>
									<div className={styles.Flex}>
										<div>
											<label>Vehicle Number:</label>
											<div className={styles.VehicleNumber}>MH04CT1234</div>
										</div>
										<div>
											<label>Pickup Time:</label>
											<div className={styles.PickupTime}>06:15 PM</div>
										</div>
										<div>
											<label style={{ color: "#FF9906" }}>GROUP CODE</label>
											<div className={styles.GroupCode} style={{ color: "#FF9906" }}>
												G31
											</div>
										</div>
									</div>

									<div className={styles.Flex} style={{ alignItems: "center" }}>
										<div>
											<label>Boarding Time:</label>
											<div className={styles.BoardingTime}>06:21 PM</div>
										</div>
										<div>
											<label>Deboarding Time:</label>
											<div className={styles.DeboardingTime}>--:-- --</div>
										</div>
										<div>
											<div
												onClick={handleCancelClick}
												className={styles.CancelRide}
												style={{ color: "#F80404", fontSize: "9px" }}
											>
												CANCEL RIDE
											</div>
										</div>
									</div>

									<div className={styles.AddressFlex}>
										<div>
											<label>Pickup Address:</label>
											<div className={styles.Address}>
												A704, Narayan Heritage, Kanderpada, Dahisar W, Mumbai 400068
											</div>
										</div>
										<div className={styles.Line}>---------</div>
										<div>
											<label>Drop Address:</label>
											<div className={styles.Address} style={{ textAlign: "right" }}>
												A704, Narayan Heritage, Kanderpada, Dahisar W, Mumbai 400068
											</div>
										</div>
									</div>
								</div>
							</div>

							<div
								className={`${styles.Trip} ${
									activeTripIndex === 9 ? styles.active : ""
								}`}
								onClick={() => handleTripClick(9)}
							>
								<div className={styles.TripFlex}>
									<div className={styles.PickBox}>PU</div>
									<div className={styles.TripDate}>
										<label>TRIP DATE:</label>
										<div>10.11.2022</div>
									</div>
									<div className={styles.Shift}>
										<label>SHIFT:</label>
										<div>07:30 PM</div>
									</div>
								</div>

								<div className={styles.Info}>
									<div className={styles.Flex}>
										<div>
											<label>Vehicle Number:</label>
											<div className={styles.VehicleNumber}>MH04CT1234</div>
										</div>
										<div>
											<label>Pickup Time:</label>
											<div className={styles.PickupTime}>06:15 PM</div>
										</div>
										<div>
											<label style={{ color: "#FF9906" }}>GROUP CODE</label>
											<div className={styles.GroupCode} style={{ color: "#FF9906" }}>
												G31
											</div>
										</div>
									</div>

									<div className={styles.Flex} style={{ alignItems: "center" }}>
										<div>
											<label>Boarding Time:</label>
											<div className={styles.BoardingTime}>06:21 PM</div>
										</div>
										<div>
											<label>Deboarding Time:</label>
											<div className={styles.DeboardingTime}>--:-- --</div>
										</div>
										<div>
											<div
												onClick={handleCancelClick}
												className={styles.CancelRide}
												style={{ color: "#F80404", fontSize: "9px" }}
											>
												CANCEL RIDE
											</div>
										</div>
									</div>

									<div className={styles.AddressFlex}>
										<div>
											<label>Pickup Address:</label>
											<div className={styles.Address}>
												A704, Narayan Heritage, Kanderpada, Dahisar W, Mumbai 400068
											</div>
										</div>
										<div className={styles.Line}>---------</div>
										<div>
											<label>Drop Address:</label>
											<div className={styles.Address} style={{ textAlign: "right" }}>
												A704, Narayan Heritage, Kanderpada, Dahisar W, Mumbai 400068
											</div>
										</div>
									</div>
								</div>
							</div>

							<div
								className={`${styles.Trip} ${
									activeTripIndex === 10 ? styles.active : ""
								}`}
								onClick={() => handleTripClick(10)}
							>
								<div className={styles.TripFlex}>
									<div className={styles.PickBox}>PU</div>
									<div className={styles.TripDate}>
										<label>TRIP DATE:</label>
										<div>10.11.2022</div>
									</div>
									<div className={styles.Shift}>
										<label>SHIFT:</label>
										<div>07:30 PM</div>
									</div>
								</div>

								<div className={styles.Info}>
									<div className={styles.Flex}>
										<div>
											<label>Vehicle Number:</label>
											<div className={styles.VehicleNumber}>MH04CT1234</div>
										</div>
										<div>
											<label>Pickup Time:</label>
											<div className={styles.PickupTime}>06:15 PM</div>
										</div>
										<div>
											<label style={{ color: "#FF9906" }}>GROUP CODE</label>
											<div className={styles.GroupCode} style={{ color: "#FF9906" }}>
												G31
											</div>
										</div>
									</div>

									<div className={styles.Flex} style={{ alignItems: "center" }}>
										<div>
											<label>Boarding Time:</label>
											<div className={styles.BoardingTime}>06:21 PM</div>
										</div>
										<div>
											<label>Deboarding Time:</label>
											<div className={styles.DeboardingTime}>--:-- --</div>
										</div>
										<div>
											<div
												onClick={handleCancelClick}
												className={styles.CancelRide}
												style={{ color: "#F80404", fontSize: "9px" }}
											>
												CANCEL RIDE
											</div>
										</div>
									</div>

									<div className={styles.AddressFlex}>
										<div>
											<label>Pickup Address:</label>
											<div className={styles.Address}>
												A704, Narayan Heritage, Kanderpada, Dahisar W, Mumbai 400068
											</div>
										</div>
										<div className={styles.Line}>---------</div>
										<div>
											<label>Drop Address:</label>
											<div className={styles.Address} style={{ textAlign: "right" }}>
												A704, Narayan Heritage, Kanderpada, Dahisar W, Mumbai 400068
											</div>
										</div>
									</div>
								</div>
							</div>

							<div
								className={`${styles.Trip} ${
									activeTripIndex === 11 ? styles.active : ""
								}`}
								onClick={() => handleTripClick(11)}
							>
								<div className={styles.TripFlex}>
									<div className={styles.PickBox}>PU</div>
									<div className={styles.TripDate}>
										<label>TRIP DATE:</label>
										<div>10.11.2022</div>
									</div>
									<div className={styles.Shift}>
										<label>SHIFT:</label>
										<div>07:30 PM</div>
									</div>
								</div>

								<div className={styles.Info}>
									<div className={styles.Flex}>
										<div>
											<label>Vehicle Number:</label>
											<div className={styles.VehicleNumber}>MH04CT1234</div>
										</div>
										<div>
											<label>Pickup Time:</label>
											<div className={styles.PickupTime}>06:15 PM</div>
										</div>
										<div>
											<label style={{ color: "#FF9906" }}>GROUP CODE</label>
											<div className={styles.GroupCode} style={{ color: "#FF9906" }}>
												G31
											</div>
										</div>
									</div>

									<div className={styles.Flex} style={{ alignItems: "center" }}>
										<div>
											<label>Boarding Time:</label>
											<div className={styles.BoardingTime}>06:21 PM</div>
										</div>
										<div>
											<label>Deboarding Time:</label>
											<div className={styles.DeboardingTime}>--:-- --</div>
										</div>
										<div>
											<div
												onClick={handleCancelClick}
												className={styles.CancelRide}
												style={{ color: "#F80404", fontSize: "9px" }}
											>
												CANCEL RIDE
											</div>
										</div>
									</div>

									<div className={styles.AddressFlex}>
										<div>
											<label>Pickup Address:</label>
											<div className={styles.Address}>
												A704, Narayan Heritage, Kanderpada, Dahisar W, Mumbai 400068
											</div>
										</div>
										<div className={styles.Line}>---------</div>
										<div>
											<label>Drop Address:</label>
											<div className={styles.Address} style={{ textAlign: "right" }}>
												A704, Narayan Heritage, Kanderpada, Dahisar W, Mumbai 400068
											</div>
										</div>
									</div>
								</div>
							</div>

							<div
								className={`${styles.Trip} ${
									activeTripIndex === 12 ? styles.active : ""
								}`}
								onClick={() => handleTripClick(12)}
							>
								<div className={styles.TripFlex}>
									<div className={styles.PickBox}>PU</div>
									<div className={styles.TripDate}>
										<label>TRIP DATE:</label>
										<div>10.11.2022</div>
									</div>
									<div className={styles.Shift}>
										<label>SHIFT:</label>
										<div>07:30 PM</div>
									</div>
								</div>

								<div className={styles.Info}>
									<div className={styles.Flex}>
										<div>
											<label>Vehicle Number:</label>
											<div className={styles.VehicleNumber}>MH04CT1234</div>
										</div>
										<div>
											<label>Pickup Time:</label>
											<div className={styles.PickupTime}>06:15 PM</div>
										</div>
										<div>
											<label style={{ color: "#FF9906" }}>GROUP CODE</label>
											<div className={styles.GroupCode} style={{ color: "#FF9906" }}>
												G31
											</div>
										</div>
									</div>

									<div className={styles.Flex} style={{ alignItems: "center" }}>
										<div>
											<label>Boarding Time:</label>
											<div className={styles.BoardingTime}>06:21 PM</div>
										</div>
										<div>
											<label>Deboarding Time:</label>
											<div className={styles.DeboardingTime}>--:-- --</div>
										</div>
										<div>
											<div
												onClick={handleCancelClick}
												className={styles.CancelRide}
												style={{ color: "#F80404", fontSize: "9px" }}
											>
												CANCEL RIDE
											</div>
										</div>
									</div>

									<div className={styles.AddressFlex}>
										<div>
											<label>Pickup Address:</label>
											<div className={styles.Address}>
												A704, Narayan Heritage, Kanderpada, Dahisar W, Mumbai 400068
											</div>
										</div>
										<div className={styles.Line}>---------</div>
										<div>
											<label>Drop Address:</label>
											<div className={styles.Address} style={{ textAlign: "right" }}>
												A704, Narayan Heritage, Kanderpada, Dahisar W, Mumbai 400068
											</div>
										</div>
									</div>
								</div>
							</div>

							<div
								className={`${styles.Trip} ${
									activeTripIndex === 13 ? styles.active : ""
								}`}
								onClick={() => handleTripClick(13)}
							>
								<div className={styles.TripFlex}>
									<div className={styles.PickBox}>PU</div>
									<div className={styles.TripDate}>
										<label>TRIP DATE:</label>
										<div>10.11.2022</div>
									</div>
									<div className={styles.Shift}>
										<label>SHIFT:</label>
										<div>07:30 PM</div>
									</div>
								</div>

								<div className={styles.Info}>
									<div className={styles.Flex}>
										<div>
											<label>Vehicle Number:</label>
											<div className={styles.VehicleNumber}>MH04CT1234</div>
										</div>
										<div>
											<label>Pickup Time:</label>
											<div className={styles.PickupTime}>06:15 PM</div>
										</div>
										<div>
											<label style={{ color: "#FF9906" }}>GROUP CODE</label>
											<div className={styles.GroupCode} style={{ color: "#FF9906" }}>
												G31
											</div>
										</div>
									</div>

									<div className={styles.Flex} style={{ alignItems: "center" }}>
										<div>
											<label>Boarding Time:</label>
											<div className={styles.BoardingTime}>06:21 PM</div>
										</div>
										<div>
											<label>Deboarding Time:</label>
											<div className={styles.DeboardingTime}>--:-- --</div>
										</div>
										<div>
											<div
												onClick={handleCancelClick}
												className={styles.CancelRide}
												style={{ color: "#F80404", fontSize: "9px" }}
											>
												CANCEL RIDE
											</div>
										</div>
									</div>

									<div className={styles.AddressFlex}>
										<div>
											<label>Pickup Address:</label>
											<div className={styles.Address}>
												A704, Narayan Heritage, Kanderpada, Dahisar W, Mumbai 400068
											</div>
										</div>
										<div className={styles.Line}>---------</div>
										<div>
											<label>Drop Address:</label>
											<div className={styles.Address} style={{ textAlign: "right" }}>
												A704, Narayan Heritage, Kanderpada, Dahisar W, Mumbai 400068
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{isPopupVisible && (
						<div className={styles.CancelPopup}>
							<div className={styles.PopupContent}>
								<img
									src={CloseIcon.src}
									alt="close"
									className={styles.Close}
									onClick={() => setIsPopupVisible(false)}
								/>
								<img
									src={CancelRide.src}
									alt="CancelRide"
									className={styles.CancelRide}
								/>
								<div className={styles.Note}>
									Are you sure you want to <br />
									cancel this trip request?
								</div>
								<div className={styles.Trip}>
									<div className={styles.TripFlex}>
										<div className={styles.PickBox}>PU</div>
										<div className={styles.TripDate}>
											<label>TRIP DATE:</label>
											<div>10.11.2022</div>
										</div>
										<div className={styles.Shift}>
											<label>SHIFT:</label>
											<div>07:30 PM</div>
										</div>
									</div>
								</div>
								<div className={styles.Confirm}>Confirm Cancellation</div>
							</div>
						</div>
					)}
				</div>
			</main>
			{/* Page Content ends here */}
		</div>
	);
}
