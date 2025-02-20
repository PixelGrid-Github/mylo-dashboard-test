"use client";
// MODULES //
import React, { useEffect, useState, useRef } from "react";
import $ from "jquery";
// import "select2/dist/js/select2.min.js";

// COMPONENTS //
import Image from "next/image";
import { useAuthContext } from "@/context/auth.context";

// SECTIONS //

// PLUGINS //
import { compareArrays, hideNumber } from "@/utils";

// STYLES //
import styles from "@/styles/components/Grouped.module.scss";
// import "select2/dist/css/select2.min.css";

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
	changeSecurity,
	changeSequenceGroupsPerson,
	changeTimeOfGroupsPerson,
	movePassanger,
	removeRequest,
	removeSecurity,
} from "@/services/request.service";

/** Grouped  */
export default function Grouped({
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
		selectedPositions,
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
	const [tempData, setTempData] = useState();
	const [activeDelete, setActiveDelete] = useState();
	const [activeSecurity, setActiveSecurity] = useState();

	/**handleChangeActive */
	const handleChangeActive = (filText, ind) => {
		// setActiveMapFilter(filText);

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
					employee_name: item.employee_name,
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
							employee_name: item2.employee_name,
						});
					});
				return;
			});
			originalData?.assigns?.map((item, ind) => {
				item?.r_list
					.sort((a, b) => a.sequence - b.sequence)
					?.map((item2, ind2) => {
						mapdata.push({
							...item2,
							lat: item2.latitude,
							lng: item2.longitude,
							gender: item2.gender,
							from: "assign",
							groupName: `G${ind + 1}`,
							index: ind2 + 1,
							employee_name: item2.employee_name,
						});
					});
				return;
			});

			setLocations(mapdata);
		} else if (filText === "group") {
			let mapdata = [];

			originalData?.groups?.[ind]?.r_list
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
						employee_name: item2.employee_name,
					});
				});

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
			// if (originalData?.groups?.[index]?.r_list.length > 1) {
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
		} else {
			setSelectPassenger(index);
			setShowRoute(true);
			handleChangeActive("group", index);

			setSelectedPositions((prev) => {
				return allMapData?.map((item) => {
					if (
						originalData?.groups?.[index]?.r_list?.some((filItem) => {
							return filItem.pk === item.pk;
						})
					) {
						return { ...item, isSelected: true };
					}
					return { ...item };
				});
			});

			if (originalData?.groups?.[index]?.r_list.length > 1) {
				console.log("ran");
			} else {
				setMapCenter({
					lat: parseFloat(originalData?.groups?.[index]?.r_list?.[0].latitude),
					lng: parseFloat(originalData?.groups?.[index]?.r_list?.[0].longitude),
				});
			}
		}
	};

	/**isDataChanged */
	const isDataChanged = (index) => {
		if (
			originalData?.groups?.[index]?.security_name !==
				tempData?.groups[index]?.security_name ||
			originalData?.groups?.[index]?.r_list.length !==
				tempData?.groups[index]?.r_list.length ||
			compareArrays(
				originalData?.groups?.[index]?.r_list,
				tempData?.groups[index]?.r_list
			)
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
		tempData?.groups?.forEach(async (item, index) => {
			if (isDataChanged(index)) {
				console.log(`Group ${index + 1} has changed:`);
				if (originalData?.groups?.[index]?.r_list.length !== item?.r_list.length) {
					if (originalData?.groups?.[index]?.r_list.length > item?.r_list.length) {
						const deletedRequest = originalData?.groups?.[index]?.r_list.filter(
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
								removedRequestFormData.append("remove_from", "1");
								const resRemovedRequest = await removeRequest(
									item.pk,
									removedRequestFormData
								);
								await refetchData();
								console.log(
									`Number of passengers changed from ${originalData?.groups?.[index]?.r_list.length} to ${item?.r_list.length}`,
									resRemovedRequest
								);
							});
						}
					} else if (
						originalData?.groups?.[index]?.r_list.length < item?.r_list.length
					) {
						const newAddedRequest = item?.r_list.filter((filItem) => {
							return originalData?.groups?.[index]?.r_list.some(
								(rItem) => rItem.employee_name !== filItem.employee_name
							);
						});

						newAddedRequest.map(async (addReqItem) => {
							const removedRequestFormData = new FormData();
							removedRequestFormData.append("request_id", addReqItem.pk);
							removedRequestFormData.append("add_from", "1");
							const resRemovedRequest = await addRequestToExistingGroup(
								item.pk,
								removedRequestFormData
							);
							await refetchData();
							console.log(
								`Number of passengers changed from ${originalData?.groups?.[index]?.r_list.length} to ${item?.r_list.length}`,
								resRemovedRequest
							);
						});
					}
				}
				if (originalData?.groups?.[index]?.security_name !== item?.security_name) {
					if (originalData?.groups?.[index]?.security_name === "") {
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
							originalData?.groups?.[index]?.security_obj_pk
						);
						const resRemovedSecurity = await removeSecurity(
							item.pk,
							removedSecurityFormData
						);
						await refetchData();
						console.log(
							`Security name removed: ${originalData?.groups?.[index]?.security_name}`,
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
							`Security name changed from ${originalData?.groups?.[index]?.security_name} to ${item?.security_name}`,
							resChangedSecurity
						);
					}
				}

				item.r_list.forEach(async (rItem, rIndex) => {
					if (
						originalData?.groups?.[index]?.r_list[rIndex]?.Start_Time !==
						rItem?.Start_Time
					) {
						console.log(
							`Start time for passenger ${rItem.employee_name} changed from ${originalData?.groups?.[index]?.r_list[rIndex]?.Start_Time} to ${rItem?.Start_Time}`
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
						originalData?.groups?.[index]?.r_list[rIndex]?.sequence !==
						rItem?.sequence
					) {
						console.log(
							`Sequence for passenger ${rItem.employee_name} changed from ${originalData?.groups?.[index]?.r_list[rIndex]?.sequence} to ${rItem?.sequence}`
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
		const fromGroup = originalData?.groups?.[activeIds[0]];
		const fromGroupPassanger =
			originalData?.groups?.[activeIds[0]]?.r_list?.[activeIds[1]];

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
				tempData?.groups?.[addSecurity.index]?.pk,
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
				{tempData?.groups?.map((item, index) => {
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
											<div className={styles.Name}>{item.group_name}</div>
										</div>
										<div className={styles.PassengerList}>
											{item.r_list.map((item2, ind2) => {
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
																		// 	arr.groups[index].r_list = arr.groups[index].r_list.filter(
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
																					arr.groups[index].r_list[ind2].Start_Time = val;
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
																					arr.groups[index].r_list[ind2].sequence = val;
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
																		onClick={async () => {
																			setActiveDelete();
																			unselectData();
																			setTempData((prev) => {
																				let arr = { ...prev };
																				arr.groups[index].r_list = arr.groups[index].r_list.filter(
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
																			{tempData?.groups?.map((toMoveItem, toMoveInd) => {
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
																				arr.groups[index].security_pk = "";
																				arr.groups[index].security_name = "";
																				arr.groups[index].security_mobile_no = "";
																				arr.groups[index].security_obj_pk = "";
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
									arr.groups[addPassenger.index].r_list = [
										...arr.groups[addPassenger.index].r_list,
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
										arr.groups[addPassenger.index].r_list = [
											...arr.groups[addPassenger.index].r_list,
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
									arr.groups[addSecurity.index].security_pk =
										tempData?.securitylist[Number(val)].pk;
									arr.groups[addSecurity.index].security_name =
										tempData?.securitylist[Number(val)].name;
									arr.groups[addSecurity.index].security_mobile_no =
										tempData?.securitylist[Number(val)].mobile_no;
									arr.groups[addSecurity.index].security_obj_pk =
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
		</div>
	);
}
