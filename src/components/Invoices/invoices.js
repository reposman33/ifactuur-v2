import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import { I18n } from "../../services/I18n/I18n";
import * as ROUTES from "../../constants/routes";
import { withFirebase } from "../../Firebase";
import "./invoices.scss";
//import invoice from "./invoice";

class Invoices extends React.Component {
	constructor(props) {
		super(props);
		this.I18n = new I18n();
		this.PAGE = "INVOICES";
		this.state = { rowData: [] };
		this.emptyRowData = {
			id: "",
			date: "",
			client: "",
			sum: "",
			status: "",
		};
		const DateSortFunction = (a, b, order, dataField, rowA, rowB) =>
			order === "asc" ? a - b : order === "desc" ? b - a : "";
		this.dateTimeFormat = new Intl.DateTimeFormat(this.I18n.getLocale(), {
			year: "numeric",
			month: "long",
			day: "numeric",
		});

		this.columns = [
			{ dataField: "invoiceNr", text: "#", headerStyle: { width: "8%" }, sort: true },
			{
				dataField: "dateTimeCreated",
				formatter: (cell, row) => this.dateTimeFormat.format(cell),
				text: this.I18n.get("INVOICES.TABLE.HEADER_DATE"),
				sort: true,
				sortFunc: DateSortFunction,
			},
			{ dataField: "companyName", text: this.I18n.get("INVOICES.TABLE.HEADER_CLIENT"), sort: true },
			{
				dataField: "type",
				text: this.I18n.get("INVOICES.TABLE.HEADER_TYPE"),
				headerStyle: { width: "10%" },
			},
			{
				dataField: "statustitle",
				text: this.I18n.get("INVOICES.TABLE.HEADER_STATUS"),
				headerStyle: { width: "10%" },
			},
		];
		// make the async call to Firebase and pick it up in componentDidMount
		this.invoicesPromise = this.props.firebase.getInvoices(
			this.columns.map((ob) => ob.dataField),
			"dateTimeCreated"
		);

		this.table = {
			defaultSorted: [
				{
					dataField: "dateTimeCreated",
					order: "asc",
				},
			],
			defaultSortDirection: "desc",
		};
		this.handleNewInvoice = this.handleNewInvoice.bind(this);

		this.paginationConfig = {
			sizePerPage: 10,
			hideSizePerPage: true,
			hidePageListOnlyOnePage: true,
			showTotal: true,
			prePageTitle: this.I18n.get("PAGINATION.PREVIOUS_PAGE"),
			nextPageTitle: this.I18n.get("PAGINATION.NEXT_PAGE"),
			firstPageTitle: this.I18n.get("PAGINATION.FIRST_PAGE"),
			lastPageTitle: this.I18n.get("PAGINATION.LAST_PAGE"),
			paginationTotalRenderer: (from, to, size) => (
				<span className='react-bootstrap-table-pagination-total'>
					{this.I18n.get("PAGINATION.TOTAL")
						.split(" ")
						.map((word) =>
							word === "{from}" ? from : word === "{to}" ? to : word === "{size}" ? size : word
						)
						.join(" ")}
				</span>
			),
		};
	}

	componentDidMount() {
		//this.props.firebase.importInvoices();
		//this.props.firebase.convertRows2Array();
		//this.props.firebase.typeInvoices();
		//this.props.firebase.updateUserId("JN8UiHXwUINB8QloSBnUP2BH0a02");
		this.invoicesPromise.then((res) => this.setState({ rowData: res }));
	}

	handleNewInvoice() {
		this.props.history.push(ROUTES.INVOICE);
	}

	onRowClick = (e, row, rowIndex) => {
		this.props.history.push({
			pathname: ROUTES.INVOICE,
			state: { id: this.state.rowData[rowIndex].ID },
		});
	};

	render() {
		return (
			<div>
				<BootstrapTable
					bootstrap4
					data={this.state.rowData}
					classes='table'
					columns={this.columns}
					table={this.table}
					keyField='ID'
					bordered
					hover
					rowEvents={{ onClick: this.onRowClick }}
					pagination={paginationFactory(this.paginationConfig)}></BootstrapTable>

				<button className='btn btn-primary float-right' onClick={this.handleNewInvoice}>
					{this.I18n.get("INVOICES.BUTTONS.NEW_INVOICE")}
				</button>
			</div>
		);
	}
}

export default withFirebase(Invoices);