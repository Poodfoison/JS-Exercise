const fs = require('fs');

const getvote = async  () => {
    fs.readFile('./ballot.txt', 'utf-8', (err, data) => {
        let abstain = false;
        if (err || data == "") {
            console.log("Abstain.");
            abstain = true;
        }
        const currentDate = new Date();
        fs.appendFile('./log.txt', JSON.stringify(currentDate) + " " + data + "\n", (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Append successful.");
                fs.readFile('./votes.json', 'utf-8', (err, data2) => {
                    if (err) {
                        console.log(err);
                    } else {
                        let listOfVotes = JSON.parse(data2);
                        if (abstain) {
                            listOfVotes.Abstain += 1;
                        } else if (data !== "A" && data !== "B" && data !== "C") {
                            listOfVotes.Invalid += 1;
                        } else {
                            listOfVotes[data] += 1;
                        }
                        const datum = JSON.stringify(listOfVotes);
                        fs.writeFile('./votes.json', datum, (err) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log("Update successful.");
                            }
                        });
                    }
                });
            }
        });
    });
};

module.exports = getvote;


//vote: either a,b,c, or etc
//date: new Date()
//read ballot.txt
//update votes.json and log.txt







