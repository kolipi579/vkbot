const { VK, Keyboard } = require('vk-io')
const { HearManager } = require('@vk-io/hear')
const{
    getAuthToken,
    getSpreadSheet,
    getSpreadSheetValues
} = require('./googlesheetsapi.js')

// const spreadsheetId = '1H849d3GUueyfTwbvMdqfWnbXs0atBwTHUQzYcJpxx4E';
// const sheetName = './vkbot_google_spreadsheets_api.json';
// Comands to set up google api
// set GOOGLE_APPLICATION_CREDENTIALS=./vkbot_google_spreadsheets_api.json
// set GCLOUD_PROJECT=1H849d3GUueyfTwbvMdqfWnbXs0atBwTHUQzYcJpxx4E  
// Comand to start the bot it self
// node bot.js 1H849d3GUueyfTwbvMdqfWnbXs0atBwTHUQzYcJpxx4E Sheet1

const spreadsheetId = process.argv[2];
const sheetName = process.argv[3];

const baseBuilder = Keyboard.builder();

const vk = new VK({
    token: 'vk1.a.Cx7Ib25aUsNzn0sj7qO9r2889QSrs-X19IaeQplEwzDEzDI6izaNVy3VPE3WvIo2yKY_ydMnSzNbGe7k0f4ef5fKngOycJxNIl-mVD6BM1dhaqcRBlkdPpeXENtNtBUuFqqPPZigsg2E_rnVogr2h2_4xQIVnv0C2raljn2lXk4o1-6b6eUDhdnwrQEL7Mdtwuxjf5t2WLWWih3ngDTdeg'
});

const bot = new HearManager();
const optionBuilder = baseBuilder.clone();

vk.updates.on('message_new', bot.middleware);

bot.hear(/групп/i, async (context) => {
    context.send('Список групп:');
    const auth = await getAuthToken();
    const value = await getSpreadSheetValues({spreadsheetId, auth, sheetName});
    context.send(JSON.stringify(value.data.values));   
});

console.log('запуск успешен')
vk.updates.start().catch(console.error)