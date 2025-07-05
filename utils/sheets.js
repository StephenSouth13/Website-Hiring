// NOTE: File này chứa hàm để ghi dữ liệu vào Google Sheet.
// Yêu cầu file google-credentials.json và GOOGLE_SHEET_ID trong .env

const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const CREDENTIALS_PATH = process.env.GOOGLE_CREDENTIALS_PATH;
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

const auth = new google.auth.GoogleAuth({
  keyFile: CREDENTIALS_PATH,
  scopes: SCOPES,
});

const sheets = google.sheets({ version: 'v4', auth });

/**
 * Ghi một dòng mới vào Google Sheet
 * @param {object} applicationData - Dữ liệu ứng tuyển
 * @param {object} jobData - Dữ liệu công việc
 */
const appendToSheet = async (applicationData, jobData) => {
    try {
        const values = [
            [
                new Date().toLocaleString('vi-VN'), // Timestamp
                applicationData.full_name,
                applicationData.email,
                applicationData.phone,
                jobData.title,
                applicationData.cv_url,
                applicationData.message,
            ]
        ];
        
        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Applications!A:G', // Tên sheet và dải ô
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: values,
            },
        });
        console.log('Appended data to Google Sheet.');
    } catch (err) {
        console.error('Error appending to Google Sheet:', err);
    }
};

module.exports = { appendToSheet };