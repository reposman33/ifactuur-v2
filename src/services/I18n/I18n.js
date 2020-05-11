export class I18n {
	constructor() {
		if (!I18n.instance) {
			I18n.instance = this;
		}
		return I18n.instance;
	}

	_availableLanguages = ["en", "nl"];
	_defaultLanguage = this._availableLanguages.includes(navigator.language) ? navigator.language : "nl";
	_language = this._defaultLanguage;
	_LANGUAGES = {
		NAVIGATION: {
			MENU_TITLE_INVOICES: { en: "Invoices", nl: "Facturen" },
			MENU_TITLE_EXPENSES: { en: "Expenses", nl: "Uitgaven" },
			MENU_TITLE_COMPANIES: { en: "Companies", nl: "Bedrijven" },
			MENU_TITLE_SETTINGS: { en: "Settings", nl: "Instellingen" },
			MENU_TITLE_STATS: { en: "Stats", nl: "Berekeningen" },
		},
		ADMIN: {
			TITLE: { en: "Settings", nl: "Instellingen" },
			ADDRESS: {
				TITLE: { en: "Address", nl: "Adres" },
				NAME_INITIALS: { en: "Initials", nl: "Initialen" },
				NAME_INFIX: {
					en: "Infix",
					nl: "Tussenvoegsel",
				},
				NAME_LASTNAME: { en: "Surname", nl: "Achternaam" },
				ADDRESS: { en: "Address", nl: "Adres" },
				ZIPCODE: { en: "Postalcode", nl: "Postcode" },
				CITY: { en: "City", nl: "Stad" },
				COUNTRY: { en: "Country", nl: "Land" },
			},
			REGISTRATIONS: {
				TITLE: { en: "Registrations", nl: "Registraties" },
				COC_NUMBER: { en: "CoC nr", nl: "KvK nr" },
				VAT_NUMBER: { en: "VAT nr", nl: "BTW nr" },
			},
			DELIVERYCONDITIONS: {
				TITLE: {
					en: "Deliveryconditions",
					nl: "Leveringsvoorwaarden",
				},
			},
		},
		EXPENSES: {
			TABLE: {
				HEADER_DATE: { en: "Date", nl: "Datum" },
				HEADER_COMPANY: { en: "Company", nl: "Bedrijf" },
				HEADER_AMOUNT: { en: "Amount", nl: "Bedrag" },
			},
			LABELS: {
				DATE: { en: "Date", nl: "Datum" },
				COMPANY: { en: "Company", nl: "Bedrijf" },
				NEW_COMPANY: { en: "New company", nl: "Nieuw bedrijf" },
				AMOUNT: { en: "Amount", nl: "Bedrag" },
				ITEM: { en: "Items/Services", nl: "Goederen/Diensten" },
				TAX: { en: "Tax", nl: "BTW" },
			},
			BUTTONS: {
				NEW_EXPENSE: { en: "New", nl: "Nieuw" },
			},
		},

		INVOICES: {
			TITLE: { en: "Invoices", nl: "Facturen" },
			TABLE: {
				HEADER_DATE: { en: "Date", nl: "Datum" },
				HEADER_CLIENT: { en: "Client", nl: "Klant" },
				HEADER_SUM: { en: "Sum", nl: "Bedrag" },
				HEADER_STATUS: { en: "Status", nl: "Status" },
				HEADER_TYPE: { en: "Type", nl: "Soort" },
				HEADER_ACTIONS: { en: "Actions", nl: "Bewerken" },
			},
			BUTTONS: {
				NEW_INVOICE: { en: "New", nl: "Nieuw" },
				CLEAR: { en: "Clear", nl: "Formulier leegmaken" },
			},
		},
		INVOICE: {
			TITLE: { en: "Invoice", nl: "Factuur" },
			LABEL: {
				INVOICE_DATE: { en: "Invoice date", nl: "Factuur datum" },
				COMPANY: { en: "Company", nl: "Bedrijf" },
				VATRATE: { en: "VAT", nl: "BTW" },
				TOTAL: { en: "Total", nl: "Totaal" },
				SUBTOTAL: { en: "Subtotal", nl: "Subtotaal" },
				INVOICETYPE: { en: "Invoice type", nl: "Factuur type" },
			},
			COLUMNHEADER: {
				SERVICES: { en: "Services delivered", nl: "Geleverde diensten" },
				RATE: { en: "Hourly rate", nl: "Uurtarief" },
				HOURS: { en: "Hours", nl: "Uren" },
				TOTAL: { en: "Total", nl: "Totaal" },
			},
			INPUT: {
				VATRATE: { en: "Select...", nl: "Selecteer..." },
				COMPANY: { en: "Select a company", nl: "Selecteer bedrijf" },
			},
			BUTTON: {
				NEW_COMPANY: { en: "New company", nl: "Nieuw bedrijf" },
				DELETE: { en: "Delete", nl: "Verwijder" },
				SAVE: { en: "Save", nl: "Bewaar" },
			},
		},
		BUTTON: { SAVE: { en: "Save", nl: "Bewaar" }, OVERVIEW: { en: "Overview", nl: "Overzicht" } },
		PAGINATION: {
			NEXT_PAGE: { en: "next page", nl: "volgende pagina" },
			PREVIOUS_PAGE: { en: "previous page", nl: "vorige pagina" },
			FIRST_PAGE: { en: "first page", nl: "eerste pagina" },
			LAST_PAGE: { en: "last page", nl: "laatste pagina" },
			TOTAL: {
				en: "Showing page {from} to {to} of {size}",
				nl: "Toon pagina {from} tot {to} van {size}",
			},
		},
	};

	getLocale = () => (navigator.language.search("en") > -1 ? "en" : navigator.language.search("nl") > -1 ? "nl" : "");

	setLanguage = (lang) => (this._language = lang || this._defaultLanguage);

	getSelectedLanguage = () => this._language;

	get = (key) => {
		const langOb = key.split(".").reduce((ob, key) => ob[key] || {}, this._LANGUAGES);
		return langOb[this._language] || "--";
	};
}
