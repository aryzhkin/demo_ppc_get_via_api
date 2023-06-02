/**
 * Function convert row data to an JS-object with key->value
 */
function getOverviewItem(item) {
  const oMap = getOverviewMapping();
  
  let result = {};

  // Iterate through cells
  for (let itemNum in item) {

    // Search the field key through the mapping
    for (let mapKey in oMap) {
      let mapNum = oMap[mapKey];

      if (mapNum == itemNum) {
        // Get matching
        result[mapKey] = item[itemNum];
        break;
      }
    }
  }

  // Return object item
  return result;
}
