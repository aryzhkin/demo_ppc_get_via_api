/**
 * Function adding a custom menu
 */
function onOpen(e) {
  SpreadsheetApp.getUi()
      .createMenu('Custom menu')
      .addItem('Update PPC Spend', 'updatePPCSpend')
      .addToUi();
}