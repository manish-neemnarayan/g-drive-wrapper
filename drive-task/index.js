const {google} = require('googleapis');
const fs = require('fs');
const service_account = require('./google_service.json');

const auth = new google.auth.JWT({
    email: service_account.client_email,
    key: service_account.private_key,
    scopes: ['https://www.googleapis.com/auth/drive']
});

const drive = google.drive({version: 'v3', auth});

(async() => {
    try {
        console.log('listing files')
        const files = await drive.files.list({
            // q: 'mimeType = "video/mp4"',
            q: `'1bb_D1KXFeQ6qbKH0jfS3ymehGIj39oPD' in parents`,
            fields: 'files(id, name, mimeType,trashed, parents, webViewLink)',
        })

        if(!files) {
            console.log('No files found.');
            throw new Error('No files found.');
        } 
        
        console.log('Files:');
        console.log(files.data.files);
        // files.data.files.forEach(file => {
        //     // console.log(file)
        //     console.log(`${file.name} - ${file.id}`);
        // });
    } catch (error) {
        console.log(error);
    }
})();