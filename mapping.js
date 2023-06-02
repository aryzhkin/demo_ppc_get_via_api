/**
 * Global constants
 */
const OVERVIEW_SHEET_NAME = '1. Overview';

/**
 * Function returns columns mapping for OVERVIEW_SHEET_NAME tab
 */
function getOverviewMapping() {

  const mapping = {
    'url': 0, // Company URL
    'automation': 1, // Automation
    'ppcSpend': 2, // PPC Spend
    'qualified': 3, // Qualified,
    'folder': 4, // Folder
    'pocEmail': 5, // POC Email
    'pocPosition': 6, // POC Position
    'pocFirstName': 7, // POC First Name
    'pocLastName': 8, // POC Last Name
    'address': 9, // Address
  }

  return mapping;
}
