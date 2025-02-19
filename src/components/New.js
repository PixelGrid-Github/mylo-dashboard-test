"use client";
// MODULES //
import React, { useState } from "react";

// COMPONENTS //
import Image from "next/image";
import { useAuthContext } from "@/context/auth.context";

// SECTIONS //

// PLUGINS //

// STYLES //
import styles from "@/styles/components/New.module.scss";

// IMAGES //
import MaleIcon from "../../public/img/male.svg";
import FemaleIcon from "../../public/img/female.svg";
import { logout } from "@/services/auth.service";
import { hideNumber } from "@/utils";

/** Passengers  */
export default function Passengers({
	data,
	selectedRides,
	setSelectedRides,
	setActiveIndexCity,
	setMapCenter,
	selectData,
}) {
	const {
		originalData,
		setLocations,
		setShowRoute,
		locations,
		showRoute,
		setSelectedPositions,
		selectedPositions,
	} = useAuthContext();

	// console.log(locations, "werwer");
	console.log(selectedPositions, "zxczxczxczxc");

	return (
		<div className="">
			<div className={styles.AllRequests}>
				{data?.news?.map((item, ind) => {
					return (
						<div
							key={ind}
							className={`${styles.Trip} ${
								selectedRides.some((activeItem) => activeItem.pk === item.pk)
									? styles.active
									: ""
							}`}
							onClick={() => {
								setSelectedRides((prev) => {
									let arr = [...prev];

									if (arr.length === 4) {
										return arr;
									}

									if (!arr.some((filItem) => filItem.pk === item.pk)) {
										arr = [...prev, { ...item, cx_number: ind + 1 }];
										return arr;
									}

									return arr.filter((filItem) => filItem.pk !== item.pk);
								});
								// setMapCenter({
								// 	lat: parseFloat(originalData?.news?.[ind]?.latitude),
								// 	lng: parseFloat(originalData?.news?.[ind]?.longitude),
								// });

								if (showRoute && locations.some((item2) => item2.pk === item.pk)) {
									setShowRoute(false);
									// setLocations(originalData);
									setSelectedPositions((prev) => {
										return prev.map((item3) => {
											delete item3.isSelected;
											return { ...item3 };
										});
									});
									return;
								}

								setShowRoute(true);

								setSelectedPositions((prev) => {
									return [
										...prev.map((item3) => {
											if (
												originalData?.news?.some((filItem) => {
													return filItem.pk === item3.pk;
												})
											) {
												console.log({ ...item3, isSelected: true });
												return { ...item3, isSelected: true };
											}
											return { ...item3 };
										}),
									];
								});

								if (selectData?.duty === "2") {
									setLocations([
										{
											lat: parseFloat(originalData?.news?.[ind]?.latitude),
											lng: parseFloat(originalData?.news?.[ind]?.longitude),
											gender: originalData?.news?.[ind]?.gender,
											from: "new",
											index: ind + 1,
											employee_name: originalData?.news?.[ind]?.employee_name,
											groupName: ind,
											pk: originalData?.news?.[ind]?.pk,
										},
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
										{
											lat: parseFloat(originalData?.news?.[ind]?.latitude),
											lng: parseFloat(originalData?.news?.[ind]?.longitude),
											gender: originalData?.news?.[ind]?.gender,
											from: "new",
											index: ind + 1,
											groupName: ind,
											employee_name: originalData?.news?.[ind]?.employee_name,
											pk: originalData?.news?.[ind]?.pk,
										},
									]);
								}
							}}
						>
							<div className={styles.Info}>
								<div className={styles.FlexPassenger}>
									<div>
										<div className={styles.Gender}>
											<img
												src={item?.gender === 1 ? MaleIcon.src : FemaleIcon.src}
												alt="male"
											/>
										</div>
										<div className={styles.Box}></div>
									</div>
									<div>
										<div className={styles.Name}>
											<div className={styles.UserName}>{item?.employee_name}</div>
											<a
												href={`tel:${item?.employee_mobile_no}`}
												className={styles.PhoneNumber}
											>
												({item?.employee_mobile_no})
											</a>
											{/* {item?.employee_name}
											<span className={styles.PhoneNumber}>{`( ${hideNumber(
												item?.employee_mobile_no
											)} )`}</span> */}
										</div>
										<div className={styles.Address}>
											<div>
												<span className={styles.Residence}>Residence:</span>
												<span className={styles.FullAddress}>{item.address}</span>
											</div>
											<div className={styles.Locality}>
												<span className={styles.Residence}>LOCALITY:</span>
												<span className={styles.FullAddress}>{item.locality}</span>
											</div>
										</div>
									</div>
									<div className={styles.CXNumber}>{ind + 1}</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
