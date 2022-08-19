var fs = require('fs');

function keplerLuxmore() {
    const file = fs.readFileSync('./data.txt', 'utf8');
    const dates = file.match(/Luxmore Hut is open on \d{2}\/\d{2}\/\d{4}. Total available is \d{1,2}/gm);
    const filtered = dates.map(x => x.split('Luxmore Hut is open on ')[1].split('. Total available is ')).filter(x => x[1] !== "0");
    console.log(filtered);
}

async function main() {
    keplerLuxmore();
}

main();


