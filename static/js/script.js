let clickedFigure = "";
let nameOfFigure = "";
let isSomeFigureClicked = false;
let moveWasDone = false;
let availableMovesY = [];
let availableMovesX = [];
let doubleMovePawn = "";
let singleMovePawn = "";
let whoseMove = "w";
let charInNumber = 0;
let knightMoves = [];
let moveKnightX = "";
let moveKnightY = "";
let rookMoves = [];
let rookMovesYdown = [];
let rookMovesYup = [];
let rookMovesY = [];

const charsInNumbers = {
    "a": 1,
    "b": 2,
    "c": 3,
    "d": 4,
    "e": 5,
    "f": 6,
    "g": 7,
    "h": 8
}

document.querySelector("#board").addEventListener("click", function (e) {
    // loops through squares to find taken ones
    const squaresWithFigures = [];
    const squaresWithoutFigures = [];
    let allFigures = [];

    for (element of document.getElementsByClassName("square")) {
        if (element.innerHTML.includes("img")) {
            squaresWithFigures.push(element.id);
        }
        else {
            squaresWithoutFigures.push(element.id);
        }
    }

    allFigures = squaresWithFigures.concat(squaresWithoutFigures);

    // functions
    const movingOnAvailableSquares = function () {
        if (availableMovesY.includes(e.target.id)) {
            document.getElementById(clickedFigure).style.backgroundColor = "";
            document.getElementById(e.target.id).innerHTML = document.getElementById(clickedFigure).innerHTML;
            document.getElementById(clickedFigure).innerHTML = "";
            for (move of availableMovesY) {
                if (move) {
                    document.getElementById(move).style.backgroundColor = "";
                    availableMovesY[availableMovesY.indexOf(move)] = "";
                }
            }
            moveWasDone = true;
        }
        else {
            moveWasDone = false;
        }

    }

    const removesAvailableMoveWithFigureOnIt = function () {
        for (move of availableMovesY) {
            if (squaresWithFigures.includes(move)) {
                availableMovesY[availableMovesY.indexOf(move)] = "";
            }
            else {
                if (move) {
                    document.getElementById(move).style.backgroundColor = "#8FBC8F";

                }

            }
        }
    }

    const controlsPawnFirstMove = function (doubleMove, singleMove, startPlace, peakMove) {
        doubleMovePawn = e.target.parentNode.id.slice(0, 2) + (parseInt(e.target.parentNode.id[2]) + doubleMove).toString();
        singleMovePawn = e.target.parentNode.id.slice(0, 2) + (parseInt(e.target.parentNode.id[2]) + singleMove).toString();
        if (parseInt(e.target.parentNode.id[2]) === startPlace) {
            if (!squaresWithFigures.includes(singleMovePawn)) {
                availableMovesY.push(singleMovePawn, doubleMovePawn);
            }
        }
        else if (!availableMovesY.includes(singleMovePawn) && singleMovePawn[2] !== peakMove) {
            availableMovesY.push(singleMovePawn);
        }
    }

    const changesMoveSide = function (side) {
        if (moveWasDone) {
            if (side === "w") {
                whoseMove = "b";
                document.getElementById("side").innerHTML = "Black moves";
            }
            else if (side === "b") {
                whoseMove = "w";
                document.getElementById("side").innerHTML = "White moves";
            }
        }
    }

    const getKeyByValue = function (object, value) {
        for (key of Object.keys(object)) {
            if (object[key] === value) {
                return key;
            }

        }
    }

    const getMoveKnight = function (x, y) {
        moveKnightX = getKeyByValue(charsInNumbers, parseInt(charsInNumbers[clickedFigure[0]]) + x);
        moveKnightY = parseInt(clickedFigure[2]) + y;
        return moveKnightX + "-" + moveKnightY;

    }

    const controlsKnightMove = function () {
        knightMoves = [getMoveKnight(-1, 2), getMoveKnight(-2, 1), getMoveKnight(1, 2), getMoveKnight(2, 1), getMoveKnight(-1, -2), getMoveKnight(1, -2), getMoveKnight(-2, -1), getMoveKnight(2, -1)];
        for (move of knightMoves) {
            if (!squaresWithFigures.includes(move) && squaresWithoutFigures.includes(move)) {
                availableMovesY.push(move);
            }
        }
    }

    // const getRookMoves = function () {
    // }

    const controlsRookMove = function () {
        rookMovesYdown = squaresWithoutFigures.filter(el => parseInt(el[2]) < parseInt(clickedFigure[2]) && el.includes(clickedFigure[0]));
        rookMovesYup = squaresWithoutFigures.filter(el => parseInt(el[2]) > parseInt(clickedFigure[2]) && el.includes(clickedFigure[0]));
        // rookMovesY = allFigures.filter(el => el.includes(clickedFigure[0]));
        console.log(rookMovesYdown)
        for (let i = 0; i < rookMovesYdown.length; i++) {
            try {
                if (parseInt(rookMovesYdown[i][2]) - parseInt(rookMovesYdown[i - 1][2]) < -1) {
                    delete rookMovesYdown[i];
                }
            }
            catch (error) {

            }
        }

        // for (let i = 0; i > squaresWithoutFigures.length; i++) {
        //     if (parseInt(squaresWithoutFigures[i][2]) - parseInt(squaresWithoutFigures[i - 1][2]) > 1) {
        //         break;
        //     }
        //     else if (squaresWithoutFigures[i].includes(clickedFigure[2])) {
        //         rookMovesY.push(squaresWithoutFigures[i]);
        //     }
        // }

        // rookMoves = rookMovesX.concat(rookMovesY);

        for (move of rookMovesYdown) {
            if (squaresWithoutFigures.includes(move)) {
                availableMovesY.push(move);
            }

        }

    }

    // manages highlighting
    if (squaresWithFigures.includes(e.target.parentNode.id)) {
        // removes highlighting from the previous figure if the clicked figure is different
        if (clickedFigure && clickedFigure !== e.target.parentNode) {
            document.getElementById(clickedFigure).style.backgroundColor = "";

            for (move of availableMovesY) {
                if (move) {
                    document.getElementById(move).style.backgroundColor = "";
                    availableMovesY[availableMovesY.indexOf(move)] = "";
                }
            }
        }

        // highlights figure if it was clicked
        clickedFigure = e.target.parentNode.id;
        nameOfFigure = e.target.id;
        document.getElementById(clickedFigure).style.backgroundColor = "red";

        switch (e.target.id) {
            case "w-pawn":
                controlsPawnFirstMove(2, 1, 2, "9");
                removesAvailableMoveWithFigureOnIt();
                break;
            case "b-pawn":
                controlsPawnFirstMove(-2, -1, 7, "0");
                removesAvailableMoveWithFigureOnIt();
                break;
            case "w-knight":
                controlsKnightMove();
                removesAvailableMoveWithFigureOnIt();
                break;
            case "b-knight":
                controlsKnightMove();
                removesAvailableMoveWithFigureOnIt();
                break;
            case "w-rook":
                controlsRookMove();
                removesAvailableMoveWithFigureOnIt();
        }
        isSomeFigureClicked = true;
    }
    // manages moving on the free squares
    else if (isSomeFigureClicked && e.target.id !== "board") {
        switch (nameOfFigure) {
            case "w-pawn":
                if (whoseMove === "w") {
                    movingOnAvailableSquares();
                    changesMoveSide(whoseMove);
                }
                break;
            case "b-pawn":
                if (whoseMove === "b") {
                    movingOnAvailableSquares();
                    changesMoveSide(whoseMove);
                }
                break;
            case "w-knight":
                if (whoseMove === "w") {
                    movingOnAvailableSquares();
                    changesMoveSide(whoseMove);
                }
                break;
            case "b-knight":
                if (whoseMove === "b") {
                    movingOnAvailableSquares();
                    changesMoveSide(whoseMove);
                }
                break;
            case "w-rook":
                if (whoseMove === "w") {
                    movingOnAvailableSquares();
                    changesMoveSide(whoseMove);
                }
        }
        isSomeFigureClicked = false;
    }
})