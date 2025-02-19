/** Request Headers for Server side fetching */
export const ServerHeaders = {
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
	},
};

/** Request Headers for Client side fetching */
export const ClientHeaders = {
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
	},
};
