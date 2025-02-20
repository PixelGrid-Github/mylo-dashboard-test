/* eslint-disable indent */
/* eslint-disable @next/next/no-img-element */
import {
	GoogleMap,
	LoadScript,
	DirectionsRenderer,
	Marker,
	OverlayView,
} from "@react-google-maps/api";
import styles from "@/styles/components/Map.module.scss";
import MapIcon from "../../public/img/map.jpg";
import SearchIcon from "../../public/img/search.svg";
import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "@/context/auth.context";
// import CustomMarker from "@/components/CustomMarker";

const stylesMap = [
	{ elementType: "geometry", stylers: [{ color: "#242f3e" }] },
	{ elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
	{ elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
	{
		featureType: "administrative.locality",
		elementType: "labels.text.fill",
		stylers: [{ color: "#d59563" }],
	},
	{
		featureType: "poi",
		elementType: "labels.text.fill",
		stylers: [{ color: "#d59563" }],
	},
	{
		featureType: "poi.park",
		elementType: "geometry",
		stylers: [{ color: "#263c3f" }],
	},
	{
		featureType: "poi.park",
		elementType: "labels.text.fill",
		stylers: [{ color: "#6b9a76" }],
	},
	{
		featureType: "road",
		elementType: "geometry",
		stylers: [{ color: "#38414e" }],
	},
	{
		featureType: "road",
		elementType: "geometry.stroke",
		stylers: [{ color: "#212a37" }],
	},
	{
		featureType: "road",
		elementType: "labels.text.fill",
		stylers: [{ color: "#9ca5b3" }],
	},
	{
		featureType: "road.highway",
		elementType: "geometry",
		stylers: [{ color: "#746855" }],
	},
	{
		featureType: "road.highway",
		elementType: "geometry.stroke",
		stylers: [{ color: "#1f2835" }],
	},
	{
		featureType: "road.highway",
		elementType: "labels.text.fill",
		stylers: [{ color: "#f3d19c" }],
	},
	{
		featureType: "transit",
		elementType: "geometry",
		stylers: [{ color: "#2f3948" }],
	},
	{
		featureType: "transit.station",
		elementType: "labels.text.fill",
		stylers: [{ color: "#d59563" }],
	},
	{
		featureType: "water",
		elementType: "geometry",
		stylers: [{ color: "#17263c" }],
	},
	{
		featureType: "water",
		elementType: "labels.text.fill",
		stylers: [{ color: "#515c6d" }],
	},
	{
		featureType: "water",
		elementType: "labels.text.stroke",
		stylers: [{ color: "#17263c" }],
	},
];

/** CustomMarker */
const CustomMarker = ({ position, children, isHidden }) => (
	<OverlayView
		position={position}
		mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
	>
		<div
			className={`${styles.marker_wrap} marker_wrap ${
				isHidden ? styles.hidden : ""
			}`}
		>
			<div className={`${styles.inner} inner`}>{children}</div>
		</div>
	</OverlayView>
);

/** Map  */
export default function MapComponent({
	data,
	setSelectPassenger,
	activeSelectPassenger,
	activeMapFilter,
	setActiveMapFilter,
	mapCenter,
	selectData,
}) {
	const {
		selectedPositions,
		originalData,
		locations,
		directions,
		showRoute,
		setShowRoute,
		setLocations,
		setSelectedPositions,
	} = useAuthContext();

	/**  Extract positions for custom markers from the Directions result */
	const renderCustomMarkers = () => {
		if (!directions) return null;

		const legs = directions.routes[0].legs; // Legs of the route
		const customMarkers = [];

		// Origin marker
		customMarkers.push({
			position: legs[0].start_location,
			label: "Start", // Custom label for origin
		});

		// Waypoint markers
		legs.forEach((leg, index) => {
			if (index < legs.length - 1) {
				customMarkers.push({
					position: leg.end_location,
					label: `W${index + 1}`, // Custom label for waypoints
				});
			}
		});

		// Destination marker
		customMarkers.push({
			position: legs[legs.length - 1].end_location,
			label: "End", // Custom label for destination
		});

		// Render all custom markers
		return customMarkers.map((marker, index) => (
			<CustomMarker
				key={`${locations?.[index]?.lat}-${locations?.[index]?.lng}-${
					locations?.[index]?.index
				}-${locations?.[index]?.from}-${Math.random()}`}
				position={marker.position}
			>
				<div className={`${styles.marker} marker route`}>
					<div className={`${styles.hoverData} hoverData`}>
						<p className={`${styles.name}`}>
							{locations?.[index]?.employee_name || locations?.[index]?.name}
						</p>
					</div>
					{locations?.[index]?.gender === 1 &&
						locations?.[index]?.from === "new" && (
							<img
								className={`${styles.markerImg} markerImg`}
								src="/img/map_marker_red.svg"
								alt="map marker"
							/>
						)}
					{locations?.[index]?.gender === 2 &&
						locations?.[index]?.from === "new" && (
							<img
								className={`${styles.markerImg} markerImg`}
								src="/img/map_marker_pink.svg"
								alt="map marker"
							/>
						)}
					{locations?.[index]?.gender === 1 &&
						locations?.[index]?.from === "group" && (
							<img
								className={`${styles.markerImg} markerImg`}
								src="/img/mar_marker_group_men.svg"
								alt="map marker"
							/>
						)}
					{locations?.[index]?.gender === 2 &&
						locations?.[index]?.from === "group" && (
							<img
								className={`${styles.markerImg} markerImg`}
								src="/img/mar_marker_group_girl.svg"
								alt="map marker"
							/>
						)}
					{locations?.[index]?.gender === 1 &&
						locations?.[index]?.from === "assign" && (
							<img
								className={`${styles.markerImg} markerImg`}
								src="/img/mar_marker_assign_men.svg"
								alt="map marker"
							/>
						)}
					{locations?.[index]?.gender === 2 &&
						locations?.[index]?.from === "assign" && (
							<img
								className={`${styles.markerImg} markerImg`}
								src="/img/mar_marker_assign_girl.svg"
								alt="map marker"
							/>
						)}
					{locations?.[index]?.office && (
						<img
							className={`${styles.markerImg} markerImg`}
							src="/img/office_svg.svg"
							alt="map marker"
						/>
					)}
					{!locations?.[index]?.office && (
						<div className={`${styles.text} text`}>
							{activeSelectPassenger != null && (
								<span className="group_id">G{activeSelectPassenger + 1}</span>
							)}
							<p>{index + 1}</p>
						</div>
					)}
				</div>
			</CustomMarker>
		));
	};

	/**handleChangeActive */
	const handleChangeActive = (filText) => {
		setActiveMapFilter(filText);
		setSelectPassenger(null);
		setShowRoute(false);

		if (filText === "all") {
			let mapdata = [];
			originalData?.news?.map((item, ind2) => {
				mapdata.push({
					...item,
					lat: item.latitude,
					lng: item.longitude,
					gender: item.gender,
					from: "new",
					index: ind2 + 1,
				});
			});
			originalData?.groups?.map((item, ind) => {
				item?.r_list
					?.sort((a, b) => a.sequence - b.sequence)
					.map((item2, ind2) => {
						mapdata.push({
							...item2,
							lat: item2.latitude,
							lng: item2.longitude,
							gender: item2.gender,
							groupName: `G${ind + 1}`,
							from: "group",
							index: ind2 + 1,
						});
					});
				return;
			});
			originalData?.assigns?.map((item, ind) => {
				item?.r_list
					?.sort((a, b) => a.sequence - b.sequence)
					.map((item2, ind2) => {
						mapdata.push({
							...item2,
							lat: item2.latitude,
							lng: item2.longitude,
							gender: item2.gender,
							from: "assign",
							groupName: `G${ind + 1}`,
							index: ind2 + 1,
						});
					});
				return;
			});

			setSelectedPositions(mapdata.sort((a, b) => a.sequence - b.sequence));
		} else if (filText === "new") {
			let mapdata = [];
			originalData?.news?.map((item, ind2) => {
				mapdata.push({
					lat: item.latitude,
					lng: item.longitude,
					gender: item.gender,
					from: "new",
					index: ind2 + 1,
				});
			});

			setSelectedPositions(mapdata.sort((a, b) => a.sequence - b.sequence));
		} else if (filText === "group") {
			let mapdata = [];
			originalData?.groups?.map((item, ind) => {
				item?.r_list
					?.sort((a, b) => a.sequence - b.sequence)
					.map((item2, ind2) => {
						mapdata.push({
							...item2,
							lat: item2.latitude,
							lng: item2.longitude,
							gender: item2.gender,
							from: "group",
							groupName: `G${ind + 1}`,
							index: ind2 + 1,
						});
					});
				return;
			});

			setSelectedPositions(mapdata.sort((a, b) => a.sequence - b.sequence));
		} else if (filText === "assign") {
			let mapdata = [];
			originalData?.assigns?.map((item, ind) => {
				item?.r_list
					?.sort((a, b) => a.sequence - b.sequence)
					.map((item2, ind2) => {
						mapdata.push({
							...item2,
							lat: item2.latitude,
							lng: item2.longitude,
							gender: item2.gender,
							from: "assign",
							groupName: `G${ind + 1}`,
							index: ind2 + 1,
						});
					});
				return;
			});

			setSelectedPositions(mapdata.sort((a, b) => a.sequence - b.sequence));
		} else if (filText === "male") {
			let mapdata = [];
			originalData?.news?.map((item, ind2) => {
				if (item?.gender === 1) {
					mapdata.push({
						lat: item.latitude,
						lng: item.longitude,
						gender: item.gender,
						from: "new",
						index: ind2 + 1,
					});
				}
			});
			originalData?.groups?.map((item, ind) => {
				item?.r_list
					?.sort((a, b) => a.sequence - b.sequence)
					.map((item2, ind2) => {
						if (item2?.gender === 1) {
							mapdata.push({
								...item2,
								lat: item2.latitude,
								lng: item2.longitude,
								gender: item2.gender,
								from: "group",
								groupName: `G${ind + 1}`,
								index: ind2 + 1,
							});
						}
					});
				return;
			});
			originalData?.assigns?.map((item, ind) => {
				item?.r_list
					?.sort((a, b) => a.sequence - b.sequence)
					.map((item2, ind2) => {
						if (item2?.gender === 1) {
							mapdata.push({
								...item2,
								lat: item2.latitude,
								lng: item2.longitude,
								gender: item2.gender,
								from: "assign",
								groupName: `G${ind + 1}`,
								index: ind2 + 1,
							});
						}
					});
				return;
			});

			setSelectedPositions(mapdata.sort((a, b) => a.sequence - b.sequence));
		} else if (filText === "female") {
			let mapdata = [];
			originalData?.news?.map((item, ind) => {
				if (item?.gender === 2) {
					mapdata.push({
						lat: item.latitude,
						lng: item.longitude,
						gender: item.gender,
						from: "new",
						index: ind + 1,
					});
				}
			});
			originalData?.groups?.map((item, ind) => {
				item?.r_list
					?.sort((a, b) => a.sequence - b.sequence)
					.map((item2, ind2) => {
						if (item2?.gender === 2) {
							mapdata.push({
								...item2,
								lat: item2.latitude,
								lng: item2.longitude,
								gender: item2.gender,
								from: "group",
								groupName: `G${ind + 1}`,
								index: ind2 + 1,
							});
						}
					});
				return;
			});
			originalData?.assigns?.map((item, ind) => {
				item?.r_list
					?.sort((a, b) => a.sequence - b.sequence)
					.map((item2, ind2) => {
						if (item2?.gender === 2) {
							mapdata.push({
								...item2,
								lat: item2.latitude,
								lng: item2.longitude,
								gender: item2.gender,
								from: "assign",
								groupName: `G${ind + 1}`,
								index: ind2 + 1,
							});
						}
					});
				return;
			});

			setSelectedPositions(mapdata.sort((a, b) => a.sequence - b.sequence));
		}
	};

	console.log(locations, directions);

	return (
		<LoadScript
			googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}
			libraries={["places"]}
		>
			<div className={styles.Map}>
				<div className={styles.TopFilter}>
					<div className={styles.Filters}>
						<div
							className={`${styles.Filter} ${
								activeMapFilter === "all" && styles.active
							}`}
							onClick={() => handleChangeActive("all")}
						>
							<span>All</span>
							<span className={styles.Number}>
								{originalData?.counts?.unassigned +
									originalData?.counts?.assign_count +
									originalData?.counts?.group_count || 0}
							</span>
						</div>
						<div
							className={`${styles.Filter} ${
								activeMapFilter === "new" && styles.active
							}`}
							onClick={() => handleChangeActive("new")}
						>
							<span>NEW</span>
							<span className={styles.Number}>{originalData?.news?.length || 0}</span>
						</div>
						<div
							className={`${styles.Filter} ${
								activeMapFilter === "group" && styles.active
							}`}
							onClick={() => handleChangeActive("group")}
						>
							<span>GROUPED</span>
							<span className={styles.Number}>
								{originalData?.groups?.length || 0}
							</span>
						</div>
						<div
							className={`${styles.Filter} ${
								activeMapFilter === "assign" && styles.active
							}`}
							onClick={() => handleChangeActive("assign")}
						>
							<span>ASSIGNED</span>
							<span className={styles.Number}>
								{originalData?.assigns?.length || 0}
							</span>
						</div>
						<div
							className={`${styles.Filter} ${
								activeMapFilter === "male" && styles.active
							}`}
							onClick={() => handleChangeActive("male")}
						>
							<span>MALE</span>
							<span className={styles.Number}>{originalData?.maleCount || 0}</span>
						</div>
						<div
							className={`${styles.Filter} ${
								activeMapFilter === "female" && styles.active
							}`}
							onClick={() => handleChangeActive("female")}
						>
							<span>FEMALE</span>
							<span className={styles.Number}>{originalData?.femaleCount || 0}</span>
						</div>
					</div>
					{/* <div className={styles.Search}>
						<input type="text" placeholder="Search Mobile Number" />
						<button>
							<img src={SearchIcon.src} alt="search" />
						</button>
					</div> */}
					<div className={styles.Excel}>DOWNLOAD FINAL ROSTER</div>
				</div>
				<GoogleMap
					mapContainerStyle={{ width: "100%", height: "100%" }}
					center={mapCenter} // Initial center
					zoom={10}
					options={{
						mapTypeControl: false, // Hide the "Map" and "Satellite" buttons
						styles: stylesMap,
					}}
				>
					{directions ? (
						<>
							<DirectionsRenderer
								directions={directions}
								options={{
									suppressMarkers: true, // Hide default markers
								}}
							/>
							{/* Render custom markers */}
							{renderCustomMarkers()}
						</>
					) : null}
					{
						// Show Locations
						selectedPositions.map((location, index) => {
							if (location.isSelected) {
								return;
							}
							return (
								<CustomMarker
									key={`${locations.lat}-${locations.lng}-${locations.index}-${
										locations.from
									}-${Math.random()}`}
									position={{ lat: location.lat, lng: location.lng }}
								>
									<div
										className={`${styles.marker} ${
											location?.groupName && location?.groupName
										} marker route`}
									>
										<div className={`${styles.hoverData} hoverData`}>
											<p className={`${styles.name}`}>{location?.employee_name}</p>
										</div>
										{location?.gender === 1 && location?.from === "new" && (
											<img
												className={`${styles.markerImg} markerImg`}
												src="/img/map_marker_red.svg"
												alt="map marker"
											/>
										)}
										{location?.gender === 2 && location?.from === "new" && (
											<img
												className={`${styles.markerImg} markerImg`}
												src="/img/map_marker_pink.svg"
												alt="map marker"
											/>
										)}
										{location?.gender === 1 && location?.from === "group" && (
											<img
												className={`${styles.markerImg} markerImg`}
												src="/img/mar_marker_group_men.svg"
												alt="map marker"
											/>
										)}
										{location?.gender === 2 && location?.from === "group" && (
											<img
												className={`${styles.markerImg} markerImg`}
												src="/img/mar_marker_group_girl.svg"
												alt="map marker"
											/>
										)}
										{location?.gender === 1 && location?.from === "assign" && (
											<img
												className={`${styles.markerImg} markerImg`}
												src="/img/mar_marker_assign_men.svg"
												alt="map marker"
											/>
										)}
										{location?.gender === 2 && location?.from === "assign" && (
											<img
												className={`${styles.markerImg} markerImg`}
												src="/img/mar_marker_assign_girl.svg"
												alt="map marker"
											/>
										)}
										<div className={`${styles.text} text`}>
											{location?.groupName && (
												<span className="group_id">{location?.groupName}</span>
											)}
											<p>{location?.index}</p>
										</div>
									</div>
								</CustomMarker>
							);
						})
					}
					{selectData?.location && !directions && (
						<CustomMarker
							key={`${selectData?.location?.latitude}-${
								selectData?.location?.longitude
							}-${Math.random()}-office-${Math.random()}`}
							position={{
								lat: selectData?.location?.latitude,
								lng: selectData?.location?.longitude,
							}}
						>
							<div
								className={`${styles.marker} ${
									location?.groupName && location?.groupName
								} marker route ${selectData?.location?.latitude}-${
									selectData?.location?.longitude
								}-${Math.random()}-office-${Math.random()}`}
							>
								<div className={`${styles.hoverData} hoverData`}>
									<p className={`${styles.name}`}>{selectData?.location?.location}</p>
								</div>
								<img
									className={`${styles.markerImg} markerImg`}
									src="/img/office_svg.svg"
									alt="map marker"
								/>
								{/* <div className={`${styles.text} text`}>
								{location?.groupName && (
									<span className="group_id">{location?.groupName}</span>
								)}
							</div> */}
							</div>
						</CustomMarker>
					)}
				</GoogleMap>
			</div>
		</LoadScript>
	);
}
