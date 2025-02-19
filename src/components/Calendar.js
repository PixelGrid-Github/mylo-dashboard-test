/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent */
"use client";

import { useEffect } from "react";
import $ from "jquery";

/** Header Calendar */
export default function Calendar() {
	useEffect(() => {
		/** loadJqueryUI */
		const loadJqueryUI = () => {
			if (typeof window !== "undefined" && window.jQuery) {
				const script = document.createElement("script");
				script.src = "https://code.jquery.com/ui/1.13.2/jquery-ui.min.js";
				script.async = true;
				script.onload = () => {
					const monthNames = [
						"Jan",
						"Feb",
						"Mar",
						"Apr",
						"May",
						"Jun",
						"Jul",
						"Aug",
						"Sep",
						"Oct",
						"Nov",
						"Dec",
					];
					const today = new Date();
					today.setHours(0, 0, 0, 0);

					/** applyMonthLabels */
					const applyMonthLabels = () => {
						$(".ui-datepicker .ui-state-default").each(function () {
							const day = $(this).text(); // Get the day from the cell
							const cell = $(this).closest("td");
							const dateInstance = cell.data("date") || new Date();
							const currentMonth = monthNames[dateInstance.getMonth()];
							$(this).html(`${day}<span class="month-label">${currentMonth}</span>`);
						});
					};

					$("#calendar").datepicker({
						showOtherMonths: true,
						selectOtherMonths: true,
						firstDay: 1, // Week starts from Monday
						beforeShowDay: function (date) {
							const day = date.getDate();
							const month = date.getMonth();
							const year = date.getFullYear();
							const holiday = date.getDay();
							const booked =
								date.getFullYear() === 2024 && date.getMonth() === 10 && day === 25; // November is month 10 (0-based)
							const notavailable =
								date.getFullYear() === 2024 && date.getMonth() === 10 && day === 26; // November is month 10 (0-based)

							if (booked) {
								return [true, "booked", "Booked"]; // Add the 'booked' class to 25th Nov 2024
							}
							if (notavailable) {
								return [true, "notavailable", "notavailable"]; // Add the 'notavailable' class to 25th Nov 2024
							}

							if (holiday === 0 || holiday === 6) {
								return [true, "holiday", "Holiday"];
							}

							if (date < today) {
								return [true, "past", "Past Date"];
							}

							return [true, "", ""];
						},
						onChangeMonthYear: function () {
							setTimeout(applyMonthLabels, 0);
						},
						onSelect: function () {
							setTimeout(applyMonthLabels, 0);
						},
					});

					// Apply custom labels after initial render
					setTimeout(applyMonthLabels, 0);
				};
				document.head.appendChild(script);
			}
		};

		// Ensure jQuery is available first, then load jQuery UI
		if (window.jQuery) {
			loadJqueryUI();
		} else {
			const script = document.createElement("script");
			script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
			script.async = true;
			script.onload = loadJqueryUI;
			document.head.appendChild(script);
		}
	}, []);
	return (
		<>
			<div
				id="calendar"
				style={{
					width: "320px",
					margin: "50px auto",
					padding: "10px",
					border: "1px solid #ddd",
					borderRadius: "8px",
					backgroundColor: "#f9f9f9",
				}}
			></div>
			<div className="Indicators">
				<div className="not-available">Not Available</div>
				<div className="selected">Selected</div>
				<div className="booked">Booked</div>
				<div className="sold-out">Sold out</div>
			</div>
		</>
	);
}
