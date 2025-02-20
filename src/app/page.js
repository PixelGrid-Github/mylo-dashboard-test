"use client";
// MODULES //

// COMPONENTS //
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import Tabs from "@/components/Tabs";
import New from "@/components/New";
import Grouped from "@/components/Grouped";
import Assigned from "@/components/Assigned";
import Bottom1 from "@/components/Bottom1";
import Bottom2 from "@/components/Bottom2";
import Bottom3 from "@/components/Bottom3";
import Map from "@/components/Map";

// SECTIONS //

// PLUGINS //
import "jquery-ui/themes/base/all.css";
import "jquery-ui/themes/base/datepicker.css";
import Cookies from "js-cookie";

// UTILS //
import {
	convertTimeFormat,
	convertTo24HourFormat,
	to24HourFormat,
} from "@/utils";

// STYLES //
import styles from "@/styles/pages/Booking.module.scss";

// IMAGES //
import CloseIcon from "/public/img/close.svg";

// DATA //

// SERVICES //
import {
	fetchCounts,
	fetchLocations,
	fetchSecurityList,
	fetchShifts,
	fetchVehicalList,
	fetchVendorsList,
} from "@/services/options.service";
import {
	fetchAssignsRequests,
	fetchGroupRequests,
	fetchNewRequests,
} from "@/services/request.service";
import { useAuthContext } from "@/context/auth.context";

