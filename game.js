class Game {
    constructor(grid){
        this.grid = grid;
        this.players = [];
    }

    addPlayer(player){
        if (this.players.length < 2){
            this.players.push(player);
        } else {
            //place error here
        }
    }

    start(){
        this.players[0].isTurn = true;
        this.players[1].isTurn = false;
    }

    currentPlayerMoveOn(column){
        const player1 = this.players[0];
        const player2 = this.players[1];
        if (player1.isTurn){
            player1.playOnColumn(column)
            player1.isTurn = false;
            player2.isTurn = true;
        } else {
            player2.playOnColumn(column);
            player1.isTurn = true;
            player2.isTurn = false;
        }
    }


}

class Grid {
    constructor(rows, columns){
        this.rows = rows;
        this.columns = columns;
        this.spaces = {};
        this.createSpaces();
    }

    createSpaces(){
        const alphabet = "abcdefghijklmnopqrstuvwxyz"
        const rows = this.rows;
        const columns = this.columns;
        for (let i = 0; i < rows; i++){
            for(let j = 1; j <= columns; j++){
                this.spaces[alphabet[i] + j] = {'ball': null};
            }
        }
        
    }

    fillSpace(spaceCode, ballColor){
        this.spaces[spaceCode]['ball'] = ballColor;
    }

    clearGrid(){
        this.spaces = {};
        this.createSpaces();
    }

}

class Ball {
    constructor(color, grid){
        this.color = color;
        this.currentColumn = 1;
        this.grid = grid;
    }

    releaseBallOn(column){
        this.currentColumn = column;
        const alphabet = "abcdefghijklmnopqrstuvwxyz"
        const newColumn = this.currentColumn;
        const grid = this.grid;
        for(let i = 0; i < grid.columns; i++){
            //try to fill the first row in the given column
            if(grid.spaces[(alphabet[i] + newColumn)]["ball"] === null){
                grid.fillSpace((alphabet[i] + newColumn), this.color);
                break
            }

        }
        
    }
}

class Player {
    constructor(ball){
        this.ball = ball;
        this.isTurn = null;
    }

    playOnColumn(column){
        this.ball.releaseBallOn(column);
    }


}

const grid = new Grid(6,6);
const game = new Game(grid);
const ball1 = new Ball('blue', grid);
const ball2 = new Ball('red', grid);
const player1 = new Player(ball1);
const player2 = new Player(ball2);

game.addPlayer(player1);
game.addPlayer(player2);
game.currentPlayerMoveOn(3);
game.currentPlayerMoveOn(2);
game.currentPlayerMoveOn(1);
game.currentPlayerMoveOn(1);
console.log(grid.spaces);


