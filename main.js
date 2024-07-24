// Creating a working CLI version of the game
const prompt = require('prompt-sync')({sigint:true});

function Player(name, mark) {
    this.name = name;
    this.mark = mark;

    this.moved = false;
    this.score = 0;
    this.moves = [];
    this.moveCounter = 0;

    this.win = function() { return this.score++; };
    this.getScore = function() { return this.score; };

    this.moveInc = function() { return this.moveCounter++; };
    this.getCounter = function() { return this.moveCounter ; };
}



function Gameboard() {
    return [[' ', '1', '2', '3'],
            ['1', ' ', ' ', ' '],
            ['2', ' ', ' ', ' '],
            ['3', ' ', ' ', ' ']];
}

function Game() {
    this.state = true;;

    this.validInput = function (p1, p2, string) {
        string.split(""); 
        if (string.length !== 3) return false;

        const x = Number(string[0]);
        const y = Number(string[2]);
        const delim = string[1];

        if (delim === "-") {
            if (x != NaN && y != NaN) {
                if (x >= 1 && x <= 3 && y >= 1 && y <= 3) {
                    if (p1.moves.includes(string)) return false; 
                    if (p2.moves.includes(string)) return false;
                    return true;
                }
            }
        } else { return false };
    }

    this.move = function() {
        if (player1.moved === false && player2.moved === false || player2.moved === true) {
            console.log(`${player1.name}, where would you like to move?`)
            let move = prompt("(ex. 1-1)% ");
            if (game.validInput(player1, player2, move) === true) {
                game.placeMove(player1, player2, move);
            }
        }

        if (player2.moved === false && player1.moved === true) {
            console.log(`${player2.name}, where would you like to move?`)
            let move = prompt("(ex. 1-1)% ");
            if (game.validInput(player1, player2, move) === true) {
                game.placeMove(player2, player1, move);
            }
        }
    }

    this.placeMove = function(playerMoved, playerWait, move) {
        const split = move.split("");
        const x = Number(split[2]);
        const y = Number(split[0]);

        board[x][y] = `${playerMoved.mark}`

        playerMoved.moves.push(move);
        playerMoved.moved = true;
        playerWait.moved = false;
        game.displayBoard(board);
    }

    this.displayBoard = function(board) {
        console.clear();
        for (let i = 0; i < board.length; ++i) {
            for (let j = 0; j < board.length; ++j) {
                process.stdout.write(`[${board[i][j]}]`);
            }
            process.stdout.write('\n');
        }
    }

    this.displayScore = function(p1, p2) {
        console.log("=== Score ===\n", `${p1.name}: ${p1.score}\n`, `${p2.name}: ${p2.score}\n`);
    }
}

// game loop
let player1 = new Player("lucas", "X");
let player2 = new Player("ash", "O");

let game = new Game(player1, player2);
let board = new Gameboard();

game.displayBoard(board);
game.displayScore(player1, player2);

while (game.state) {
    game.move();
}
