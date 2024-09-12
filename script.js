var moves = 4;
var scrNumber = 1;
var scrText;
var saved = false;

function updateMoves(movesCount) {
    moves = movesCount;
    document.getElementById('movesText').innerHTML = moves;
}

function generate() {
    saved = false;
    var moveList = ["R", "R2", "R'", "L", "L2", "L'", "U", "U2", "U'", "D", "D2", "D'", "F2", "B2"];
    var scramble = [];
    scramble[0] = "R";
    var movesLeft = moves;
    var opposites = false;
    while(--movesLeft) {
        var index = moves - movesLeft;
        scramble[index] = moveList[Math.floor(Math.random() * moveList.length)];
        if(scramble[index][0] == scramble[index - 1][0]) movesLeft++;
        else if(index == 1 && scramble[index] == "L2") movesLeft++;
        else if((scramble[index][0] == 'R' && scramble[index - 1][0] == 'L') || (scramble[index][0] == 'L' && scramble[index - 1][0] == 'R') || (scramble[index][0] == 'F' && scramble[index - 1][0] == 'B') || (scramble[index][0] == 'B' && scramble[index - 1][0] == 'F') || (scramble[index][0] == 'U' && scramble[index - 1][0] == 'D') || (scramble[index][0] == 'D' && scramble[index - 1][0] == 'U')) {
            if(opposites) movesLeft++;
            else opposites = true;
        }
        else opposites = false;
    }
    scrText = "#" + scrNumber + ": ";
    for(var move in scramble) {
        scrText += scramble[move] + " ";
    }
    document.getElementById('scramble').innerHTML = scrText;
    scrNumber++;
}

function save() {
    if(!saved && scrText) document.getElementById('savedList').innerHTML = scrText + "<br>" + document.getElementById('savedList').innerHTML;
    saved = true;
}

document.addEventListener('keydown', (e) => {
    if(e.code == "Space") generate();
    else if(e.code == "KeyS") save();
} )