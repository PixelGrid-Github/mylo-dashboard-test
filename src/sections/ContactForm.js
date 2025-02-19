// // MODULES //
// // import { useRef } from "react";

// // COMPONENTS //

// // SECTIONS //

// // PLUGINS //
// import { useForm } from "react-hook-form";

// // UTILS //

// // STYLES //
// import styles from "@/styles/sections/ContactForm.module.scss";

// // IMAGES //

// // DATA //

// /** ContactForm Section */
// export default function ContactForm() {
// 	// const formRef = useRef();
// 	const {
// 		register,
// 		handleSubmit,
// 		formState: { errors },
// 	} = useForm({ mode: "onChange" });

// 	/** Function to handle submit */
// 	const onSubmit = async (data, e) => {
// 		// Write form submission codes here
// 		// onSubmit={handleSubmit(onSubmit)}
// 	};

// 	return (
// 		<div>
// 			<h1>Contact Us</h1>
// 			<form>
// 				<div className={styles.formGroup}>
// 					<label className={styles.label} htmlFor="name">
// 						Name:
// 					</label>
// 					<input
// 						className={styles.input}
// 						type="text"
// 						id="name"
// 						name="name"
// 						{...register("name", { required: true })}
// 					/>
// 					{errors.name && errors.name.type == "required" && (
// 						<label className="error">This field is required</label>
// 					)}
// 				</div>
// 				<div className={styles.formGroup}>
// 					<label className={styles.label} htmlFor="email">
// 						Email:
// 					</label>
// 					<input
// 						className={styles.input}
// 						type="email"
// 						id="email"
// 						name="email"
// 						{...register("email", {
// 							required: true,
// 							pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
// 						})}
// 					/>
// 					{errors.email && errors.email.type == "required" && (
// 						<label className="error">This field is required</label>
// 					)}
// 					{errors.email && errors.email.type == "pattern" && (
// 						<label className="error">Enter valid email</label>
// 					)}
// 				</div>
// 				<div className={styles.formGroup}>
// 					<label className={styles.label} htmlFor="message">
// 						Message:
// 					</label>
// 					<textarea
// 						className={styles.textarea}
// 						id="message"
// 						name="message"
// 						{...register("message", {
// 							required: true,
// 						})}
// 					/>
// 					{errors.message && errors.message.type == "required" && (
// 						<label className="error">This field is required</label>
// 					)}
// 				</div>
// 				<button className={styles.button} type="submit">
// 					Submit
// 				</button>
// 			</form>
// 		</div>
// 	);
// }
