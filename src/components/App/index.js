import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as ROUTES from "../../constants/routes.js";
import { withAuthentication } from "../Session/";
import Settings from "../Settings";
import { Expense, Expenses } from "../Expenses/";
import { Company, Companies } from "../Companies/";
import Invoices from "../Invoices/invoices";
import Invoice from "../Invoices/invoice";
import Navigation from "../Navigation/";
import PasswordChange from "../PasswordChange/";
import PasswordForget from "../PasswordForget/";
import SignIn from "../Security/signin";
import SignUp from "../Security/signup";
import Stats from "../Stats/";
import { I18n } from "../../services/I18n/I18n";
import "react-bootstrap";
import { config_dev, config_prod } from "../../environments.js";
import "./index.scss";

const config = process.env.NODE_ENV === "production" ? config_prod : config_dev;

class App extends React.Component {
	constructor(props) {
		super(props);
		this.I18n = new I18n();
		this.state = {
			language: this.I18n.getSelectedLanguage(),
			errorMessage: null,
		};
	}

	componentDidCatch(error, info) {
		this.setState({ errorMessage: error.message });
	}

	componentDidMount() {
		document.title = `${config.projectId} - ${process.env.NODE_ENV}`;
	}

	render() {
		if (this.state.errorMessage) {
			return <div>An error occurred: {this.state.errorMessage}</div>;
		}
		return (
			<Router>
				<React.Fragment>
					<div className='navContainer'>
						<Navigation />
					</div>
					<div className='container'>
						<Route exact path='/' component={Invoices} />
						<Route exact path={ROUTES.COMPANIES} component={Companies} />
						<Route exact path={ROUTES.COMPANY} component={Company} />
						<Route exact path={ROUTES.SETTINGS} component={Settings} />
						<Route exact path={ROUTES.EXPENSES} component={Expenses} />
						<Route exact path={ROUTES.EXPENSE} component={Expense} />
						<Route exact path={ROUTES.INVOICES} component={Invoices} />
						<Route exact path={ROUTES.INVOICE} component={Invoice} />
						<Route exact path={ROUTES.PASSWORD_CHANGE} component={PasswordChange} />
						<Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
						<Route exact path={ROUTES.SIGN_IN} component={SignIn} />
						<Route exact path={ROUTES.SIGN_UP} component={SignUp} />
						<Route exact path={ROUTES.STATS} component={Stats} />
					</div>
				</React.Fragment>
			</Router>
		);
	}
}

export default withAuthentication(App);
