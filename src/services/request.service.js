/* eslint-disable quotes */
import Cookies from "js-cookie";

/** fetchNewRequests */
export async function fetchNewRequests(
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
			`${process.env.NEXT_PUBLIC_API}/route_group/v1/requested_list/${locationId}`,
			{
				method: "POST",
				headers: {
					Authorization: `token ${token.split(`"`)[1]}`,
				},
				body: form_data,
				signal: signal,
			}
		);
		json = await res.json();

		if (json.status !== 200) {
			throw new Error(json.data);
		}
	} catch (error) {
		console.log(`Error Message: ${error.message}`);
		throw error; // Re-throw the error to propagate it
	}

	return json?.data;
}

/** fetchGroupRequests */
export async function fetchGroupRequests(
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
			`${process.env.NEXT_PUBLIC_API}/route_group/v1/grouped_list/${locationId}`,
			{
				method: "POST",
				headers: {
					Authorization: `token ${token.split(`"`)[1]}`,
				},
				body: form_data,
				signal: signal,
			}
		);
		json = await res.json();

		if (json.status !== 200) {
			throw new Error(json.data);
		}
	} catch (error) {
		console.log(`Error Message: ${error.message}`);
		throw error; // Re-throw the error to propagate it
	}

	return json?.data;
}

/** fetchGroupRequests */
export async function fetchAssignsRequests(
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
			`${process.env.NEXT_PUBLIC_API}/route_group/v1/assigned_request/${locationId}`,
			{
				method: "POST",
				headers: {
					Authorization: `token ${token.split(`"`)[1]}`,
				},
				body: form_data,
				signal: signal,
			}
		);
		json = await res.json();

		if (json.status !== 200) {
			throw new Error(json.data);
		}
	} catch (error) {
		console.log(`Error Message: ${error.message}`);
		throw error; // Re-throw the error to propagate it
	}

	return json?.data;
}

/** createGroups */
export async function createGroups(form_data, signal) {
	const token = Cookies.get("token");
	let json;
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API}/route_group/v1/make_group`,
			{
				method: "POST",
				headers: {
					Authorization: `token ${token.split(`"`)[1]}`,
				},
				body: form_data,
				signal: signal,
			}
		);
		json = await res.json();

		if (json.status !== 200) {
			throw new Error(json.data);
		}
	} catch (error) {
		console.log(`Error Message: ${error.message}`);
		throw error; // Re-throw the error to propagate it
	}

	return json;
}

/** changeTimeOfGroupsPerson */
export async function changeTimeOfGroupsPerson(groupPk, form_data) {
	const token = Cookies.get("token");
	let json;
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API}/route_group/v1/save_start_time/${groupPk}`,
			{
				method: "POST",
				headers: {
					Authorization: `token ${token.split(`"`)[1]}`,
				},
				body: form_data,
			}
		);
		json = await res.json();

		if (json.status !== 200) {
			throw new Error(json.data);
		}
	} catch (error) {
		console.log(`Error Message: ${error.message}`);
		throw error; // Re-throw the error to propagate it
	}

	return json;
}

/** changeTimeOfGroupsPerson */
export async function changeSequenceGroupsPerson(form_data) {
	const token = Cookies.get("token");
	let json;
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API}/route_group/v1/save_sequence`,
			{
				method: "POST",
				headers: {
					Authorization: `token ${token.split(`"`)[1]}`,
				},
				body: form_data,
			}
		);
		json = await res.json();

		if (json.status !== 200) {
			throw new Error(json.data);
		}
	} catch (error) {
		console.log(`Error Message: ${error.message}`);
		throw error; // Re-throw the error to propagate it
	}

	return json;
}

/** addSecurityToGroup */
export async function addSecurityToGroup(groupPk, form_data) {
	const token = Cookies.get("token");
	let json;
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API}/route_group/v1/map_security/${groupPk}`,
			{
				method: "POST",
				headers: {
					Authorization: `token ${token.split(`"`)[1]}`,
				},
				body: form_data,
			}
		);
		json = await res.json();

		if (json.status !== 200) {
			throw new Error(json.data);
		}
	} catch (error) {
		console.log(`Error Message: ${error.message}`);
		throw error; // Re-throw the error to propagate it
	}

	return json;
}

