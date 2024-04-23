/*
Licensed under MIT;
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://opensource.org/license/mit

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/** 
 * This file contains the main application functions that import data from
 * Clockify into your Google Sheet.
 */


function importClockifyData() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName('Clockify');
  var hoursByMonthSheet = spreadsheet.getSheetByName('Reports');

  // Clear the existing data in the sheet
  var lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).clearContent();
  }
  // Set date range from the start of the current year to today
  var today = new Date();
  var startOfYear = new Date(today.getFullYear(), 0, 1); // January 1st of current year
  
  var dateRangeStart = Utilities.formatDate(startOfYear, Session.getScriptTimeZone(), "yyyy-MM-dd") + "T00:00:00.000";
  var dateRangeEnd = Utilities.formatDate(today, Session.getScriptTimeZone(), "yyyy-MM-dd") + "T23:59:59.000";
  
  var api_key = 'YOUR_API_KEY';
  var workspace_id = 'CLOCKIFY_WORKSPACE_ID';
  var url = 'https://reports.api.clockify.me/v1/workspaces/' + workspace_id + '/reports/detailed';
  
  var payload = {
    "dateRangeStart": dateRangeStart,
    "dateRangeEnd": dateRangeEnd,
    "detailedFilter": {
      "page": 1,
      "pageSize": 1000
    },
    "exportType": "CSV",
  };
  
  var options = {
    'method': 'post',
    'contentType': 'application/json',
    'headers': {
      'X-Api-Key': api_key
    },
    'payload': JSON.stringify(payload)
  };
  
  var response = UrlFetchApp.fetch(url, options);
  var csvData = Utilities.parseCsv(response.getContentText());
  
  // Insert data into the sheet
  if (csvData.length > 1) {
    sheet.insertRowsAfter(1, csvData.length - 1);
    for (var i = 1; i < csvData.length; i++) {
      sheet.getRange(i + 1, 1, 1, csvData[i].length).setValues([csvData[i]]);
    }
  } else {
    Logger.log("No new data to import.");
  }
  
  // Update the "Reports" sheet with the last updated time
  var scriptFinishTime = new Date();
  var formattedScriptFinishTime = Utilities.formatDate(scriptFinishTime, Session.getScriptTimeZone(), "MM/dd/yyyy, hh:mm a");
  hoursByMonthSheet.getRange("A1").setValue("Last Updated: " + formattedScriptFinishTime + " (PST)");
}
