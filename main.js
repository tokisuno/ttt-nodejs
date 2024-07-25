// Creating a working CLI version of the game
const prompt = require('prompt-sync')({sigint:true});

// https://stackoverflow.com/questions/19543514/check-whether-an-array-exists-in-an-array-of-arrays
// Method I use to compare coordinates

function Player(name, mark) {
    this.name = name;
    this.mark = mark;


    this.moved = false;
    this.score = 0;
    this.moves = [];

    this.won = false;
    this.win = function() { 
        this.score++; 
        game.score(player1, player2);
        game.main = false;
        game.cont = true;
    };
    this.checkForWin = function() {
        const length = board.length - 1;
        let count = 0;
        let playerMoves = JSON.stringify(this.moves);
        // horizontal 
        for (let row = 1; row <= length; row++) {
            for (let col = 1; col <= length; col++) {
                let coord = JSON.stringify([row,col]);
                if (playerMoves.indexOf(coord) != -1) {
                    count++;
                    if (count === 3) {
                        this.win()
                    }
                } else { count = 0; break; };
            }
            count = 0;
        }

        // vertical
        for (let col = 1; col <= length; col++) {
            for (let row = 1; row <= length; row++) {
                let coord = JSON.stringify([row,col]);
                if (playerMoves.indexOf(coord) != -1) {
                    count++;
                    if (count === 3) {
                        this.win()
                        break;
                    }
                    console.log(coord, count);
                } else { count = 0; break; };
            }
            count = 0;
        }

        // corner cases (cross)
        if (
            playerMoves.indexOf(JSON.stringify([1,1])) != -1 &&
            playerMoves.indexOf(JSON.stringify([2,2])) != -1 &&
            playerMoves.indexOf(JSON.stringify([3,3])) != -1 
        ) {
            this.win()
        } else if 
        (
            playerMoves.indexOf(JSON.stringify([1,3])) != -1 &&
            playerMoves.indexOf(JSON.stringify([2,2])) != -1 &&
            playerMoves.indexOf(JSON.stringify([3,1])) != -1 
        ) {
            this.win()
        }
    }
}

function Gameboard() {
    return [[' ', '1', '2', '3'],
            ['1', ' ', ' ', ' '],
            ['2', ' ', ' ', ' '],
            ['3', ' ', ' ', ' ']];
}

function Game() {

    this.main = true;
    this.cont = false;
    this.validInput = function (string) {
        string.split(""); 
        if (string.length !== 3) return false;

        const x = Number(string[0]);
        const y = Number(string[2]);

        const delim = string[1];

        if (delim === "-") {
            if (x != NaN && y != NaN) {
                if (x >= 1 && x <= 3 && y >= 1 && y <= 3) {
                    return true;
                }
            }
        } else { return false };
    }

    this.move = function() {
        if (player1.moved === false && player2.moved === false || player2.moved === true) {
            console.log(`${player1.name}, where would you like to move?`)
            let move = prompt("(ex. 1-1)% ");
            if (game.validInput(move) === true) {
                game.placeMove(player1, player2, move);
                return;
            }
        }

        if (player2.moved === false && player1.moved === true) {
            console.log(`${player2.name}, where would you like to move?`)
            let move = prompt("(ex. 1-1)% ");
            if (game.validInput(move) === true) {
                game.placeMove(player2, player1, move);
                return;
            }
        }
    }

    this.placeMove = function(playerMoved, playerWait, string) {
        const split = string.split("");
        const x = Number(split[0]);
        const y = Number(split[2]);

        let playerMovedString = JSON.stringify(playerMoved.moves);
        let playerWaitString = JSON.stringify(playerWait.moves);
        let move = JSON.stringify([x,y]);

        let checkp1 = playerMovedString.indexOf(move);
        let checkp2 = playerWaitString.indexOf(move);

        if (checkp1 != -1) {
            return false;
        } 
        if (checkp2 != -1) { 
            return false;
        }

        board[x][y] = `${playerMoved.mark}`

        playerMoved.moves.push.apply(playerMoved.moves, [[x,y]]);
        playerMoved.moved = true;
        playerWait.moved = false;
        console.clear();
        game.displayBoard(board);
    }

    this.displayBoard = function(board) {
        for (let i = 0; i < board.length; ++i) {
            for (let j = 0; j < board.length; ++j) {
                process.stdout.write(`[${board[i][j]}]`);
            }
            process.stdout.write('\n');
        }
    }

    this.score = function(p1, p2) {
        console.log("=== Score ===\n", `${p1.name}: ${p1.score}\n`, `${p2.name}: ${p2.score}\n`);
    }
    this.loop = true
}

// game loop
let player1 = new Player(prompt("Player 1, what is your name?: "), "X");
let player2 = new Player(prompt("Player 2, what is your name?: "), "O");

let game = new Game(player1, player2);
let board = new Gameboard();

game.displayBoard(board);

function loop(main, cont) {
    game.displayBoard;
    if (main === true && cont === false) {
        while (game.main) {
            game.move();
            player1.checkForWin();
            player2.checkForWin();
        }
    }

    if (main === false && cont === true) {
        while (game.cont) {
            let answer = prompt("Continue? [y/n]: ");
            switch (answer) {
                case "y":
                    player1.moves = [];
                    player2.moves = [];
                    player1.moved = false;
                    player2.moved = true;
                    board = new Gameboard(); 
                    game.displayBoard;
                    game.main = true;
                    game.cont = false;
                    break;
                case "n":
                    console.log("bye!");
                    return game.loop = false;
            }
        }
    }
}

while (game.loop === true) {
    loop(game.main, game.cont); 
}
