# Clockify Data Importer for Google Sheets

This project contains a Google Apps Script that automates the import of detailed report data from Clockify to a Google Sheet.

## Features

- Clears existing data and fetches new entries.
- Sets a date range from the start of the current year to the present day.
- Automatically updates the Google Sheet with new data.
- Tracks and logs the last update time on the 'Report' sheet.

## Setup

1. **Google Sheet Preparation**:
   - Create a Google Sheet with at least two sheets: 'Clockify' and 'Report'.
   - 'Clockify' will store the detailed time entry data.
   - 'Report' will log the last updated time.

2. **Script Installation**:
   - Open the Google Sheet.
   - Navigate to Extensions > Apps Script.
   - Delete any code in the script editor and paste the code from this repository.
   - Save and name the project.

3. **API Key Configuration**:
   - Obtain your API Key from your Clockify account.
   - Replace 'YOUR_API_KEY' in the script with your actual Clockify API Key.

4. **Usage**:
   - Run the `importClockifyData` function directly from the Apps Script Editor to import the data.
   - Schedule the script to run at regular intervals using Google Apps Script Triggers for automated updates.

## Dependencies

- A valid Clockify API Key.
- Access to Google Apps Script.

## License

This project is released under the MIT License. See the LICENSE file for details.
