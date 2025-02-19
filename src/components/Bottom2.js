"use client";
// MODULES //
import React, { useEffect, useState } from "react";

// COMPONENTS //
import Image from "next/image";

// SECTIONS //

// PLUGINS //

// STYLES //
import styles from "@/styles/components/Bottom1.module.scss";
import {
	assignGroupToVehicle,
	createGroups,
	createVehicle,
	getDriverDetailsFromNumber,
	getVehicleDetailsFromVehicleNumber,
} from "@/services/request.service";
import { useAuthContext } from "@/context/auth.context";

// IMAGES //
import CloseIcon from "../../public/img/close.svg";

/** Bottom2  */
export default function Bottom2({
	activeSelectPassenger,
	data,
	setActiveIndexCity,
	filterData,
	selectData,
}) {
	const [addVehicle, setAddVehicle] = useState({
		value: false,
		index: 0,
		name: "",
	});

	const { originalData } = useAuthContext();

	const [tempData, setTempData] = useState();
	/** refetchData */
	const refetchData = async () => {
		await filterData();
	};

	/** submit */
	const submit = async (e) => {
		e.preventDefault();
		const vehicleId = e.target.vehicle.value;

		if (!vehicleId || activeSelectPassenger === null) {
			return;
		}

		let requestIds = data?.groups?.[activeSelectPassenger]?.r_list
			?.map((ride) => ride.pk)
			.join(",");

		const formData = new FormData();
		formData.append("date", selectData.selectDate);
		formData.append("vehicle_id", vehicleId);
		formData.append("request_ids", requestIds);

		try {
			const resResult = await assignGroupToVehicle(
				formData,
				data?.groups?.[activeSelectPassenger].pk
			);
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

	/** changeDisableOfInputs */
	const changeDisableOfInputs = (disable, htmls) => {
		if (disable) {
			htmls.map((item) => (item.disabled = true));
		} else {
			htmls.map((item) => (item.disabled = false));
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
	}, [originalData]);

	return (
		<div className={styles.BottomNavigation}>
			{addVehicle.value && (
				<div className="popup">
					<div className="popup-content">
						<img
							src={CloseIcon.src}
							alt="close"
							className="close"
							onClick={() => setAddVehicle({ value: false, index: addVehicle.index })}
						/>
						<h3>Select Vehicle</h3>
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
									className="vNumber"
									onChange={(e) => fetchVehicleInfoFromVehicleNumber(e.target.value)}
								/>
								<input
									className="seatCount"
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
									placeholder="Device Name"
									className="dName"
								/>
								<input
									type="text"
									name="driverLicence"
									id="driverLicence"
									placeholder="Device Licence"
									className="dLicence"
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
								{/* MH02BV1759 (6S) (DRIVER NAME - MOBILE NUMBER) */}
							</select>
							<button>Add</button>
						</form>
					</div>
				</div>
			)}
			<div className="AppContainer">
				<form
					onSubmit={(e) => {
						e.preventDefault();
					}}
				>
					<div className={styles.flex}>
						<div style={{ width: "auto" }}>
							<div className="text-center">
								<label>GROUP Selected</label>
							</div>
							<div className={styles.GroupSeats}>
								<span
									className={styles.GroupSeat}
									style={{
										display: `${activeSelectPassenger !== null ? "block" : "none"}`,
									}}
								>
									{/* {data?.groups?.[activeSelectPassenger]} */}
									{`G${activeSelectPassenger + 1}`}
								</span>
							</div>
						</div>
						<div>
							<label>Assign Vehicle</label>
							{/* <select defaultValue="" name="vehicle" id="vehicle" required>
								<option value="" disabled></option>
								{data?.vehicalList?.map((vehicle, index) => {
									return (
										<option key={index} value={vehicle.id}>
											{vehicle.driver_name}
										</option>
									);
								})}
							</select> */}
							<input
								type="text"
								value={addVehicle.name}
								name="vehicle"
								id="vehicle"
								required
								onClick={() => {
									console.log(activeSelectPassenger);
									if (activeSelectPassenger === null) {
										return;
									}
									console.log("click");
									setAddVehicle((prev) => {
										return { ...prev, value: true };
									});
								}}
							/>
							<input type="submit" value="ASSIGN VEHICLE" className="greenBtn" />
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
