// Creating a working CLI version of the game
const prompt = require('prompt-sync')({sigint:true});

function gameboard() {
    function validInput(p1, p2, string) {

        string.split(""); 
        if (string.length !== 3) return false;

        const x = Number(string[0]);
        const y = Number(string[2]);
        const delim = string[1];

        if (delim === ":") {
            if (x != NaN && y != NaN) {
                if (x >= 1 && x <= 3 && y >= 1 && y <= 3) {
                    if (p1.moves.includes(string)) return false; 
                    if (p2.moves.includes(string)) return false;
                    return true;
                }
            }
        } else { return false };
    }
    function createPlayer() {
        const name = prompt("What is your name?: ");
        let score = 0;
        let moves = [];
        const win = () => score++;
        const getScore = () => score;
        let marker = '';
        let moved = false;

        return { name, moves, score, win, getScore, marker, moved };
    }

    function createGame() {
        let gameboard = [[['[ ]'], ['[ ]'], ['[ ]']],
                         [['[ ]'], ['[ ]'], ['[ ]']],
                         [['[ ]'], ['[ ]'], ['[ ]']]];

        return { gameboard };
    }
    function displayBoard(p1, p2) {
        console.log(" 1   2   3 ");
        for (let i = 0; i < board.gameboard.length; ++i) {
            for (let j = 0; j < board.gameboard.length; ++j) {
                process.stdout.write(`${board.gameboard[i][j]} `);
            }
            console.log(`${i+1}`);
        }
        console.log(`
 === Score ===
${p1.name}: ${p1.score}
${p2.name}: ${p2.score}`);
    }
    return { createGame, createPlayer, displayBoard, validInput };
}

let game = gameboard();

let run = true;
let player1 = game.createPlayer();
let player2 = game.createPlayer();
let board = game.createGame();

game.displayBoard(player1, player2);

while (run) {
    if (player1.moved === false && player2.moved === false || player2.moved === true) {
        console.log(`${player1.name}, where would you like to move?`)
        let move = prompt("Ex. 1:1: ");
        if (game.validInput(player1, player2, move) === true) {
            console.log(game.validInput(player1, player2, move));
            player1.moves.push(move);
            player1.moved = true;
            player2.moved = false;
        }
    }

    if (player2.moved === false && player1.moved === true) {
        console.log(`${player2.name}, where would you like to move?`)
        let move = prompt("Ex. 1:1: ");
        if (game.validInput(player1, player2, move) === true) {
            console.log(game.validInput(player1, player2, move));
            player2.moves.push(move);
            player1.moved = false;
            player2.moved = true;
        }
    }
}
