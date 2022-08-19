var fs = require('fs');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

function keplerLuxmore() {
    const file = fs.readFileSync('./data.txt', 'utf8');
    const dates = file.match(/Luxmore Hut is open on \d{2}\/\d{2}\/\d{4}. Total available is \d{1,2}/gm);
    const filtered = dates.map(x => x.split('Luxmore Hut is open on ')[1].split('. Total available is ')).filter(x => x[1] !== "0");
    console.log(filtered);
    return filtered;
}

async function main() {
    const data = keplerLuxmore();
    await sendDataToTwilio(data)
}

async function sendDataToTwilio(data) {
    client.messages.create({
        body: data,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: process.env.MY_PHONE_NUMBER
    });
}

main();


