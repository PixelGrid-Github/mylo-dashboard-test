/* eslint-disable quotes */
/** fetchLocations */
import Cookies from "js-cookie";

/** fetchLocations */
export async function fetchLocations() {
	const token = Cookies.get("token");
	let json;
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API}/route_group/v1/corporate_location`,
			{
				headers: {
					Authorization: `token ${token.split(`"`)[1]}`,
				},
			}
		);
		json = await res.json();

		console.log("zxczxczx", json);

		if (json.status !== 200) {
			throw new Error(json.data);
		}
	} catch (error) {
		console.log(`Error Message: ${error.message}`);
	}

	return json?.data;
}

/** fetchShifts */
export async function fetchShifts() {
	const token = Cookies.get("token");
	let json;
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API}/route_group/v1/shifts`,
			{
				headers: {
					Authorization: `token ${token.split(`"`)[1]}`,
				},
			}
		);
		json = await res.json();

		if (json.status !== 200) {
			throw new Error(json.data);
		}
	} catch (error) {
		console.log(`Error Message: ${error.message}`);
	}

	return json?.data;
}

/** fetchCounts */
export async function fetchCounts(
	locationId,
	form_data,
	signal,
	isFilterDataValid
) {
	const token = Cookies.get("token");
	let json;

	if (isFilterDataValid) {
		return json;
	}

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API}/route_group/v1/count_list/${locationId}`,
			{
				method: "POST",
				headers: {
					Authorization: `token ${token.split(`"`)[1]}`,
				},
				signal: signal,
				body: form_data,
			}
		);
		json = await res.json();

		if (json.status !== 200) {
			throw new Error(json.data);
		}
	} catch (error) {
		console.log(`Error Message: ${error.message}`);
	}

	return json?.data;
}

/** fetchSecurityList */
export async function fetchSecurityList(signal) {
	const token = Cookies.get("token");
	let json;
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API}/route_group/v1/security_person_list`,
			{
				headers: {
					Authorization: `token ${token.split(`"`)[1]}`,
				},
				signal: signal,
			}
		);
		json = await res.json();

		if (json.status !== 200) {
			throw new Error(json.data);
		}
	} catch (error) {
		console.log(`Error Message: ${error.message}`);
	}

	return json?.data;
}

/** fetchVehicalList */
export async function fetchVehicalList(signal) {
	const token = Cookies.get("token");
	let json;
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API}/route_group/v1/corporate_fleet`,
			{
				headers: {
					Authorization: `token ${token.split(`"`)[1]}`,
				},
				signal: signal,
			}
		);
		json = await res.json();

		if (json.status !== 200) {
			throw new Error(json.data);
		}
	} catch (error) {
		console.log(`Error Message: ${error.message}`);
	}

	return json?.data;
}

/** fetchVendorsList */
export async function fetchVendorsList(signal) {
	const token = Cookies.get("token");
	let json;
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API}/route_group/v1/vendor_list_api`,
			{
				headers: {
					Authorization: `token ${token.split(`"`)[1]}`,
				},
				signal: signal,
			}
		);
		json = await res.json();

		if (json.status !== 200) {
			throw new Error(json.data);
		}
	} catch (error) {
		console.log(`Error Message: ${error.message}`);
	}

	return json?.data;
}
