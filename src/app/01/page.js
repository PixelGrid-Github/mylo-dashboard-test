"use client";
// MODULES //

// COMPONENTS //
import { useState } from "react";
// import Footer from "@/components/Footer";
// import Header from "@/components/Header";
// import MetaTags from "@/components/MetaTags";
// import Tabs from "@/components/Tabs";
// import New from "@/components/New";
// import Grouped from "@/components/Grouped";
// import Assigned from "@/components/Assigned";
// import Bottom1 from "@/components/Bottom1";
// import Bottom2 from "@/components/Bottom2";
// import Bottom3 from "@/components/Bottom3";
// import Map from "@/components/Map";

// SECTIONS //

// PLUGINS //
import "jquery-ui/themes/base/all.css";
import "jquery-ui/themes/base/datepicker.css";

// UTILS //

// STYLES //
import styles from "@/styles/pages/Booking.module.scss";

// IMAGES //

// DATA //

/** Page */
export default function Page() {
	const [activeIndexCity, setActiveIndexCity] = useState(0);

	/** handleTabClickCity */
	const handleTabClickCity = (index) => {
		setActiveIndexCity(index);
	};
	return (
		<div>
			{/* Page Content starts here */}
			<main className={`${styles.BookingPage}`}>
				{/* <div className="FullContainer">
					<div className="left">
						<div className="leftPadding">
							<div className={styles.SelectOptions}>
								<div className={styles.Option2}>
									<select name="SelectDate" id="SelectDate" required>
										<option defaultValue="" disabled selected>
											SELECT DATE
										</option>
										<option value="Staff 1">Date 1</option>
										<option value="Staff 2">Date 2</option>
									</select>
									<select name="duty" id="duty" required>
										<option value="" disabled selected>
											DUTY
										</option>
										<option value="Staff 1">DUTY 1</option>
										<option value="Staff 2">DUTY 2</option>
									</select>
									<select name="shift" id="shift" required>
										<option value="" disabled selected>
											SHIFT
										</option>
										<option value="Staff 1">SHIFT 1</option>
										<option value="Staff 2">SHIFT 2</option>
									</select>
								</div>
							</div>

							<Tabs
								activeIndexCity={activeIndexCity}
								handleTabClickCity={handleTabClickCity}
							/>

							{activeIndexCity === 0 && <New />}
							{activeIndexCity === 1 && <Grouped />}
							{activeIndexCity === 2 && <Assigned />}
						</div>

						{activeIndexCity === 0 && <Bottom1 />}
						{activeIndexCity === 1 && <Bottom2 />}
						{activeIndexCity === 2 && <Bottom3 />}
					</div>
					<div className="right">
						<Map />
					</div>
				</div> */}
			</main>
			{/* Page Content ends here */}
		</div>
	);
}
