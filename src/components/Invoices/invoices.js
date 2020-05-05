import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import { I18n } from "../../services/I18n/I18n";
import * as ROUTES from "../../constants/routes";
import { withFirebase } from "../../Firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./invoices.scss";

class Invoices extends React.Component {
	constructor(props) {
		super(props);
		this.state = { rowData: [] };
	}

	I18n = new I18n();

	PAGE = "INVOICES";

	emptyRowData = {
		id: "",
		date: "",
		client: "",
		sum: "",
		status: "",
	};

	dateSortFunction = (a, b, order, dataField, rowA, rowB) =>
		order === "asc" ? a - b : order === "desc" ? b - a : "";

	dateTimeFormat = new Intl.DateTimeFormat(this.I18n.getLocale(), {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	getColumns = () => [
		{ dataField: "invoiceNr", text: "#", headerStyle: { width: "8%" }, sort: true },
		{
			dataField: "dateTimeCreated",
			formatter: (cell, row) => this.dateTimeFormat.format(cell),
			text: this.I18n.get("INVOICES.TABLE.HEADER_DATE"),
			sort: true,
			sortFunc: this.dateSortFunction,
		},
		{
			dataField: "companyName",
			text: this.I18n.get("INVOICES.TABLE.HEADER_CLIENT"),
			sort: true,
		},
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
		{
			dataField: "actions",
			text: this.I18n.get("INVOICES.TABLE.HEADER_ACTIONS"),
			isDummyField: true,
			formatter: () => (
				<span className='actionIcons'>
					<FontAwesomeIcon icon='print' />
					<FontAwesomeIcon icon='edit' />
				</span>
			),
			headerStyle: { width: "10%" },
		},
	];
	// make the async call to Firebase and pick it up in componentDidMount
	invoicesPromise = this.props.firebase.getInvoices(
		this.getColumns().map((ob) => ob.dataField),
		"dateTimeCreated"
	);

	table = {
		defaultSorted: [
			{
				dataField: "dateTimeCreated",
				order: "asc",
			},
		],
		defaultSortDirection: "desc",
	};
	handleNewInvoice = this.handleNewInvoice.bind(this);

	paginationConfig = {
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
					.map((word) => (word === "{from}" ? from : word === "{to}" ? to : word === "{size}" ? size : word))
					.join(" ")}
			</span>
		),
	};

	componentDidMount() {
		// TEST - convert collection
		// this.props.firebase.importBills("bills");
		// this.props.firebase.typeCollectionKeys("bills");

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
					columns={this.getColumns()}
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
