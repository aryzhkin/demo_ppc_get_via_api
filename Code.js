/**
 * The function iterates over domains on the "OVERVIEW_SHEET_NAME" tab,
 * receives the monthly budget from the xxx.com service and displays it on the tab.
 */
function updatePPCSpend() {
  
  // Get current sheet
  const sheetName = OVERVIEW_SHEET_NAME;
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);

  // Get existing data
  const data = sheet.getDataRange().getValues();
  const oMap = getOverviewMapping();

  // Get ppcSpend column index
  const ppcSpendColumnIndex = oMap['ppcSpend'] + 1;

  let thisItem, result;

  // Iterate over rows
  for (let rowNum in data) {

    // Skip headers
    if (rowNum == 0) continue;

    // Get object item to work with
    thisItem = getOverviewItem(data[rowNum]);

    // Skip rows without url
    if (thisItem['url'].length <= 0) continue;

    // Skip rows without proper automation
    if (thisItem['automation'].toLowerCase().trim() != 'get spend') continue;

    // Make a request to get info
    result = getMonthlyBudget(thisItem['url']);

    let resultText = '';
    if (result['success']) {
      // If we succeeded
      resultText = result['budget'];
    } else {
      // If we failed
      resultText = result['errorText'];
    }

    // Get row position
    rowPosition = parseInt(rowNum) + 1;

    // Put information in a row
    sheet.getRange(rowPosition, ppcSpendColumnIndex).setValue(resultText);
  }
}


/**
 * Function returns monthly budget from xxx.com
 * @see: https://www.xxx.com/api/yyy/getAllDomainStats
 */
function getMonthlyBudget(url) {
  
  // Trim spaces
  url = url.trim();

  // Check if url exists
  if (url.length <= 0) {
    Logger.log('No URL');
    return {
      'success': false,
      'errorText': 'No url'
    }
  }

  // Set API-key
  const api_secret_key = 'xxx';

  // Forming the API URL
  let fetch_url = 'https://www.xxx.com/apis/yyy/getAllDomainStats';

  fetch_url += '?domain=' + url;
  fetch_url += '&api_key=' + api_secret_key;
  fetch_url += '&countryCode=US';

  // Mockup object
  let mockupData = {'results': []};

  // Sending request
  let response, content, responseCode;
  try {
    
    //// In case this is a demo - we don't need make real requests
    // response = UrlFetchApp.fetch(fetch_url);
    // content = response.getContentText();
    // responseCode = response.getResponseCode();

    // Mockup data
    responseCode = 200;

    if (url == 'example.com') {
      content = {'monthlyBudget': 1275000};
    } else if (url == 'example1.com') {
      content = {'monthlyBudget': 1500000};
    } else if (url == 'emptyresult.com') {
      // Imitating no results case
      content = false;
    } else if (url == 'error on name') {
      // Imitating wrong URL name
      content = 'Wrong URL name';
      responseCode = 400;
    }

    // Push result to object
    if (content) mockupData['results'].push(content);

  } catch (e) {
    // Catching the error
    Logger.log('Error with URL: ' + url);
    Logger.log(e);

    return {
      'success': false,
      'errorText': 'xxx service URL validation error'
    }
  }

  // If there is some error returned from API
  if (responseCode != 200) {
    Logger.log('Error on request for ' + url + ' url');
    return {
      'success': false,
      'errorText': content
    }
  }

  // const data = JSON.parse(content); // For production use
  const data = mockupData;

  // If there is no data
  if (data['results'].length <= 0) {
    Logger.log('No data for url: ' + url);
    return {
      'success': false,
      'errorText': 'No results returned from xxx for url: ' + url
    }
  }

  const lastResultNum = data['results'].length - 1;
  const result = {
    'success': true,
    'budget': data['results'][lastResultNum]['monthlyBudget']
  }

  return result;
}
