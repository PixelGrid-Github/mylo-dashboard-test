"use client";
// MODULES //
import React, { useEffect, useRef, useState } from "react";

// COMPONENTS //
import Image from "next/image";

// SECTIONS //

// PLUGINS //

// STYLES //
import styles from "@/styles/components/Assigned.module.scss";

// IMAGES //
import MaleIcon from "../../public/img/male.svg";
import FemaleIcon from "../../public/img/female.svg";
import SecurityIcon from "../../public/img/security.svg";
import CloseIcon from "../../public/img/close.svg";
import DeleteIcon from "../../public/img/delete.svg";
import {
	addNewSecurity,
	addRequestToExistingGroup,
	addSecurityToGroup,
	assignGroupToVehicle,
	changeSecurity,
	changeSequenceGroupsPerson,
	changeTimeOfGroupsPerson,
	changeVehicleOfGroup,
	createVehicle,
	getDriverDetailsFromNumber,
	getVehicleDetailsFromVehicleNumber,
	movePassanger,
	removeRequest,
	removeSecurity,
} from "@/services/request.service";
import { compareArrays, hideNumber } from "@/utils";
import { useAuthContext } from "@/context/auth.context";

/** Assigned  */
export default function Assigned({
	data,
	setselectedGroups,
	setData,
	activeSelectPassenger,
	setSelectPassenger,
	selectData,
	filterData,
	setActiveMapFilter,
	setMapCenter,
}) {
	const {
		originalData,
		setOriginalData,
		setShowRoute,
		setLocations,
		locations,
		setSelectedPositions,
		allMapData,
	} = useAuthContext();
	const selectRef = useRef(null);
	const [addPassenger, setAddPassenger] = useState({ value: false, index: 0 });
	const [addSecurity, setAddSecurity] = useState({ value: false, index: 0 });
	const [changeVehicle, setChangeVehicle] = useState({ value: false, index: 0 });
	const [addVehicle, setAddVehicle] = useState({
		value: false,
		index: 0,
		name: "",
	});
	const [tempData, setTempData] = useState();
	const [activeDelete, setActiveDelete] = useState();
	const [activeSecurity, setActiveSecurity] = useState();

	/**handleChangeActive */
	const handleChangeActive = (filText, ind) => {
		// setActiveMapFilter(filText);

		if (filText === "all") {
			let mapdata = [];
			originalData?.news?.map((item) => {
				mapdata.push({
					lat: item.latitude,
					lng: item.longitude,
					gender: item.gender,
					from: "new",
					employee_name: item.employee_name,
				});
			});
			originalData?.assigns?.map((item, index) => {
				item?.r_list?.map((item2, ind2) => {
					mapdata.push({
						lat: item2.latitude,
						lng: item2.longitude,
						gender: item2.gender,
						from: "group",
						groupName: `G${index + 1}`,
						index: ind2 + 1,
						employee_name: item2.employee_name,
					});
				});
				return;
			});
			originalData?.assigns?.map((item, index) => {
				item?.r_list?.map((item2, ind2) => {
					mapdata.push({
						lat: item2.latitude,
						lng: item2.longitude,
						gender: item2.gender,
						from: "assign",
						groupName: `A${index + 1}`,
						index: ind2 + 1,
						employee_name: item2.employee_name,
					});
				});
				return;
			});

			setLocations(mapdata);
		} else if (filText === "assign") {
			let mapdata = [];
			originalData?.assigns[ind]?.r_list?.map((item2, ind2) => {
				mapdata.push({
					lat: item2.latitude,
					lng: item2.longitude,
					gender: item2.gender,
					from: "assign",
					groupName: `G${ind + 1}`,
					index: ind2 + 1,
					employee_name: item2.employee_name,
				});
			});

			// setLocations(mapdata);
			if (selectData?.duty === "2") {
				setLocations([
					...mapdata,
					{
						lat: selectData?.location?.latitude,
						lng: selectData?.location?.longitude,
						office: true,
						name: selectData?.location?.location,
					},
				]);
			} else {
				setLocations([
					{
						lat: selectData?.location?.latitude,
						lng: selectData?.location?.longitude,
						office: true,
						name: selectData?.location?.location,
					},
					...mapdata,
				]);
			}
		}
	};

	/** handleTabClickCity */
	const selectPassenger = (index) => {
		if (index === activeSelectPassenger) {
			console.log("this ran if");
			// if (originalData?.assigns?.[index]?.r_list.length > 1) {
			setSelectedPositions((prev) => {
				return prev.map((item) => {
					delete item.isSelected;
					return { ...item };
				});
			});
			// }
			setSelectPassenger(null);
			setShowRoute(false);
			handleChangeActive("all");

			if (originalData?.assigns?.[index]?.r_list.length > 1) {
				console.log(originalData?.assigns?.[index]?.r_list?.[0].latitude);
				// setMapCenter({ lat: 19.177427, lng: 72.918876 });
			}
		} else {
			setSelectPassenger(index);
			setShowRoute(true);
			handleChangeActive("assign", index);
			console.log("this ran else");

			setSelectedPositions((prev) => {
				return allMapData?.map((item) => {
					if (
						originalData?.assigns?.[index]?.r_list?.some((filItem) => {
							return filItem.pk === item.pk;
						})
					) {
						return { ...item, isSelected: true };
					}

					return { ...item };
				});
			});

			if (originalData?.assigns?.[index]?.r_list.length > 1) {
				console.log("this ran else");
			} else {
				setMapCenter({
					lat: parseFloat(originalData?.assigns?.[index]?.r_list?.[0].latitude),
					lng: parseFloat(originalData?.assigns?.[index]?.r_list?.[0].longitude),
				});
			}
		}
	};

	/**isDataChanged */
	const isDataChanged = (index) => {
		if (
			originalData?.assigns?.[index]?.security_name !==
				tempData?.assigns[index]?.security_name ||
			originalData?.assigns?.[index]?.r_list.length !==
				tempData?.assigns[index]?.r_list.length ||
			compareArrays(
				originalData?.assigns?.[index]?.r_list,
				tempData?.assigns[index]?.r_list
			) ||
			originalData?.assigns?.[index]?.veh_id !== tempData?.assigns[index]?.veh_id
		) {
			return true;
		}
		return false;
	};

	/**unselectData */
	const unselectData = () => {
		setSelectPassenger(null);
	};

	/** refetchData */
	const refetchData = async () => {
		setActiveDelete();
		setActiveSecurity();
		unselectData();
		await filterData();
	};

	/**handleSave */
	const handleSave = async () => {
		unselectData();
		tempData?.assigns?.forEach(async (item, index) => {
			if (isDataChanged(index)) {
				console.log(`Group ${index + 1} has changed:`);
				if (originalData?.assigns?.[index]?.r_list.length !== item?.r_list.length) {
					if (originalData?.assigns?.[index]?.r_list.length > item?.r_list.length) {
						const deletedRequest = originalData?.assigns?.[index]?.r_list.filter(
							(filItem) => {
								return !item?.r_list.some(
									(rItem) => rItem.employee_name === filItem.employee_name
								);
							}
						);

						if (deletedRequest.length > 0) {
							deletedRequest.map(async (delReqItem) => {
								const removedRequestFormData = new FormData();
								removedRequestFormData.append("request_id", delReqItem.pk);
								removedRequestFormData.append("remove_from", "2");
								const resRemovedRequest = await removeRequest(
									item.pk,
									removedRequestFormData
								);
								await refetchData();
								console.log(
									`Number of passengers changed from ${originalData?.assigns?.[index]?.r_list.length} to ${item?.r_list.length}`,
									resRemovedRequest
								);
							});
						}
					} else if (
						originalData?.assigns?.[index]?.r_list.length < item?.r_list.length
					) {
						const newAddedRequest = item?.r_list.filter((filItem) => {
							return originalData?.assigns?.[index]?.r_list.some(
								(rItem) => rItem.employee_name !== filItem.employee_name
							);
						});

						newAddedRequest.map(async (addReqItem) => {
							const removedRequestFormData = new FormData();
							removedRequestFormData.append("request_id", addReqItem.pk);
							removedRequestFormData.append("add_from", "2");
							const resRemovedRequest = await addRequestToExistingGroup(
								item.pk,
								removedRequestFormData
							);
							await refetchData();
							console.log(
								`Number of passengers changed from ${originalData?.assigns?.[index]?.r_list.length} to ${item?.r_list.length}`,
								resRemovedRequest
							);
						});
					}
				}
				if (originalData?.assigns?.[index]?.security_name !== item?.security_name) {
					if (originalData?.assigns?.[index]?.security_name === "") {
						const addedSecurityFormData = new FormData();
						addedSecurityFormData.append("date", selectData.selectDate);
						addedSecurityFormData.append("security_id", item.security_pk);
						const resAddedSecurity = await addSecurityToGroup(
							item.pk,
							addedSecurityFormData
						);
						await refetchData();
						console.log(
							`Security name added: ${item?.security_name}`,
							resAddedSecurity
						);
					} else if (item?.security_name === "") {
						const removedSecurityFormData = new FormData();
						removedSecurityFormData.append(
							"security_obj_pk",
							originalData?.assigns?.[index]?.security_obj_pk
						);
						const resRemovedSecurity = await removeSecurity(
							item.pk,
							removedSecurityFormData
						);
						await refetchData();
						console.log(
							`Security name removed: ${originalData?.assigns?.[index]?.security_name}`,
							resRemovedSecurity
						);
					} else {
						const changedSecurityFormData = new FormData();
						changedSecurityFormData.append("date", selectData.selectDate);
						changedSecurityFormData.append("security_id", item.security_pk);
						const resChangedSecurity = await changeSecurity(
							item.pk,
							changedSecurityFormData
						);
						await refetchData();
						console.log(
							`Security name changed from ${originalData?.assigns?.[index]?.security_name} to ${item?.security_name}`,
							resChangedSecurity
						);
					}
				}

				if (originalData?.assigns?.[index]?.veh_id !== item?.veh_id) {
					const requestIds = item?.r_list?.map((ride) => ride.pk).join(",");
					const changeVehicleFormData = new FormData();
					console.log(
						{
							date: selectData.selectDate,
							vehicle_id: item.veh_id,
							request_ids: requestIds,
							assign_vehicles_pk: item.assign_vehicles_pk,
						},
						item
					);
					changeVehicleFormData.append("date", selectData.selectDate);
					changeVehicleFormData.append("vehicle_id", item.veh_id);
					changeVehicleFormData.append("request_ids", requestIds);
					changeVehicleFormData.append(
						"assign_vehicles_pk",
						item.assign_vehicles_pk
					);
					const resChangedVehicle = await changeVehicleOfGroup(
						item.pk,
						changeVehicleFormData
					);
					await refetchData();
					console.log(
						`Vehicle is changed!: ${item?.security_name}`,
						resChangedVehicle
					);
				}

				item.r_list.forEach(async (rItem, rIndex) => {
					if (
						originalData?.assigns?.[index]?.r_list[rIndex]?.Start_Time !==
						rItem?.Start_Time
					) {
						console.log(
							`Start time for passenger ${rItem.employee_name} changed from ${originalData?.assigns?.[index]?.r_list[rIndex]?.Start_Time} to ${rItem?.Start_Time}`
						);
						const formDataForTimeChange = new FormData();
						formDataForTimeChange.append("request_ids", rItem.pk);
						formDataForTimeChange.append("start_time_list", rItem.Start_Time);

						const resultChangedTime = await changeTimeOfGroupsPerson(
							item.pk,
							formDataForTimeChange
						);
						await refetchData();
					}
					if (
						originalData?.assigns?.[index]?.r_list[rIndex]?.sequence !==
						rItem?.sequence
					) {
						console.log(
							`Sequence for passenger ${rItem.employee_name} changed from ${originalData?.assigns?.[index]?.r_list[rIndex]?.sequence} to ${rItem?.sequence}`
						);
						const formDataForSequenceChange = new FormData();
						formDataForSequenceChange.append("request_ids", rItem.pk);
						formDataForSequenceChange.append("sequence_list", rItem.sequence);

						const resultChangedSequence = await changeSequenceGroupsPerson(
							formDataForSequenceChange
						);
						await refetchData();
					}
				});
			}
		});

		// window.location.reload();
		await refetchData();
	};

	/** onSubmitMovePassanger */
	const onSubmitMovePassanger = async (e) => {
		e.preventDefault();
		const activeIds = activeDelete.split("");
		const selectedVal = e.target.toMove.value;
		const fromGroup = originalData?.assigns?.[activeIds[0]];
		const fromGroupPassanger =
			originalData?.assigns?.[activeIds[0]]?.r_list?.[activeIds[1]];

		const formdata = new FormData();
		formdata.append("request_id", fromGroupPassanger.pk);
		formdata.append("group_id", fromGroup.pk);
		formdata.append("new_group_id", selectedVal);

		try {
			const res = await movePassanger(formdata);
			await refetchData();
			setActiveDelete();
			console.log(res);
		} catch (error) {
			console.log("error", error);
		}
	};

	/** onSubmitMovePassanger */
	const onSubmitAddSecurity = async (e) => {
		e.preventDefault();
		const valName = e.target.name.value;
		const valMobile = e.target.mobile.value;
		const submitBtn = document.querySelector(".addSecurityBtn");

		console.log(valName, valMobile, selectData.selectDate);

		const formdata = new FormData();
		formdata.append("date", selectData.selectDate);
		formdata.append("security_name", valName);
		formdata.append("security_mobile", valMobile);

		try {
			submitBtn.innerHTML = "Loading";
			submitBtn.style.pointerEvents = "none";
			const res = await addNewSecurity(
				tempData?.assigns?.[addSecurity.index]?.pk,
				formdata
			);

			if (res.status != 200) {
				setAddSecurity({ value: false, index: addSecurity.index });
				throw new Error();
			}

			await refetchData();
			setAddSecurity({ value: false, index: addSecurity.index });
			console.log(res);
		} catch (error) {
			submitBtn.innerHTML = "Add";
			submitBtn.style.pointerEvents = "all";
			console.log("Error", error);
			setAddSecurity({ value: false, index: addSecurity.index });
		}
	};

	/** changeDisableOfInputs */
	const changeDisableOfInputs = (disable, htmls) => {
		if (disable) {
			htmls.map((item) => (item.disabled = true));
		} else {
			htmls.map((item) => (item.disabled = false));
		}
	};

	/** submit */
	const submit = async (e) => {
		e.preventDefault();
		const vehicleId = e.target.vehicle.value;

		if (!vehicleId || activeSelectPassenger === null) {
			return;
		}

		let requestIds = data?.assigns?.[activeSelectPassenger]?.r_list
			?.map((ride) => ride.pk)
			.join(",");
		console.log(vehicleId, requestIds);

		const formData = new FormData();
		formData.append("date", selectData.selectDate);
		formData.append("vehicle_id", vehicleId);
		formData.append("request_ids", requestIds);

		try {
			const resResult = await assignGroupToVehicle(
				formData,
				data?.assigns?.[activeSelectPassenger].pk
			);
			console.log("zxczxc");
			setAddVehicle({
				value: false,
				index: 0,
				name: "",
			});
			await refetchData();

			// setActiveIndexCity(2);
		} catch (error) {
			setAddVehicle({
				value: false,
				index: 0,
				name: "",
			});
			console.log(`Error Message: ${error.message}`);
		}
	};

	/** fetchVehicleInfoFromVehicleNumber */
	const fetchVehicleInfoFromVehicleNumber = async (val) => {
		const vendor = document.querySelector(".vendor");
		const sCount = document.querySelector(".seatCount");
		const dId = document.querySelector(".deviceId");
		const cab = document.querySelector(".cab");
		const ac = document.querySelector(".ac");

		if (val.length < 10) {
			sCount.value = "";
			dId.value = "";
			cab.value = "1";
			ac.value = "AC";
			changeDisableOfInputs(false, [sCount, dId, cab, ac]);
			return;
		}

		const controller1 = new AbortController();
		// controller1?.abort();

		const formdata = new FormData();
		formdata.append("vendor_id", vendor.value);
		formdata.append("vehicle_no", val);

		try {
			const res = await getVehicleDetailsFromVehicleNumber(
				controller1.signal,
				formdata
			);

			let hasDataArr = [];

			if (res.data.seat_count) {
				sCount.value = res.data.seat_count;
				hasDataArr.push(sCount);
			}
			if (res.data.device_id) {
				dId.value = res.data.device_id;
				hasDataArr.push(dId);
			}
			if (res.data.vehicle_type) {
				cab.value = res.data.vehicle_type;
				hasDataArr.push(cab);
			}
			if (res.data.Type_of_vehicle) {
				ac.value = res.data.Type_of_vehicle;
				hasDataArr.push(ac);
			}

			changeDisableOfInputs(true, hasDataArr);

			return res;
		} catch (error) {
			changeDisableOfInputs(false, [sCount, dId, cab, ac]);
		}
	};

	/** fetchDriverDetailsFromNumber */
	const fetchDriverDetailsFromNumber = async (val) => {
		const vendor = document.querySelector(".vendor");
		const name = document.querySelector(".dName");
		const dLicence = document.querySelector(".dLicence");
		const address = document.querySelector(".address");

		if (val.length < 10) {
			name.value = "";
			dLicence.value = "";
			address.value = "";
			changeDisableOfInputs(false, [name, dLicence, address]);
			return;
		}

		const controller2 = new AbortController();
		// controller1?.abort();

		const formdata = new FormData();
		formdata.append("vendor_id", vendor.value);
		formdata.append("mobile_no", val);

		try {
			const res = await getDriverDetailsFromNumber(controller2.signal, formdata);

			console.log(res);

			let hasDataArr = [];

			if (res.data.full_name) {
				name.value = res.data.full_name;
				hasDataArr.push(name);
			}
			if (res.data.driver_liecense_number) {
				dLicence.value = res.data.driver_liecense_number;
				hasDataArr.push(dLicence);
			}
			if (res.data.driver_address) {
				address.value = res.data.driver_address;
				hasDataArr.push(address);
			}

			changeDisableOfInputs(true, hasDataArr);
			return res;
		} catch (error) {
			changeDisableOfInputs(false, [name, dLicence, address]);
		}
	};

	/** submit */
	const submitVehicle = async (e) => {
		e.preventDefault();
		const vendor = document.querySelector(".vendor").value;
		const sCount = document.querySelector(".seatCount").value;
		const vNumber = document.querySelector(".vNumber").value;
		const dId = document.querySelector(".deviceId").value;
		const cab = document.querySelector(".cab").value;
		const ac = document.querySelector(".ac").value;
		const name = document.querySelector(".dName").value;
		const dNo = document.querySelector(".dNo").value;
		const dLicence = document.querySelector(".dLicence").value;
		const address = document.querySelector(".address").value;
		const submitBtn = document.querySelector(".vehicleSubmitBtn");

		try {
			submitBtn.innerHTML = "Loading";
			submitBtn.disabled = true;

			const [dataFromVehicleNo, dataFromDriverNo] = await Promise.all([
				fetchVehicleInfoFromVehicleNumber(vNumber),
				fetchDriverDetailsFromNumber(dNo),
			]);

			let resultObj = {};

			resultObj = { ...dataFromVehicleNo?.data, ...dataFromDriverNo?.data };

			console.log(resultObj);

			const formdata = new FormData();
			formdata.append("vehicle_status", resultObj?.vehicle_status || 2);
			formdata.append("driver_status", resultObj?.driver_status || 2);
			formdata.append("vehicle_id", resultObj?.vehicle_id || 0);
			formdata.append("driver_id", resultObj?.driver_id || 0);
			formdata.append("vehicle_no", vNumber);
			formdata.append("vehicle_type", cab);
			formdata.append("device_id", dId);
			formdata.append("ac_nonac", ac);
			formdata.append("seat_no", sCount);
			formdata.append("mobile_no", dNo);
			formdata.append("driver_name", name);
			formdata.append("driver_address", address);
			formdata.append("driver_liecense_number", dLicence);
			formdata.append("vendor_id", vendor);

			const res = await createVehicle(formdata);
			if (res.status != 200) {
				throw Error(res.data);
			}

			await refetchData();
			submitBtn.innerHTML = "Add";
			submitBtn.disabled = false;
			console.log(res);
		} catch (error) {
			submitBtn.innerHTML = "Add";
			submitBtn.disabled = false;
			console.log(error);
		}
	};

	useEffect(() => {
		setTempData(JSON.parse(window.localStorage.getItem("originalData")));
		setOriginalData(JSON.parse(window.localStorage.getItem("originalData")));
	}, []);

	useEffect(() => {
		setTempData(JSON.parse(window.localStorage.getItem("originalData")));
		selectPassenger(null);
	}, [originalData]);

	return (
		<div className="">
			<div className={styles.AllRequests}>
				{tempData?.assigns?.map((item, index) => {
					return (
						<div
							key={Math.random() + index}
							className={`${styles.Trip} ${
								activeSelectPassenger === index ? styles.active : ""
							}`}
							// onClick={() => selectPassenger(index)}
						>
							<div className={styles.Info}>
								<div className={styles.FlexPassenger}>
									<div className={styles.FlexPassengerInside}>
										<div className="flex gap_9">
											<div
												className={styles.Box}
												// onClick={() => selectPassenger(index)}
												onClick={() => {
													if (isDataChanged(index)) {
														alert("Please Save Changes!");
														return;
													}
													selectPassenger(index);
													setselectedGroups((prev) => {
														let arr = [...prev];

														if (arr.length === 4) {
															return arr;
														}

														if (!arr.some((filItem) => filItem.pk === item.pk)) {
															arr = [...prev, { ...item, cx_number: index + 1 }];
															return arr;
														}

														return arr.filter((filItem) => filItem.pk !== item.pk);
													});
												}}
											></div>
											<div className={styles.Name}>
												{item.group_name}
												{"      "}
												<span className={styles.vNo}>{item.vehicle_no}</span>{" "}
												<span className={styles.vName}>({item.driver_name})</span>
											</div>
										</div>
										<div className={styles.PassengerList}>
											{item.r_list?.map((item2, ind2) => {
												const randomNum = Math.random();
												return (
													<>
														<div
															className={styles.PassengerData}
															key={randomNum + ind2 + index}
														>
															<div className={styles.PassengerDataInner}>
																<div
																	className={styles.Delete}
																	onClick={(e) => {
																		setActiveDelete(`${index}${ind2}`);
																		unselectData();
																		// setTempData((prev) => {
																		// 	let arr = { ...prev };
																		// 	arr.assigns[index].r_list = arr.assigns[index].r_list.filter(
																		// 		(filterItem) =>
																		// 			filterItem.employee_name !== item2.employee_name
																		// 	);
																		// 	return arr;
																		// });
																	}}
																>
																	<img src={DeleteIcon.src} alt="delete" />
																</div>
																<div className={styles.Gender}>
																	<img
																		src={item2?.gender === 1 ? MaleIcon.src : FemaleIcon.src}
																		alt="male"
																	/>
																</div>
															</div>

															<div className="flex align-center gap_8 flex_1">
																<div className="flex_1">
																	<div className={styles.Name}>
																		{item2.employee_name}
																		<p className={styles.PhoneNumber}>{`( ${hideNumber(
																			item2?.employee_mobile_no
																		)} )`}</p>
																	</div>
																	{/* <span className={styles.FullAddress}>{item2.address}</span> */}
																</div>
																<div className={styles.Locality}>
																	<span className={styles.Residence}>LOCALITY:</span>
																	<span className={styles.FullAddress}>{item2.locality} </span>
																</div>
																<div className={styles.EnterTime}>
																	{selectData?.duty === "1" ? (
																		<input
																			type="time"
																			name={`EnterTime${index}${randomNum}`}
																			id={`EnterTime${index}${randomNum}`}
																			placeholder="Enter Time"
																			defaultValue={item2.Start_Time}
																			onChange={(e) => {
																				unselectData();
																				const val = `${e.target.value}:00`;
																				setTempData((prev) => {
																					let arr = { ...prev };
																					arr.assigns[index].r_list[ind2].Start_Time = val;
																					return arr;
																				});
																			}}
																		/>
																	) : (
																		<input
																			type="number"
																			name={`Sequence${index}${randomNum}`}
																			id={`Sequence${index}${randomNum}`}
																			placeholder="Enter Sequence"
																			defaultValue={item2.sequence}
																			onChange={(e) => {
																				unselectData();
																				const val = `${e.target.value}`;
																				setTempData((prev) => {
																					let arr = { ...prev };
																					arr.assigns[index].r_list[ind2].sequence = val;
																					return arr;
																				});
																			}}
																		/>
																	)}
																</div>
															</div>
														</div>
														{activeDelete === `${index}${ind2}` && (
															<div className="popup">
																<div className="popup-content">
																	<img
																		src={CloseIcon.src}
																		alt="close"
																		className="close"
																		onClick={() => setActiveDelete()}
																	/>
																	<h3>Select Action</h3>

																	<div className="divider"></div>

																	<p>
																		Are you sure you want to remove {item2.employee_name} from G
																		{index + 1}
																	</p>

																	<div
																		className="yesBtn"
																		onClick={() => {
																			setActiveDelete();
																			unselectData();
																			setTempData((prev) => {
																				let arr = { ...prev };
																				arr.assigns[index].r_list = arr.assigns[
																					index
																				].r_list.filter(
																					(filterItem) =>
																						filterItem.employee_name !== item2.employee_name
																				);
																				return arr;
																			});
																			setTimeout(() => {
																				handleSave();
																			}, 0);
																		}}
																	>
																		Yes, Remove from group
																	</div>
																	<div className="or">OR</div>
																	<form
																		className="moveGroupForm"
																		onSubmit={(e) => onSubmitMovePassanger(e)}
																	>
																		<select name="toMove" id="toMove">
																			{tempData?.assigns?.map((toMoveItem, toMoveInd) => {
																				if (item.group_name === toMoveItem.group_name) {
																					return;
																				}
																				return (
																					<option key={toMoveItem.group_name} value={toMoveItem.pk}>
																						{toMoveItem.group_name}
																					</option>
																				);
																			})}
																		</select>
																		<button>Move</button>
																	</form>
																	{/* <div className="flex">
																		<button>Yes</button>
																		<button onClick={() => setActiveDelete()}>No</button>
																	</div> */}
																</div>
															</div>
														)}
													</>
												);
											})}

											{item?.security_name && (
												<>
													<div className={styles.PassengerData}>
														<div className="flex align-center">
															<div
																className={styles.Delete}
																onClick={(e) => {
																	unselectData();
																	setAddSecurity({ value: true, index: index });
																}}
															>
																<img src={DeleteIcon.src} alt="delete" />
															</div>
															<div className={styles.Gender}>
																<img src={SecurityIcon.src} alt="security" />
															</div>
															<div className="flex align-center gap_8">
																<div>
																	<div className={styles.Name}>
																		{item.security_name}
																		<span className={styles.PhoneNumber}>{`( ${hideNumber(
																			item?.security_mobile_no
																		)} )`}</span>
																	</div>
																	<span className={styles.FullAddress}>SECURITY</span>
																</div>
																<div className={styles.Locality}>
																	<span className={styles.Residence}></span>
																	<span className={styles.FullAddress}></span>
																</div>
															</div>
														</div>
														{selectData?.duty === "1" && (
															<div className={styles.EnterTime}>
																<input
																	type="time"
																	name={`EnterTime${index}Security`}
																	id={`EnterTime${index}Security`}
																	placeholder="Enter Time"
																/>
															</div>
														)}
													</div>
													{activeSecurity === index && (
														<div className="popup">
															<div className="popup-content">
																<img
																	src={CloseIcon.src}
																	alt="close"
																	className="close"
																	onClick={() => setActiveSecurity()}
																/>
																<h3>Remove Security?</h3>
																<div className="flex">
																	<button
																		onClick={() => {
																			unselectData();
																			setTempData((prev) => {
																				let arr = { ...prev };
																				arr.assigns[index].security_pk = "";
																				arr.assigns[index].security_name = "";
																				arr.assigns[index].security_mobile_no = "";
																				arr.assigns[index].security_obj_pk = "";
																				return arr;
																			});
																		}}
																	>
																		Yes
																	</button>
																	<button onClick={() => setActiveSecurity()}>No</button>
																</div>
															</div>
														</div>
													)}
												</>
											)}

											<div className={styles.Buttonss}>
												<div
													className={styles.AddPassenger}
													onClick={() => {
														unselectData();
														setAddPassenger({ value: true, index: index });
													}}
												>
													+ADD PASSENGER
												</div>
												<div
													className={styles.AddSecurity}
													onClick={() => {
														unselectData();
														setAddSecurity({ value: true, index: index });
													}}
												>
													+ADD SECURITY
												</div>
												<div
													className={styles.ChangeVehicle}
													onClick={() => {
														// unselectData();
														// setChangeVehicle({ value: true, index: index });
														// console.log(activeSelectPassenger);
														// if (activeSelectPassenger === null) {
														// 	return;
														// }
														console.log("click");
														setAddVehicle((prev) => {
															return { ...prev, value: true, index: index };
														});
													}}
												>
													&gt;CHANGE VEHICLE
												</div>
												{isDataChanged(index) && (
													<div className={styles.Save} onClick={handleSave}>
														Save
													</div>
												)}
											</div>
										</div>
									</div>
									<div className={styles.GroupNumber}>{`G${index + 1}`}</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>

			{addPassenger.value && (
				<div className="popup">
					<div className="popup-content">
						<img
							src={CloseIcon.src}
							alt="close"
							className="close"
							onClick={() =>
								setAddPassenger({ value: false, index: addPassenger.index })
							}
						/>
						<h3>Add Passenger TO G{addPassenger.index + 1}</h3>
						<div className="divider"></div>
						<form
							className="moveGroupForm"
							onSubmit={(e) => {
								e.preventDefault();
								const val = e.target.passager.value;
								setTempData((prev) => {
									let arr = { ...prev };
									arr.assigns[addPassenger.index].r_list = [
										...arr.assigns[addPassenger.index].r_list,
										tempData?.news[Number(val)],
									];
									return arr;
								});
								setAddPassenger({ value: false, index: addPassenger.index });
							}}
						>
							<select
								name="passager"
								ref={selectRef}
								onChange={(e) => {
									const val = e.target.value;
									setTempData((prev) => {
										let arr = { ...prev };
										arr.assigns[addPassenger.index].r_list = [
											...arr.assigns[addPassenger.index].r_list,
											tempData?.news[Number(val)],
										];
										return arr;
									});
									setAddPassenger({ value: false, index: addPassenger.index });
								}}
							>
								<option value="Select Employee">Select Employee</option>
								{tempData?.news?.map((item, index) => {
									return (
										<option value={index} key={index}>
											{item.employee_name}
										</option>
									);
								})}
							</select>
						</form>
					</div>
				</div>
			)}
			{addSecurity.value && (
				<div className="popup">
					<div className="popup-content">
						<img
							src={CloseIcon.src}
							alt="close"
							className="close"
							onClick={() =>
								setAddSecurity({ value: false, index: addSecurity.index })
							}
						/>
						<h3>Add Security</h3>
						<div className="divider"></div>
						<form
							className="moveGroupForm"
							onSubmit={(e) => {
								e.preventDefault();
								const val = e.target.security.value;
								setTempData((prev) => {
									let arr = { ...prev };
									arr.assigns[addSecurity.index].security_pk =
										tempData?.securitylist[Number(val)].pk;
									arr.assigns[addSecurity.index].security_name =
										tempData?.securitylist[Number(val)].name;
									arr.assigns[addSecurity.index].security_mobile_no =
										tempData?.securitylist[Number(val)].mobile_no;
									arr.assigns[addSecurity.index].security_obj_pk =
										tempData?.securitylist[Number(val)].pk;
									return arr;
								});
								setAddSecurity({ value: false, index: addSecurity.index });
							}}
						>
							<select name="security" ref={selectRef}>
								<option value="Select Employee">Select Security</option>

								{tempData?.securitylist?.map((item, index) => {
									return (
										<option value={index} key={index}>
											{item.name}
										</option>
									);
								})}
								{/* <option value="Rita Singh - 91*****879 (Santacruz (E))">
								Rita Singh - 91*****879 (Santacruz (E))
							</option>
							<option value="Pawan Singh - 91*****879 (Thane (E))">
								Pawan Singh - 91*****879 (Thane (E))
							</option> */}
							</select>
							<button>Add</button>
						</form>
						<div className="or">OR</div>
						<form
							className="moveGroupForm"
							onSubmit={(e) => {
								e.preventDefault();
								onSubmitAddSecurity(e);
							}}
						>
							<input name="name" type="text" placeholder="Security Name" required />
							<input
								name="mobile"
								placeholder="Security Mobile No."
								required
								type="text"
								maxLength="10"
								pattern="\d{10}"
							/>

							<button className="addSecurityBtn">Add</button>
						</form>
					</div>
				</div>
			)}
			{changeVehicle.value && (
				<div className="popup">
					<div className="popup-content">
						<img
							src={CloseIcon.src}
							alt="close"
							className="close"
							onClick={() =>
								setChangeVehicle({ value: false, index: changeVehicle.index })
							}
						/>
						<h3>Change Vehicle</h3>
						<select
							ref={selectRef}
							onChange={(e) => {
								setTempData((prev) => {
									let arr = { ...prev };
									arr.assigns[changeVehicle.index].driver_name =
										tempData?.vehicalList[Number(e.target.value)].driver_name;
									arr.assigns[changeVehicle.index].veh_id =
										tempData?.vehicalList[Number(e.target.value)].id;

									return arr;
								});
							}}
						>
							<option value="Select Employee">Select Vehicle</option>

							{tempData?.vehicalList?.map((item, index) => {
								return (
									<option value={index} key={index}>
										{item.driver_name}
									</option>
								);
							})}
						</select>
					</div>
				</div>
			)}
			{addVehicle.value && (
				<div className="popup">
					<div className="popup-content">
						<img
							src={CloseIcon.src}
							alt="close"
							className="close"
							onClick={() => setAddVehicle({ value: false, index: addVehicle.index })}
						/>
						<h3>Change Vehicle</h3>
						<div className="divider"></div>
						<form className="moveGroupForm" onSubmit={(e) => submitVehicle(e)}>
							<select name="aron" className="vendor">
								{originalData?.vendors?.map((item) => {
									return (
										<option key={item.pk} value={item.pk}>
											{item.name}
										</option>
									);
								})}
							</select>
							<div className="flex">
								<input
									type="text"
									name="vehicleNo"
									id="vehicleNo"
									placeholder="Vehicle Number"
									className="vNumber half_input"
									onChange={(e) => fetchVehicleInfoFromVehicleNumber(e.target.value)}
								/>
								<input
									className="seatCount half_input"
									type="text"
									name="seatCount"
									id="seatCount"
									placeholder="Seat Count"
								/>
							</div>
							<div className="flex">
								<input
									className="deviceId"
									type="text"
									name="deviceId"
									id="deviceId"
									placeholder="Device Id"
								/>
								<select name="cab" className="cab">
									<option value="2">Cab</option>
									<option value="1">Bus</option>
								</select>
								<select name="ac" className="ac">
									<option value="AC">Ac</option>
									<option value="NONAC">Non AC</option>
								</select>
							</div>

							<div className="divider"></div>

							<input
								type="text"
								name="driverNo"
								id="driverNo"
								className="dNo"
								placeholder="Device Number"
								onChange={(e) => fetchDriverDetailsFromNumber(e.target.value)}
							/>
							<div className="flex">
								<input
									type="text"
									name="driverName"
									id="driverName"
									placeholder="Driver Name"
									className="dName half_input"
								/>
								<input
									type="text"
									name="driverLicence"
									id="driverLicence"
									placeholder="Device Licence"
									className="dLicence half_input"
								/>
							</div>
							<textarea
								type="text"
								name="address"
								id="address"
								placeholder="Driver Address"
								className="address"
							/>

							<button className="addSecurityBtn vehicleSubmitBtn">Add</button>
						</form>

						<div className="or">OR</div>

						<form className="moveGroupForm" onSubmit={(e) => submit(e)}>
							<h4>Select Vehicle from the list</h4>
							<select name="vehicle">
								<option value="Select Vehicle">Select Vehicle</option>

								{tempData?.vehicalList?.map((item, index) => {
									return (
										<option value={item.id} key={index.id}>
											{`${item.vehicle_no} (${item.seat_count}S) (${item.driver_name})`}
										</option>
									);
								})}
								{/* <option value="Rita Singh - 91*****879 (Santacruz (E))">
								Rita Singh - 91*****879 (Santacruz (E))
							</option>
							<option value="Pawan Singh - 91*****879 (Thane (E))">
								Pawan Singh - 91*****879 (Thane (E))
							</option> */}
							</select>
							<button>Add</button>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}
