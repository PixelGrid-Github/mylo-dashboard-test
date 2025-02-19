"use client";
// MODULES //
import React, { useState } from "react";

// COMPONENTS //
import Image from "next/image";
import { useAuthContext } from "@/context/auth.context";

// SECTIONS //

// PLUGINS //

// STYLES //
import styles from "@/styles/components/Bottom1.module.scss";

// IMAGES //
import MaleIcon from "../../public/img/male.svg";
import FemaleIcon from "../../public/img/female.svg";
import DeleteIcon from "../../public/img/delete.svg";

// SERVICES //
import { createGroups } from "@/services/request.service";

/** Bottom1  */
export default function Bottom1({
	data,
	selectedRides,
	setActiveIndexCity,
	filterData,
}) {
	const [activeSelectPassenger, setSelectPassenger] = useState([]);
	const { setOriginalData } = useAuthContext();

	/** handleTabClickCity */
	const selectPassenger = (index) => {
		setSelectPassenger((prevState) => {
			if (prevState.includes(index)) {
				return [];
			} else {
				return [index];
			}
		});
	};

	/** refetchData */
	const refetchData = async () => {
		await filterData();
		setTimeout(() => {
			setOriginalData(JSON.parse(window.localStorage.getItem("originalData")));
		}, 0);
	};

	/** submit */
	const submit = async (e) => {
		e.preventDefault();
		const name = e.target.GroupName.value;

		if (!name || !selectedRides.length) {
			return;
		}

		const requestIds = selectedRides.map((ride) => ride.pk).join(",");
		const formData = new FormData();
		formData.append("group_name", name);
		formData.append("request_ids", requestIds);

		try {
			const resResult = await createGroups(formData);

			await refetchData();
			setActiveIndexCity(1);
		} catch (error) {
			console.log(`Error Message: ${error.message}`);
		}
	};

	return (
		<div className={styles.BottomNavigation}>
			<div className="AppContainer">
				<form onSubmit={(e) => submit(e)}>
					<div className={styles.flex}>
						<div>
							<div className="text-center">
								<label>CX Numbers Selected:</label>
							</div>
							<div className={styles.Seats}>
								<span
									className={`${styles.Seat} ${
										selectedRides?.[0]?.cx_number && styles.Filled
									}`}
								>
									{selectedRides?.[0]?.cx_number}
								</span>
								<span
									className={`${styles.Seat} ${
										selectedRides?.[1]?.cx_number && styles.Filled
									}`}
								>
									{selectedRides?.[1]?.cx_number}
								</span>
								<span
									className={`${styles.Seat} ${
										selectedRides?.[2]?.cx_number && styles.Filled
									}`}
								>
									{selectedRides?.[2]?.cx_number}
								</span>
								<span
									className={`${styles.Seat} ${
										selectedRides?.[3]?.cx_number && styles.Filled
									}`}
								>
									{selectedRides?.[3]?.cx_number}
								</span>
							</div>
						</div>
						<div>
							<label>Name this Group:</label>
							<input type="text" name="GroupName" id="GroupName" required />
							<input type="submit" value="CREATE GROUP" className="orangeBtn" />
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
