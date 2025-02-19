"use client";
// MODULES //

// COMPONENTS //
import { useState } from "react";
import Bottom1 from "@/components/Bottom1";
import Bottom2 from "@/components/Bottom2";
import Bottom3 from "@/components/Bottom3";

// SECTIONS //

// PLUGINS //
import Cookies from "js-cookie";
import OtpInput from "react-otp-input";

// UTILS //

// STYLES //

// IMAGES //
import MyloLogo from "../../../public/img/mylo-logo.gif";

// DATA //

// CONTEXT //
import { useAuthContext } from "@/context/auth.context";

// SERVICES //
import { login, verifyOTP } from "@/services/auth.service";

/** Login Page */
export default function LoginPage() {
	const [mobile, setMobile] = useState("");
	const [otpVisible, setOtpVisible] = useState(false);
	const [otp, setOtp] = useState("");
	const [error, setError] = useState();
	const [phoneValidation, setPhoneValidation] = useState();
	const [loading, setLoading] = useState(false);

	/** Login Page */
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (mobile.length < 10 || phoneValidation) {
			setError();
			setPhoneValidation("Phone number must be 10 digits.");
			return;
		}

		setLoading(true);

		const formData = new FormData();
		formData.append("mobile_no", `${e.target.phone.value}`);
		formData.append("username", `${e.target.phone.value}`);
		formData.append("password", `${otp}`);

		if (!mobile) {
			alert("Please enter your mobile number.");
			setLoading(false);
			return;
		}

		if (otp) {
			try {
				const otpRes = await verifyOTP(formData);

				await Cookies.set("token", JSON.stringify(otpRes.data.token), {
					expires: 7,
					path: "/",
				});
				window.location.reload();

				if (otpRes.status !== 200) {
					setError(otpRes.message);
					setLoading(false);
					throw new Error(otpRes.message);
				}
			} catch (error) {
				console.log(`Error Message: ${error.message}`);
				setLoading(false);
			}
			return;
		}

		try {
			const mobileRes = await login(formData);

			if (mobileRes.status !== 200) {
				setError(mobileRes.message);
				setLoading(false);
				throw new Error(mobileRes.message);
			}
		} catch (error) {
			console.log(`Error Message: ${error.message}`);
			setLoading(false);
			return;
		}

		// Simulate showing OTP input after form submission
		setOtpVisible(true);
		setLoading(false);
		setError();
	};

	/** resendOTP */
	const resendOTP = async () => {
		const formData = new FormData();
		formData.append("mobile_no", mobile);

		try {
			const mobileRes = await login(formData);

			if (mobileRes.status !== 200) {
				setError(mobileRes.message);
				setLoading(false);
				throw new Error(mobileRes.message);
			}
		} catch (error) {
			console.log(`Error Message: ${error.message}`);
			setLoading(false);
			return;
		}
	};

	/** handleChange */
	const handleChange = (e) => {
		const value = e.target.value;

		// Allow only digits and limit the input to 10 digits
		if (value.length <= 10) {
			setMobile(value);
			setPhoneValidation(); // Clear any previous errors
		} else {
			setMobile(value);
			setPhoneValidation("Phone number must be 10 digits.");
		}
	};

	return (
		<div>
			{/* Page Content starts here */}
			<main className="LoginPage">
				<div className="LoginSection">
					<div className="logo-container">
						<video
							autoPlay
							playsInline
							muted
							loop
							src="/img/mylo-logo-2.mp4"
							alt="Mylo Logo"
						/>
					</div>
					<h2 className="title">CAB ROSTER APP</h2>
					<form onSubmit={handleSubmit}>
						{/* Mobile Input */}
						<div className={`input-container ${otpVisible && "hidden"}`}>
							<div className="country-code">
								<span>+91</span>
							</div>
							<input
								name="phone"
								type="number"
								placeholder="Enter Your Mobile Number"
								className="mobile-input"
								value={mobile}
								onChange={handleChange}
								required
							/>
						</div>

						{/* Conditional OTP Input */}
						{otpVisible && (
							<div className="otp-container">
								{/* <input
									name="otp"
									type="number"
									placeholder="Enter OTP"
									className="mobile-input"
									value={otp}
									onChange={(e) => {
										setError();
										setOtp(e.target.value);
									}}
									required
								/> */}
								<OtpInput
									inputType="number"
									name="otp"
									value={otp}
									onChange={setOtp}
									numInputs={4}
									renderSeparator={<div className="dash" />}
									renderInput={(props) => <input {...props} />}
								/>
							</div>
						)}

						{phoneValidation && <div style={{ color: "red" }}>{phoneValidation}</div>}

						{error && <p className="color_red">{error}</p>}

						{/* Submit/Login Button */}
						{loading ? (
							<div className="submitOtp">
								<button className="login-button" type="submit" disabled={true}>
									Loading
								</button>
							</div>
						) : (
							<div className="submitOtp">
								{otpVisible && (
									<p className="resend" onClick={resendOTP}>
										Resend OTP
									</p>
								)}
								<button className="login-button" type="submit">
									{otpVisible ? "SUBMIT OTP" : "LOGIN"}
								</button>
							</div>
						)}
					</form>
				</div>
			</main>
			{/* Page Content ends here */}
		</div>
	);
}
