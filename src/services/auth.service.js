import Cookies from "js-cookie";

/** login */
export async function login(form_data) {
	let data;

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API}/route_group/v1/supervisor_login`,
			{
				method: "POST",
				body: form_data,
			}
		);
		data = await res.json();
	} catch (error) {
		console.log(`Error Message: ${error.message}`);
	}

	return data;
}

/** verifyOTP */
export async function verifyOTP(form_data) {
	let data;

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API}/route_group/v1/supervisor/token`,
			{
				method: "POST",
				body: form_data,
			}
		);
		data = await res.json();
	} catch (error) {
		console.log(`Error Message: ${error.message}`);
	}

	return data;
}

/** logout */
export const logout = async () => {
	await Cookies.remove("token");
	window.location.reload();
};
