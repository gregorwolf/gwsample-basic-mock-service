using GWSAMPLE_BASIC as GWSAMPLE_API from './external/csn/GWSAMPLE_BASIC.json';

service GWSAMPLE_BASIC @(path: '/sap/opu/odata/sap/IWBEP/GWSAMPLE_BASIC') {
	@cds.persistence.skip:false
	@cds.persistence.table
	entity BusinessPartnerSet as projection on GWSAMPLE_API.BusinessPartner;
	@cds.persistence.skip:false
	@cds.persistence.table
	entity ProductSet as projection on GWSAMPLE_API.Product;
	@cds.persistence.skip:false
	@cds.persistence.table
	entity SalesOrderSet as projection on GWSAMPLE_API.SalesOrder;
	@cds.persistence.skip:false
	@cds.persistence.table
	entity SalesOrderLineItemSet as projection on GWSAMPLE_API.SalesOrderLineItem;
	@cds.persistence.skip:false
	@cds.persistence.table
	entity ContactSet as projection on GWSAMPLE_API.Contact;
}
