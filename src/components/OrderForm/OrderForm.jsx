
import { useEffect, useState } from "preact/compat";
import Styles from "./OrderForm.module.css";

// import axios from "axios";




export default function OrderForm() {
	const [responseFromSubmitOrder, setResponseFromSubmitOrder] = useState({
		data: null,
		error: null,
		isLoading: false,
	});


	let timer = null;

	const resetButtonWithSetTimeout = () => {
		timer = setTimeout(() => {
			// reset button timer
			setResponseFromSubmitOrder((prevState) => ({
				...prevState,
				data: null,
				error: null,
				isLoading: false,
			}));
		}, 6000);
	};

	useEffect(() => {
		// componentWillUnmount
		return () => {
			if (timer) {
				clearTimeout(timer);
			}
		};
	});

	const formHandleSubmit = (e) => {
		e.preventDefault();
		console.log("Form Submitted");
	};

	return (

			<form
				className={`flex-col-acenter ${Styles.form__center}`}
				onSubmit={(e) => formHandleSubmit(e)}
			>


				<div className={Styles.tabbed}>
					<input type="radio" id="order-tab1" name="order-css-tabs" checked />
					<input type="radio" id="order-tab2" name="order-css-tabs" />
					<input type="radio" id="order-tab3" name="order-css-tabs" />
					<input type="radio" id="order-tab4" name="order-css-tabs" />

					<ul className={Styles.labels_container}>
						<li className={Styles.label}>
							<label for="order-tab1">Contact Information</label>
						</li>
						<li className={Styles.label}>
							<label for="order-tab2">Animal Information</label>
						</li>
						<li className={Styles.label}>
							<label for="order-tab3">Preferred Date</label>
						</li>
						<li className={Styles.label}>
							<label for="order-tab4">Order Notes</label>
						</li>
					</ul>
				
					<div className={Styles.tab_content}>
						content 1
					</div>
					<div className={Styles.tab_content}>
						content 2
					</div>
					<div className={Styles.tab_content}>
						content 3
					</div>
					<div className={Styles.tab_content}>
						content 4
					</div>
				</div>


				<div className={Styles.heading_container}>
					<h4 className="order-form--before-submitting">
						Please Double Check Your Information Before
						Submitting!
					</h4>
				</div>


				<button
					type="submit"
					className={`${
						Styles.submit
					} btn btn--outline btn--large ${
						responseFromSubmitOrder.isLoading
							? "btn--pending"
							: responseFromSubmitOrder.data
							? "btn--complete"
							: responseFromSubmitOrder.error
							? "btn--error"
							: ""
					}`}
					disabled={responseFromSubmitOrder.isLoading}
				>
					{responseFromSubmitOrder.isLoading
						? "Submitting..."
						: responseFromSubmitOrder.data
						? "Order submitted!"
						: responseFromSubmitOrder.error
						? "Submission Error"
						: "Submit"}
				</button>

				<p
					className={`${Styles.notification} ${
						responseFromSubmitOrder.error
							? `${Styles.show} ${Styles.error}`
							: responseFromSubmitOrder.data
							? `${Styles.show} ${Styles.success}`
							: ""
					}`}
				>
					{responseFromSubmitOrder.data
						? "Order Submitted! A copy will be sent to your provided email address."
						: responseFromSubmitOrder.error
						? `Error: ${responseFromSubmitOrder.error.message}`
						: ""}
				</p>
			</form>
	);
}