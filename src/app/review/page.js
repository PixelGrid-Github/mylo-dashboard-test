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
import Review from "../../../public/img/review.svg";
import CloseIcon from "../../../public/img/close.svg";

// DATA //

/** Page */
export default function Page() {
	const [activeIndex, setActiveIndex] = useState(1);
	const [activeIndexCity, setActiveIndexCity] = useState(0);
	const tabs = ["My Request form", "My Trips", "Leader Dash"];
	const cities = ["VIKHROLI (E)", "Powai", "BKC"];

	/** handleTabClick */
	const handleTabClick = (index) => {
		setActiveIndex(index);
	};
	/** handleTabClickCity */
	const handleTabClickCity = (index) => {
		setActiveIndexCity(index);
	};

	return (
		<div>
			{/* Page Content starts here */}
			<main className={`${styles.BookingPage}`}>
				<div className={`${styles.TabSec} AppContainer`}>
					{tabs.map((tab, index) => (
						<div
							key={index}
							className={`${styles.TabName} ${
								activeIndex === index ? styles.active : ""
							}`}
							onClick={() => handleTabClick(index)}
						>
							{tab}
						</div>
					))}
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

					<div className={styles.ReviewPopup}>
						<div className={styles.PopupContent}>
							<img src={CloseIcon.src} alt="close" className={styles.Close} />

							<form>
								<div className={styles.UpperFlex}>
									<h3>
										Please rate your <b>PICKUP</b> Trip on <b>24.09.2024</b> for the{" "}
										<b>6:30 PM</b> Drop?
									</h3>
									<img src={Review.src} alt="Review" className={styles.ReviewImg} />
								</div>

								<div className={styles.Stars}>
									<h4>Vehicle Cleanliness?</h4>
									<div className="rate">
										<input type="radio" id="star5" name="rate" value="5" />
										<label htmlFor="star5" title="text">
											5 stars
										</label>
										<input type="radio" id="star4" name="rate" value="4" />
										<label htmlFor="star4" title="text">
											4 stars
										</label>
										<input type="radio" id="star3" name="rate" value="3" />
										<label htmlFor="star3" title="text">
											3 stars
										</label>
										<input type="radio" id="star2" name="rate" value="2" />
										<label htmlFor="star2" title="text">
											2 stars
										</label>
										<input type="radio" id="star1" name="rate" value="1" />
										<label htmlFor="star1" title="text">
											1 star
										</label>
									</div>
								</div>
								<div className={styles.Stars}>
									<h4>Driver Performance?</h4>
									<div className="rate">
										<input type="radio" id="star5" name="driverperformance" value="5" />
										<label htmlFor="star5" title="text">
											5 stars
										</label>
										<input type="radio" id="star4" name="driverperformance" value="4" />
										<label htmlFor="star4" title="text">
											4 stars
										</label>
										<input type="radio" id="star3" name="driverperformance" value="3" />
										<label htmlFor="star3" title="text">
											3 stars
										</label>
										<input type="radio" id="star2" name="driverperformance" value="2" />
										<label htmlFor="star2" title="text">
											2 stars
										</label>
										<input type="radio" id="star1" name="driverperformance" value="1" />
										<label htmlFor="star1" title="text">
											1 star
										</label>
									</div>
								</div>
								<div className={styles.Stars}>
									<h4>App Experience?</h4>
									<div className="rate">
										<input type="radio" id="star5" name="appexperience" value="5" />
										<label htmlFor="star5" title="text">
											5 stars
										</label>
										<input type="radio" id="star4" name="appexperience" value="4" />
										<label htmlFor="star4" title="text">
											4 stars
										</label>
										<input type="radio" id="star3" name="appexperience" value="3" />
										<label htmlFor="star3" title="text">
											3 stars
										</label>
										<input type="radio" id="star2" name="appexperience" value="2" />
										<label htmlFor="star2" title="text">
											2 stars
										</label>
										<input type="radio" id="star1" name="appexperience" value="1" />
										<label htmlFor="star1" title="text">
											1 star
										</label>
									</div>
								</div>

								<textarea
									name="feedback"
									placeholder="Please state any feedback regarding your trip (optional):"
									rows="6"
								></textarea>
								<div style={{ textAlign: "right" }}>
									<button type="submit">SUBMIT</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</main>
			{/* Page Content ends here */}
		</div>
	);
}
