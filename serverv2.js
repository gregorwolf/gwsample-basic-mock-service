const odatav2proxy = require("@sap/cds-odata-v2-adapter-proxy")
const express = require("express")
const cds = require("@sap/cds")

const { PORT=3000 } = process.env
const app = express()

cds.serve("all").in(app)

cds.deploy('srv').to('sqlite::memory:',{primary:true}) .then (async db => {

	const { BusinessPartnerSet: BusinessPartner, 
		ProductSet: Product,
		SalesOrderSet: SalesOrder,
		SalesOrderLineItemSet: SalesOrderLineItem
	} = db.entities('GWSAMPLE_BASIC')
	console.log('Adding sample data...')

	const bp = db.run (INSERT.into (BusinessPartner+'') .entries (
		{
			"BusinessPartnerID": "0100000000",
			"CompanyName": "SAP",
			"WebAddress": "http://www.sap.com",
			"EmailAddress": "customer-do.not.reply@sap.com",
			"PhoneNumber": "0622734567",
			"FaxNumber": "0622734004",
			"LegalForm": "SE",
			"CurrencyCode": "EUR",
			"BusinessPartnerRole": "01"
		},
		{
			"BusinessPartnerID": "0100000002",
			"CompanyName": "DelBont Industries",
			"WebAddress": "http://www.delbont.com",
			"EmailAddress": "customer-maria.brown@delbont.com",
			"PhoneNumber": "3023352668",
			"FaxNumber": "3023352004",
			"LegalForm": "Ltd.",
			"CurrencyCode": "USD",
			"BusinessPartnerRole": "01"
		}
	))

	const so = db.run (INSERT.into (SalesOrder+'') .entries (
		{
			"SalesOrderID": "0500000000",
			"Note": "EPM DG: SO ID 0500000000 Deliver as fast as possible",
			"NoteLanguage": "EN",
			"CustomerID": "0100000000",
			"CustomerName": "SAP",
			"CurrencyCode": "EUR",
			"GrossAmount": "14385.85",
			"NetAmount": "12088.95",
			"TaxAmount": "2296.90",
			"LifecycleStatus": "C",
			"LifecycleStatusDescription": "Closed",
			"BillingStatus": "P",
			"BillingStatusDescription": "Paid",
			"DeliveryStatus": "D",
			"DeliveryStatusDescription": "Delivered"
		},
		{
			"SalesOrderID": "0500000001",
			"Note": "EPM DG: SO ID 0500000001 Deliver as fast as possible",
			"NoteLanguage": "EN",
			"CustomerID": "0100000002",
			"CustomerName": "DelBont Industries",
			"CurrencyCode": "EUR",
			"GrossAmount": "15117.76",
			"NetAmount": "12704.00",
			"TaxAmount": "2413.76",
			"LifecycleStatus": "C",
			"LifecycleStatusDescription": "Closed",
			"BillingStatus": "P",
			"BillingStatusDescription": "Paid",
			"DeliveryStatus": "D",
			"DeliveryStatusDescription": "Delivered"
		}
	))

	const soItem = db.run (INSERT.into (SalesOrderLineItem+'') .entries (
		{
			"SalesOrderID": "0500000000",
			"ItemPosition": "0000000010",
			"ProductID": "HT-1000",
			"Note": "EPM DG: SO ID 0500000000 Item 0000000010",
			"NoteLanguage": "EN",
			"CurrencyCode": "EUR",
			"GrossAmount": "1137.64",
			"NetAmount": "956.00",
			"TaxAmount": "181.64",
			"Quantity": "1",
			"QuantityUnit": "EA"
		},
		{
			"SalesOrderID": "0500000001",
			"ItemPosition": "0000000010",
			"ProductID": "HT-1254",
			"Note": "EPM DG: SO ID 0500000001 Item 0000000010",
			"NoteLanguage": "EN",
			"CurrencyCode": "EUR",
			"GrossAmount": "595.00",
			"NetAmount": "500.00",
			"TaxAmount": "95.00",
			"Quantity": "2",
			"QuantityUnit": "EA"
		}
	))

	const product = db.run (INSERT.into (Product+'') .entries (
		{
			"ProductID": "HT-1000",
			"TypeCode": "PR",
			"Category": "Notebooks",
			"Name": "Notebook Basic 15",
			"NameLanguage": "EN",
			"Description": "Notebook Basic 15 with 2,80 GHz quad core, 15\" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro",
			"DescriptionLanguage": "EN",
			"SupplierID": "0100000046",
			"SupplierName": "SAP",
			"TaxTarifCode": 1,
			"MeasureUnit": "EA",
			"WeightMeasure": "4.200",
			"WeightUnit": "KG",
			"CurrencyCode": "EUR",
			"Price": "956.00",
			"Width": "30.000",
			"Depth": "18.000",
			"Height": "3.000",
			"DimUnit": "CM"
		},
		{
			"ProductID": "HT-1254",
			"TypeCode": "PR",
			"Category": "Flat Screen Monitors",
			"Name": "Bending Screen 21HD",
			"NameLanguage": "EN",
			"Description": "Optimum Hi-Resolution Widescreen max. 1920 x 1080 @ 85Hz, Dot Pitch: 0.27mm, HDMI, D-Sub",
			"DescriptionLanguage": "EN",
			"SupplierID": "0100000074",
			"SupplierName": "Brazil Technologies",
			"TaxTarifCode": 1,
			"MeasureUnit": "EA",
			"WeightMeasure": "15.000",
			"WeightUnit": "KG",
			"CurrencyCode": "EUR",
			"Price": "250.00",
			"Width": "37.000",
			"Depth": "12.000",
			"Height": "36.000",
			"DimUnit": "CM"
		}
	))	

  await Promise.all ([bp, product, so, soItem])

}) .catch (console.error)

app.use(odatav2proxy({ port: PORT }))

app.listen (PORT, ()=> console.info(`server listening on http:\/\/localhost:${PORT}`))