/** changeSecurity */
export async function changeSecurity(groupPk, form_data) {
	const token = Cookies.get("token");
	let json;
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API}/route_group/v1/change_security/${groupPk}`,
			{
				method: "POST",
				headers: {
					Authorization: `token ${token.split(`"`)[1]}`,
				},
				body: form_data,
			}
		);
		json = await res.json();

		if (json.status !== 200) {
			throw new Error(json.data);
		}
	} catch (error) {
		console.log(`Error Message: ${error.message}`);
		throw error; // Re-throw the error to propagate it
	}

	return json;
}

/** removeSecurity */
export async function removeSecurity(groupPk, form_data) {
	const token = Cookies.get("token");
	let json;
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API}/route_group/v1/remove_security/${groupPk}`,
			{
				method: "POST",
				headers: {
					Authorization: `token ${token.split(`"`)[1]}`,
				},
				body: form_data,
			}
		);
		json = await res.json();

		if (json.status !== 200) {
			throw new Error(json.data);
		}
	} catch (error) {
		console.log(`Error Message: ${error.message}`);
		throw error; // Re-throw the error to propagate it
	}

	return json;
}

/** removeRequest */
export async function removeRequest(groupPk, form_data) {
	const token = Cookies.get("token");
	let json;
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API}/route_group/v1/remove_request/${groupPk}`,
			{
				method: "POST",
				headers: {
					Authorization: `token ${token.split(`"`)[1]}`,
				},
				body: form_data,
			}
		);
		json = await res.json();

		if (json.status !== 200) {
			throw new Error(json.data);
		}
	} catch (error) {
		console.log(`Error Message: ${error.message}`);
		throw error; // Re-throw the error to propagate it
	}

	return json;
}

/** addRequestToExistingGroup */
export async function addRequestToExistingGroup(groupPk, form_data) {
	const token = Cookies.get("token");
	let json;
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API}/route_group/v1/add_request_group/${groupPk}`,
			{
				method: "POST",
				headers: {
					Authorization: `token ${token.split(`"`)[1]}`,
				},
				body: form_data,
			}
		);
		json = await res.json();

		if (json.status !== 200) {
			throw new Error(json.data);
		}
	} catch (error) {
		console.log(`Error Message: ${error.message}`);
		throw error; // Re-throw the error to propagate it
	}

	return json;
}

/** assignGroupToVehicle */
export async function assignGroupToVehicle(form_data, groupId) {
	const token = Cookies.get("token");
	let json;
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API}/route_group/v1/assign_group_vehicle/${groupId}`,
			{
				method: "POST",
				headers: {
					Authorization: `token ${token.split(`"`)[1]}`,
				},
				body: form_data,
			}
		);
		json = await res.json();

		if (json.status !== 200) {
			throw new Error(json.data);
		}
	} catch (error) {
		console.log(`Error Message: ${error.message}`);
		throw error; // Re-throw the error to propagate it
	}

	return json;
}

/** changeVehicleOfGroup */
export async function changeVehicleOfGroup(groupPk, form_data) {
	const token = Cookies.get("token");
	let json;
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API}/route_group/v1/change_group_vehicle/${groupPk}`,
			{
				method: "POST",
				headers: {
					Authorization: `token ${token.split(`"`)[1]}`,
				},
				body: form_data,
			}
		);
		json = await res.json();

		if (json.status !== 200) {
			throw new Error(json.data);
		}
	} catch (error) {
		console.log(`Error Message: ${error.message}`);
		throw error; // Re-throw the error to propagate it
	}

	return json;
}

