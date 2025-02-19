import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import Constants from "@/constants/constants";
import Cookies from "js-cookie";

// Created  Context
const AuthContext = createContext(null);

/** Use Auth Context Hook */
export function useAuthContext() {
	const context = useContext(AuthContext);
	if (context === null) {
		throw new Error("Use auth context must be within auth provider");
	}

	return context;
}

/** Auth Context */
export default function AuthContextProvider({ children }) {
	const pathname = usePathname();
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [count, setCount] = useState(0);
	const [originalData, setOriginalData] = useState();

	//for map
	// Map state and functions
	const [locations, setLocations] = useState([
		// { lat: 19.177427, lng: 72.918876 }, // Origin
		// { lat: 19.177427, lng: 73.5 }, // Waypoint
		// { lat: 20, lng: 74.5 }, // Waypoint
		// { lat: 19.177427, lng: 75 }, // Destination
	]);
	const [selectedPositions, setSelectedPositions] = useState([]);
	const [directions, setDirections] = useState(null);
	const [showRoute, setShowRoute] = useState(false);
	const [allMapData, setAllMapData] = useState(null);

	/** calculateRoute */
	const calculateRoute = async () => {
		if (locations.length < 2) return;

		const origin = locations[0];
		const destination = locations[locations.length - 1];
		const waypoints = locations.slice(1, -1).map((location) => ({
			location: new window.google.maps.LatLng(location.lat, location.lng),
			stopover: true,
		}));

		if (
			window.google &&
			window.google.maps &&
			window.google.maps.DirectionsService
		) {
			const directionsService = new window.google.maps.DirectionsService();
			const result = await directionsService.route({
				origin: new window.google.maps.LatLng(origin.lat, origin.lng),
				destination: new window.google.maps.LatLng(
					destination.lat,
					destination.lng
				),
				waypoints: waypoints,
				travelMode: window.google.maps.TravelMode.DRIVING, // You can change this
			});

			// console.log("Directions result:", result);
			setDirections(result);
		} else {
			console.error("Google Maps JavaScript API is not loaded.");
		}
	};

	useEffect(() => {
		if (showRoute) {
			if (window.google && window.google.maps) {
				calculateRoute();
			} else {
				const interval = setInterval(() => {
					if (window.google && window.google.maps) {
						clearInterval(interval);
						calculateRoute();
					}
				}, 100);
			}
		} else {
			setDirections(null);
		}
	}, [showRoute, locations]);
	// map logic ended

	/** Function to handle redirection and loading state */
	const handleRedirection = () => {
		const token = Cookies.get("token");

		// Handle redirection
		const isAuthPath = Constants.authPaths.includes(pathname); // Pages that require authentication
		const isPublicPath = Constants.publicPaths.includes(pathname); // Public pages that don't need login

		if (isAuthPath && token) {
			router.push("/"); // Redirect to home if already authenticated
			return;
		}

		if (!isPublicPath && !token) {
			router.push("/login"); // Redirect to login if not authenticated
			return;
		}

		// If no redirection is required, set loading to false
		setLoading(false);
	};

	useEffect(() => {
		// Start by setting loading to true
		setLoading(true);

		// Perform redirection logic
		handleRedirection();
	}, [pathname]);

	useEffect(() => {
		// Listen for navigation events to set loading state
		// eslint-disable-next-line require-jsdoc
		const handleRouteComplete = () => setLoading(false);

		router.events?.on("routeChangeComplete", handleRouteComplete);

		// Cleanup the event listener
		return () => {
			router.events?.off("routeChangeComplete", handleRouteComplete);
		};
	}, [router.events]);

	const value = {
		count,
		setCount,
		originalData,
		setOriginalData,
		locations,
		setLocations,
		directions,
		showRoute,
		setShowRoute,
		selectedPositions,
		setSelectedPositions,
		allMapData,
		setAllMapData,
	};

	if (loading) {
		return null; // Show a loading state or skeleton screen here if needed
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