/** Page */
export default function Page() {
	const {
		setLocations,
		setOriginalData,
		setShowRoute,
		setSelectedPositions,
		setAllMapData,
	} = useAuthContext();
	const [activeMapFilter, setActiveMapFilter] = useState("all");
	const [selectData, setSelectData] = useState({
		location: "",
		selectDate: "",
		duty: "1",
		shift: "",
	});
	const [activeIndexCity, setActiveIndexCity] = useState(0);
	const [data, setData] = useState();
	const [selectedRides, setSelectedRides] = useState([]);
	const [selectedGroups, setselectedGroups] = useState([]);
	const [activeSelectPassenger, setSelectPassenger] = useState(null);
	const [abortFetch, setAbortFetch] = useState({
		counts: true,
		new: true,
		group: true,
		securitylist: true,
		vehicals: true,
	});
	const [loading, setLoading] = useState(false);
	const [mapCenter, setMapCenter] = useState({ lat: 19.177427, lng: 72.918876 });
	const [showAutoGrouping, setShowAutoGrouping] = useState(false);
	const [groupStat, setGroupStat] = useState(true);

	/** handleTabClickCity */
	const handleTabClickCity = (index) => {
		setSelectedRides([]);
		setActiveIndexCity(index);
		console.log("ran");
		setShowRoute(false);
		setSelectedPositions((prev) => {
			return prev.map((item3) => {
				delete item3.isSelected;
				return { ...item3 };
			});
		});
	};

	/** fetchData */
	const fetchData = async () => {
		setLoading(true);
		const today = new Date();
		const formattedDate = today.toISOString().split("T")[0];
		const [locations, shifts] = await Promise.all([
			fetchLocations(),
			fetchShifts(),
		]);

		console.log(shifts, "zxc");

		let selectedShifts = shifts?.filter((item) => item.shift == selectData.shift);

		const shiftsDates = [
			...new Set(selectedShifts?.map((item) => convertTimeFormat(item.time))),
		].sort((a, b) => to24HourFormat(a) - to24HourFormat(b));

		setData((prev) => {
			return { ...prev, locations, shiftsFromAPI: shifts, shifts: shiftsDates };
		});
		setSelectData((prev) => {
			return { ...prev, selectDate: formattedDate };
		});
		setLoading(false);
	};

	/**abortFetch */
	function abortFetchFunc() {
		abortFetch?.counts?.abort();
		abortFetch?.new?.abort();
		abortFetch?.group?.abort();
		abortFetch?.securitylist?.abort();
		abortFetch?.vehicals?.abort();
	}

	/** isFilterDataValid */
	function isFilterDataValid() {
		if (
			!selectData.location ||
			!selectData.selectDate ||
			!selectData.duty ||
			!selectData.shift
		) {
			return true;
		}
		return false;
	}

	/** filterData */
	const filterData = async (retryCount = 0) => {
		if (
			!selectData.location ||
			!selectData.selectDate ||
			!selectData.duty ||
			!selectData.shift
		) {
			return;
		}

		setSelectedRides([]);

		// Abort previous fetches
		if (abortFetch?.counts?.abort) {
			abortFetchFunc();
		}

		// Create new abort controllers
		const controller1 = new AbortController();
		const controller2 = new AbortController();
		const controller3 = new AbortController();
		const controller4 = new AbortController();
		const controller5 = new AbortController();

		setAbortFetch({
			counts: controller1,
			new: controller2,
			group: controller3,
			securitylist: controller4,
			vehicals: controller5,
		});

		const formData = new FormData();
		const shiftId = data?.shiftsFromAPI?.filter(
			(item) => item.time === convertTo24HourFormat(selectData?.shift)
		)?.[0]?.id;
		formData.append("date", `${selectData.selectDate}`);
		formData.append("duty", `${selectData.duty}`);
		formData.append("shift_id", `${shiftId}`);

		setLoading(true);
		try {
			const [
				resData,
				newData,
				groupData,
				securityData,
				vehicalsData,
				assignData,
				vendors,
			] = await Promise.all([
				fetchCounts(
					selectData.location.id,
					formData,
					controller1.signal,
					isFilterDataValid()
				),
				fetchNewRequests(
					selectData.location.id,
					formData,
					controller2.signal,
					isFilterDataValid()
				),
				fetchGroupRequests(
					selectData.location.id,
					formData,
					controller3.signal,
					isFilterDataValid()
				),
				fetchSecurityList(controller4.signal),
				fetchVehicalList(controller5.signal),
				fetchAssignsRequests(
					selectData.location.id,
					formData,
					controller3.signal,
					isFilterDataValid()
				),
				fetchVendorsList(),
			]);

			let maleCount = 0;
			let femaleCount = 0;
			const mapdata = [];

			newData?.map((item, ind) => {
				if (item?.gender == 1) {
					maleCount++;
				} else {
					femaleCount++;
				}
				mapdata.push({
					...item,
					lat: item.latitude,
					lng: item.longitude,
					gender: item.gender,
					from: "new",
					index: ind + 1,
					employee_name: item.employee_name,
				});
			});
			groupData?.map((item, ind) => {
				item?.r_list
					?.sort((a, b) => a.sequence - b.sequence)
					.map((item2, index) => {
						if (item2?.gender == 1) {
							maleCount++;
						} else {
							femaleCount++;
						}
						mapdata.push({
							...item2,
							lat: item2.latitude,
							lng: item2.longitude,
							gender: item2.gender,
							groupName: `G${ind + 1}`,
							from: "group",
							index: index + 1,
							employee_name: item2.employee_name,
						});
					});
				return;
			});
			assignData?.map((item, ind) => {
				item?.r_list
					?.sort((a, b) => a.sequence - b.sequence)
					.map((item2, index) => {
						if (item2?.gender == 1) {
							maleCount++;
						} else {
							femaleCount++;
						}
						mapdata.push({
							...item2,
							lat: item2.latitude,
							lng: item2.longitude,
							gender: item2.gender,
							groupName: `G${ind + 1}`,
							from: "assign",
							index: index + 1,
							employee_name: item2.employee_name,
						});
					});
				return;
			});

			console.log(mapdata);

			setAllMapData(mapdata);
			setLocations(mapdata);
			setSelectedPositions(mapdata);
			setShowRoute(false);

			await setData((prev) => {
				return {
					...prev,
					counts: resData,
					news: newData,
					groups: groupData,
					securitylist: securityData,
					vehicalList: vehicalsData,
					assigns: assignData,
					maleCount: maleCount,
					femaleCount: femaleCount,
					vendors,
				};
			});

			await window.localStorage.setItem(
				"originalData",
				JSON.stringify({
					counts: resData,
					news: newData,
					groups: groupData,
					securitylist: securityData,
					vehicalList: vehicalsData,
					assigns: assignData,
					maleCount: maleCount,
					femaleCount: femaleCount,
					vendors,
				})
			);

			setOriginalData({
				counts: resData,
				news: newData,
				groups: groupData,
				securitylist: securityData,
				vehicalList: vehicalsData,
				assigns: assignData,
				maleCount: maleCount,
				femaleCount: femaleCount,
				vendors,
			});
		} catch (error) {
			console.log(`Error Message: ${error.message}`);
			if (retryCount < 3) {
				console.log(`Retrying... (${retryCount + 1})`);
				await filterData(retryCount + 1);
			} else {
				console.log(
					"Max retries reached. Please check your network connection or try again later."
				);
			}
		}

		setActiveMapFilter("all");
		setLoading(false);
	};

	/** logout */
	const logout = async () => {
		Cookies.remove("token");
		window.location.reload();
	};

	useEffect(() => {
		filterData();
	}, [selectData]);

	useEffect(() => {
		const controller1 = new AbortController();
		const controller2 = new AbortController();
		const controller3 = new AbortController();

		setAbortFetch({
			counts: controller1,
			new: controller2,
			group: controller3,
		});
		fetchData();
		window.localStorage.clear();
	}, []);

	return (
		<div>
			{/* Page Content starts here */}
			<main className={`${styles.BookingPage}`}>
				<div className="FullContainer">
					<div className="left">
						{loading && (
							<div className="loaderWrap">
								<div className="loader"></div>
							</div>
						)}
						<div className="leftPadding">
							<div className={`${styles.sticky} ${styles.stickyIndex}`}>
								<div className={styles.SelectOptions}>
									<div className={styles.Option2}>
										<div className={`${styles.logout}`} onClick={logout}>
											<img src="/img/logout.svg" />
										</div>
										<select
											defaultValue=""
											name="SelectDate"
											id="SelectDate"
											required
											onChange={(e) => {
												setSelectData((prev) => {
													return {
														...prev,
														location: data?.locations.find(
															(item) => item.location === e.target.value
														),
													};
												});
											}}
											className={`${!selectData.location && "low_opacity"} ${
												styles.location
											}`}
										>
											<option value="" disabled>
												SELECT LOCATION
											</option>
											{data?.locations?.map((item, ind) => {
												return (
													<option key={item.location} value={item.location}>
														{item.location}
													</option>
												);
											})}
										</select>
									</div>
									<div className={styles.Option2}>
										{/* <select defaultValue="" name="SelectDate" id="SelectDate" required>
										<option value="" disabled>
											SELECT DATE
										</option>
										<option value="Staff 1">Date 1</option>
										<option value="Staff 2">Date 2</option>
									</select> */}
										<input
											type="date"
											name="SelectDate"
											id="SelectDate"
											required
											value={selectData.selectDate}
											onChange={(e) => {
												setSelectData((prev) => {
													return { ...prev, selectDate: e.target.value };
												});
											}}
											min={new Date().toISOString().split("T")[0]}
											className={!selectData.selectDate && "low_opacity"}
										/>
										<select
											defaultValue=""
											name="duty"
											id="duty"
											required
											onChange={async (e) => {
												setSelectData((prev) => {
													return { ...prev, duty: e.target.value, shift: "" };
												});

												let selectedShifts = data.shiftsFromAPI.filter(
													(item) => item.shift == e.target.value
												);
												const shiftsDates = [
													...new Set(
														selectedShifts?.map((item) => convertTimeFormat(item.time))
													),
												].sort((a, b) => to24HourFormat(a) - to24HourFormat(b));

												setData((prev) => {
													return { ...prev, shifts: shiftsDates };
												});
											}}
											className={!selectData.duty && "low_opacity"}
										>
											<option value="" disabled>
												DUTY
											</option>
											<option value="1">PU</option>
											<option value="2">DP</option>
										</select>
										<select
											defaultValue=""
											name="shift"
											id="shift"
											required
											onChange={(e) => {
												setSelectData((prev) => {
													return { ...prev, shift: e.target.value };
												});
											}}
											value={selectData.shift}
											className={`${!selectData.shift && "low_opacity"} shiftInput`}
										>
											<option value="" disabled>
												SHIFT
											</option>
											{data?.shifts?.map((item, ind) => {
												return (
													<option key={item} value={item}>
														{item}
													</option>
												);
											})}
										</select>

										<input
											type="submit"
											value="Auto Grouping"
											className="orangeBtn"
											onClick={() => setShowAutoGrouping(!showAutoGrouping)}
										/>
									</div>
								</div>

								<Tabs
									activeIndexCity={activeIndexCity}
									handleTabClickCity={handleTabClickCity}
									data={data}
								/>
							</div>

							{activeIndexCity === 0 && (
								<New
									data={data}
									selectData={selectData}
									selectedRides={selectedRides}
									setSelectedRides={setSelectedRides}
									setActiveIndexCity={setActiveIndexCity}
									filterData={filterData}
									setMapCenter={setMapCenter}
								/>
							)}
							{activeIndexCity === 1 && (
								<Grouped
									activeSelectPassenger={activeSelectPassenger}
									data={data}
									setActiveIndexCity={setActiveIndexCity}
									setData={setData}
									setselectedGroups={setselectedGroups}
									setSelectPassenger={setSelectPassenger}
									selectData={selectData}
									filterData={filterData}
									setActiveMapFilter={setActiveMapFilter}
									setMapCenter={setMapCenter}
								/>
							)}
							{activeIndexCity === 2 && (
								<Assigned
									activeSelectPassenger={activeSelectPassenger}
									data={data}
									setActiveIndexCity={setActiveIndexCity}
									setData={setData}
									setselectedGroups={setselectedGroups}
									selectData={selectData}
									filterData={filterData}
									setSelectPassenger={setSelectPassenger}
									setActiveMapFilter={setActiveMapFilter}
									setMapCenter={setMapCenter}
								/>
							)}
						</div>
						{activeIndexCity === 0 && (
							<Bottom1
								data={data}
								selectedRides={selectedRides}
								setActiveIndexCity={setActiveIndexCity}
								filterData={filterData}
								activeSelectPassenger={activeSelectPassenger}
							/>
						)}
						{activeIndexCity === 1 && (
							<Bottom2
								data={data}
								setActiveIndexCity={setActiveIndexCity}
								filterData={filterData}
								selectData={selectData}
								activeSelectPassenger={activeSelectPassenger}
							/>
						)}
						{activeIndexCity === 2 && <Bottom3 data={data} />}
					</div>
					<div className="right">
						<Map
							selectData={selectData}
							mapCenter={mapCenter}
							data={data}
							activeMapFilter={activeMapFilter}
							setActiveMapFilter={setActiveMapFilter}
							setSelectPassenger={setSelectPassenger}
							activeSelectPassenger={activeSelectPassenger}
						/>
					</div>
				</div>

				{showAutoGrouping && (
					<div className="popup">
						<div className="popup-content">
							<img
								src={CloseIcon.src}
								alt="close"
								className="close"
								onClick={() => setShowAutoGrouping(!showAutoGrouping)}
							/>
							<h3>Auto Grouping</h3>
							<div className="divider"></div>
							<div className="groupWrap">
								<input
									type="submit"
									value="By Number of Groups"
									className={`orangeBtn ${!groupStat && "disable"}`}
									onClick={() => setGroupStat(true)}
								/>
								<input
									type="submit"
									value="By Number of Cabs"
									className={`orangeBtn ${groupStat && "disable"}`}
									onClick={() => setGroupStat(false)}
								/>
							</div>

							{groupStat && (
								<form className="moveGroupForm">
									<div className="flex">
										<input
											type="text"
											name="vehicleNo"
											id="vehicleNo"
											placeholder="Max Group Count"
											className="vNumber"
											// onChange={(e) => fetchVehicleInfoFromVehicleNumber(e.target.value)}
										/>
									</div>
									<div className="flex">
										<input
											type="text"
											name="vehicleNo"
											id="vehicleNo"
											placeholder="Min Group Count"
											className="vNumber"
											// onChange={(e) => fetchVehicleInfoFromVehicleNumber(e.target.value)}
										/>
									</div>
									<div className="flex">
										<input
											type="text"
											name="vehicleNo"
											id="vehicleNo"
											placeholder="Kilometers"
											className="vNumber"
											// onChange={(e) => fetchVehicleInfoFromVehicleNumber(e.target.value)}
										/>
									</div>

									<button className="addSecurityBtn vehicleSubmitBtn">Add</button>
								</form>
							)}

							{!groupStat && (
								<form className="moveGroupForm">
									<div className="flex">
										<input
											type="text"
											name="vehicleNo"
											id="vehicleNo"
											placeholder="Total 6 Seater groups"
											className="vNumber"
											// onChange={(e) => fetchVehicleInfoFromVehicleNumber(e.target.value)}
										/>
									</div>
									<div className="flex">
										<input
											type="text"
											name="vehicleNo"
											id="vehicleNo"
											placeholder="Total 4 Seater groups"
											className="vNumber"
											// onChange={(e) => fetchVehicleInfoFromVehicleNumber(e.target.value)}
										/>
									</div>
									<div className="flex">
										<input
											type="text"
											name="vehicleNo"
											id="vehicleNo"
											placeholder="Kilometers"
											className="vNumber"
											// onChange={(e) => fetchVehicleInfoFromVehicleNumber(e.target.value)}
										/>
									</div>

									<button className="addSecurityBtn vehicleSubmitBtn">Add</button>
								</form>
							)}
						</div>
					</div>
				)}
			</main>
			{/* Page Content ends here */}
		</div>
	);
}
