import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes.js";
import { firebaseContextConsumer } from "../../Firebase/index.js";
import { compose } from "recompose";
import * as styles from "./signup.module.scss";

const INITIAL_STATE = {
	username: "",
	email: "",
	password: "",
	passwordRepeat: "",
	error: undefined,
	successMessage: undefined,
};

class SignUpForm extends Component {
	constructor(props) {
		super(props);

		this.state = INITIAL_STATE;
	}

	onRegister = (event) => {
		const { email, password } = this.state;
		this.props.firebase
			.createUserWithEmailAndPassword(email, password)
			.then((authuser) => {
				this.props.history.push({ pathname: ROUTES.SETTINGS, state: { showModal: true } });
			})
			.catch((error) => {
				this.setState({ error: error, successMessage: undefined });
			});
		event.preventDefault();
	};

	onChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const { username, email, password, passwordRepeat, error, successMessage } = this.state;
		const isInvalid = password !== passwordRepeat || password === "" || username === "" || email === "";

		return (
			<div className={styles.signupContainer}>
				<div className={styles.header + " py-1 mb-3"}>Even registreren...</div>
				<div className={styles.table + " my-3"}>
					<table>
						<tbody>
							<tr>
								<td>
									<label>userName</label>
								</td>
								<td>
									<input type='text' name='username' value={username} onChange={this.onChange} />
								</td>
							</tr>
							<tr>
								<td>
									<label>E-mail</label>
								</td>
								<td>
									<input type='text' name='email' value={email} onChange={this.onChange} />
								</td>
							</tr>
							<tr>
								<td>
									<label>Wachtwoord</label>
								</td>
								<td>
									<input type='password' name='password' value={password} onChange={this.onChange} />
								</td>
							</tr>
							<tr>
								<td>
									<label htmlFor='passwordRepeat' style={{ whiteSpace: "nowrap" }}>
										Herhaal wachtwoord
									</label>
								</td>
								<td>
									<input
										type='password'
										name='passwordRepeat'
										value={passwordRepeat}
										onChange={this.onChange}
										onPaste={(e) => e.preventDefault()}
									/>
								</td>
							</tr>

							<tr>
								<td>
									<Link to={ROUTES.SIGN_IN}>Login</Link>
								</td>
								<td className='d-flex flex row justify-content-right'>
									<input
										type='submit'
										value='Registreer'
										disabled={isInvalid}
										onClick={this.onRegister}
									/>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				{successMessage && <div className={styles.alert}>{successMessage}</div>}
				{error && <div className={styles.alert}>{error.message}</div>}
			</div>
		);
	}
}

const SignUpLink = () => (
	<div>
		<Link to={ROUTES.SIGN_UP}>Registreer</Link>
	</div>
);

export default compose(withRouter, firebaseContextConsumer)(SignUpForm);
export { SignUpForm, SignUpLink };
