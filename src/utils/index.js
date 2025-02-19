/** convertTimeFormat */
export function convertTimeFormat(time) {
	// Create a Date object with a fixed date and the time
	const date = new Date("1970-01-01T" + time + "Z");

	// Extract the hours and minutes
	let hours = date.getUTCHours();
	let minutes = date.getUTCMinutes();

	// Determine AM or PM
	const ampm = hours >= 12 ? "PM" : "AM";

	// Convert hours to 12-hour format
	hours = hours % 12;
	hours = hours ? hours : 12; // Hour '0' should be '12'

	// Format minutes with a leading zero if needed
	minutes = minutes < 10 ? "0" + minutes : minutes;

	// Return the time in 12-hour format
	return `${hours}:${minutes} ${ampm}`;
}

/** Function to convert 12-hour time format (with AM/PM) to 24-hour format */
export const to24HourFormat = (time) => {
	const [timeStr, period] = time.split(" ");
	let [hours, minutes] = timeStr.split(":").map(Number);

	if (period === "PM" && hours !== 12) hours += 12;
	if (period === "AM" && hours === 12) hours = 0;

	return hours * 60 + minutes; // Return total minutes for easy comparison
};

/** convertTo24HourFormat */
export function convertTo24HourFormat(time) {
	// Split the time into the hour, minute, and period (AM/PM)
	const [timeStr, period] = time.split(" ");
	let [hour, minute] = timeStr.split(":").map(Number);

	// Convert hour to 24-hour format
	if (period === "AM" && hour === 12) {
		hour = 0; // 12 AM is 00:00
	} else if (period === "PM" && hour !== 12) {
		hour += 12; // PM times (except 12 PM) need to be adjusted
	}

	// Format the time as "HH:mm:ss"
	const formattedTime = `${hour.toString().padStart(2, "0")}:${minute
		?.toString()
		?.padStart(2, "0")}:00`;
	return formattedTime;
}

/**hideNumber */
export function hideNumber(number) {
	return number.slice(number.length - 4, number.length);
}

/** compareArrays */
export function compareArrays(arr1, arr2) {
	if (!arr1 || !arr2) {
		return arr1 || arr2;
	}
	if (arr1?.length !== arr2?.length) {
		return true; // Different number of elements
	}

	for (let i = 0; i < arr1.length; i++) {
		// Compare the JSON object by converting it to string
		if (JSON.stringify(arr1[i]) !== JSON.stringify(arr2[i])) {
			return true; // Elements are different
		}
	}

	return false; // No difference found
}