/** movePassanger */
export async function movePassanger(form_data) {
	const token = Cookies.get("token");
	let json;
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API}/route_group/v1/change_group`,
			{
				method: "POST",
				headers: {
					Authorization: `token ${token.split(`"`)[1]}`,
				},
				body: form_data,
			}
		);
		json = await res.json();

		if (json.status !== 200) {
			throw new Error(json.data);
		}
	} catch (error) {
		console.log(`Error Message: ${error.message}`);
		throw error; // Re-throw the error to propagate it
	}

	return json;
}

/** movePassanger */
export async function addNewSecurity(groupId, form_data) {
	const token = Cookies.get("token");
	let json;
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API}/route_group/v1/map_new_security/${groupId}`,
			{
				method: "POST",
				headers: {
					Authorization: `token ${token.split(`"`)[1]}`,
				},
				body: form_data,
			}
		);
		json = await res.json();

		if (json.status !== 200) {
			throw new Error(json.data);
		}
	} catch (error) {
		console.log(`Error Message: ${error.message}`);
		throw error; // Re-throw the error to propagate it
	}

	return json;
}

/** getVehicleDetailsFromVehicleNumber */
export async function getVehicleDetailsFromVehicleNumber(signal, form_data) {
	const token = Cookies.get("token");
	let json;
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API}/route_group/v1/get_vehicle_detail`,
			{
				method: "POST",
				headers: {
					Authorization: `token ${token.split(`"`)[1]}`,
				},
				body: form_data,
				signal: signal,
			}
		);
		json = await res.json();

		// if (json.status !== 200) {
		// 	throw new Error(json.data);
		// }
	} catch (error) {
		console.log(`Error Message: ${error.message}`);
		throw error; // Re-throw the error to propagate it
	}

	return json;
}

/** getDriverDetailsFromNumber */
export async function getDriverDetailsFromNumber(signal, form_data) {
	const token = Cookies.get("token");
	let json;
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API}/route_group/v1/get_driver_detail`,
			{
				method: "POST",
				headers: {
					Authorization: `token ${token.split(`"`)[1]}`,
				},
				body: form_data,
				signal: signal,
			}
		);
		json = await res.json();

		// if (json.status !== 200) {
		// 	throw new Error(json.data);
		// }
	} catch (error) {
		console.log(`Error Message: ${error.message}`);
		throw error; // Re-throw the error to propagate it
	}

	return json;
}

/** createVehicle */
export async function createVehicle(form_data) {
	const token = Cookies.get("token");
	let json;
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API}/route_group/v1/map_vehicle_driver`,
			{
				method: "POST",
				headers: {
					Authorization: `token ${token.split(`"`)[1]}`,
				},
				body: form_data,
			}
		);
		json = await res.json();

		if (json.status !== 200) {
			throw new Error(json.data);
		}
	} catch (error) {
		console.log(`Error Message: ${error.message}`);
		throw error; // Re-throw the error to propagate it
	}

	return json;
}

/** createVehicle */
export async function aiFormByGroups(form_data, id) {
	const token = Cookies.get("token");
	let json;
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API}/route_group/v1/autoroster_v1/${id}`,
			{
				method: "POST",
				headers: {
					Authorization: `token ${token.split(`"`)[1]}`,
				},
				body: form_data,
			}
		);
		json = await res.json();
		console.log("result of max and min", json);

		if (json.status !== 200) {
			throw new Error(json.data);
		}
	} catch (error) {
		console.log(`Error Message: ${error.message}`);
		throw error; // Re-throw the error to propagate it
	}

	return json;
}

/** createVehicle */
export async function aiFormByCabs(form_data, id) {
	const token = Cookies.get("token");
	let json;
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API}/route_group/v1/autoroster_v2/${id}`,
			{
				method: "POST",
				headers: {
					Authorization: `token ${token.split(`"`)[1]}`,
				},
				body: form_data,
			}
		);
		json = await res.json();
		console.log("result of max and min", json);

		if (json.status !== 200) {
			throw new Error(json.data);
		}
	} catch (error) {
		console.log(`Error Message: ${error.message}`);
		throw error; // Re-throw the error to propagate it
	}

	return json;
}
