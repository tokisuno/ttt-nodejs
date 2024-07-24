// Creating a working CLI version of the game
const prompt = require('prompt-sync')({sigint:true});

function gameboard() {
    function move(playerMoved, playerWait, move) {
        const split = move.split("");
        const x = Number(split[2]);
        const y = Number(split[0]);

        board.gameboard[x][y] = `${playerMoved.marker}`

        playerMoved.moves.push(move);
        playerMoved.moved = true;
        playerWait.moved = false;
        game.displayBoard(player1, player2);
    }

    function validInput(p1, p2, string) {
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
    function checkWinCondition(mark) {
        let count = 0;
    }

    function createPlayer(marker) {
        const name = prompt("What is your name?: ");
        let score = 0;
        let moves = [];
        const win = () => score++;
        const getScore = () => score;
        let moved = false;

        return { name, score, win, getScore, marker, moves, moved };
    }

    function createGame() {
        let gameboard = [[' ', '1', '2', '3'],
                         ['1', ' ', ' ', ' '],
                         ['2', ' ', ' ', ' '],
                         ['3', ' ', ' ', ' ']];
        return { gameboard };
    }
    function displayBoard() {
        console.clear();
        for (let i = 0; i < board.gameboard.length; ++i) {
            for (let j = 0; j < board.gameboard.length; ++j) {
                process.stdout.write(`[${board.gameboard[i][j]}]`);
            }
            process.stdout.write('\n');
        }
    }
    function displayScore(p1, p2) {
        console.log("=== Score ===\n", `${p1.name}: ${p1.score}\n`, `${p2.name}: ${p2.score}\n`);
    }
    return { createGame, createPlayer, checkWinCondition, displayBoard, displayScore, validInput, move };
}

// game loop
let run = true;

let game = gameboard();
let player1 = game.createPlayer('X');
let player2 = game.createPlayer('O');
let board = game.createGame();

game.displayBoard();
game.displayScore(player1, player2);

while (run) {
    if (player1.moves.length >= 3) {
        game.checkWinCondition(player1.marker); 
    }

    if (player1.moved === false && player2.moved === false || player2.moved === true) {
        console.log(`${player1.name}, where would you like to move?`)
        let move = prompt("(ex. 1-1)% ");
        if (game.validInput(player1, player2, move) === true) {
            game.move(player1, player2, move);
        }
    }

    if (player2.moved === false && player1.moved === true) {
        console.log(`${player2.name}, where would you like to move?`)
        let move = prompt("(ex. 1-1)% ");
        if (game.validInput(player1, player2, move) === true) {
            game.move(player2, player1, move);
        }
    }
}
