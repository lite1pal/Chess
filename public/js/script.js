let clickedFigure = "";
let nameOfFigure = "";
let isSomeFigureClicked = false;
let moveWasDone = false;
let availableMoves = [];
let doubleMovePawn = "";
let singleMovePawn = "";
let whoseMove = "w";
let charInNumber = 0;
let knightMoves = [];
let moveKnightX = "";
let moveKnightY = "";
let attackingMoves = [];
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
    // loops through squares to find taken and untaken ones
    const squaresWithFigures = [];
    const squaresWithoutFigures = [];
    const squaresWithWhiteFigures = [];
    const squaresWithBlackFigures = [];

    for (element of document.getElementsByClassName("square")) {
        if (element.innerHTML.includes("img")) {
            squaresWithFigures.push(element.id);
            if (element.innerHTML.includes('id="w-')) {
                squaresWithWhiteFigures.push(element.id);
            }
            else if (element.innerHTML.includes('id="b-')) {
                squaresWithBlackFigures.push(element.id);
            }
        }
        else {
            squaresWithoutFigures.push(element.id);
        }
    }

    // functions
    const removesHighlightOnPreviousFigure = function () {
        if (clickedFigure && clickedFigure !== e.target.parentNode) {
            changeElementColorById(clickedFigure);
        }
    }

    const clearAvailableMoves = function () {
        for (move of availableMoves) {
            if (move) {
                changeElementColorById(move);
                availableMoves[availableMoves.indexOf(move)] = "";
            }
        }
        availableMoves = [];
        attackingMoves = [];
    }

    const changeElementColorById = function (id, color = "") {
        document.getElementById(id).style.backgroundColor = color;
    }

    const movingOnAvailableSquares = function () {
        if (availableMoves.includes(e.target.id) || attackingMoves.includes(e.target.parentNode.id)) {

            // moves the figure and removes it from the previous square
            if (attackingMoves.includes(e.target.parentNode.id)) {
                document.getElementById(e.target.parentNode.id).innerHTML = document.getElementById(clickedFigure).innerHTML;
            }
            else {
                document.getElementById(e.target.id).innerHTML = document.getElementById(clickedFigure).innerHTML;
            }
            document.getElementById(clickedFigure).innerHTML = "";
            clickedFigure = "";
            // removes all available moves since the move was done
            for (move of availableMoves) {
                if (move) {
                    changeElementColorById(move);
                    availableMoves[availableMoves.indexOf(move)] = "";

                }
            }

            moveWasDone = true;
        }

        else {

            moveWasDone = false;

        }

    }

    const removesAvailableMoveWithFriendlyFigureOnIt = function (move) {

    }

    const showsAvailableMoves = function () {
        for (move of availableMoves) {
            changeElementColorById(move, "#8FBC8F");
        }
    }

    const removesAvailableMoveWithFigureOnIt = function (isPawn = false) {
        for (move of availableMoves) {
            if (squaresWithFigures.includes(move)) {
                if (isPawn) {
                    availableMoves[availableMoves.indexOf(move)] = "";
                }
                else {
                    changeElementColorById(move, "yellow");
                }
            }
            else {
                if (move) {
                    changeElementColorById(move, "#8FBC8F");
                }
            }
        }
    }

    const controlsPawnMove = function (doubleMove, singleMove, startPlace, peakMove) {
        doubleMovePawn = e.target.parentNode.id.slice(0, 2) + (parseInt(e.target.parentNode.id[2]) + doubleMove).toString();
        singleMovePawn = e.target.parentNode.id.slice(0, 2) + (parseInt(e.target.parentNode.id[2]) + singleMove).toString();
        if (parseInt(e.target.parentNode.id[2]) === startPlace) {
            if (!squaresWithFigures.includes(singleMovePawn)) {
                availableMoves.push(singleMovePawn, doubleMovePawn);
            }
        }
        else if (!availableMoves.includes(singleMovePawn) && singleMovePawn[2] !== peakMove) {
            availableMoves.push(singleMovePawn);
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

    const controlsKnightMove = function (opponent) {
        knightMoves = [getMoveKnight(-1, 2), getMoveKnight(-2, 1), getMoveKnight(1, 2), getMoveKnight(2, 1), getMoveKnight(-1, -2), getMoveKnight(1, -2), getMoveKnight(-2, -1), getMoveKnight(2, -1)];
        for (move of knightMoves) {
            if (squaresWithoutFigures.includes(move) || opponent.includes(move)) {
                if (opponent.includes(move)) {
                    attackingMoves.push(move);
                }
                availableMoves.push(move);
            }
        }
    }

    const getMinNumberInArray = function (array) {
        return array.reduce((a, b) => Math.min(a, b));
    }

    const getMaxNumberInArray = function (array) {
        return array.reduce((a, b) => Math.max(a, b));
    }

    const sortArray = function (array) {
        return array.sort(function (a, b) {
            return a - b;
        });
    }

    const controlsRookMoveY = function (opponent) {
        let figuresRookCanBeatY = [];
        let figureAboveRook = "";
        let figureBelowRook = "";

        // pushes squares with figures that can be potentially attacked by the rook to figuresRookCanBeat
        // p.s. it pushes only digits of figure's id
        for (figure of opponent) {
            if (figure[0] === clickedFigure[0]) {
                figuresRookCanBeatY.push(parseInt(figure[2]));
            }
        }

        // sorts nums in array from low to high
        sortArray(figuresRookCanBeatY);

        // finds out for sure figures which can be attacked by the rook
        for (num of figuresRookCanBeatY) {
            if (parseInt(clickedFigure[2]) > num) {
                figureBelowRook = clickedFigure[0] + "-" + num.toString();
            }
            else if (parseInt(clickedFigure[2]) < num) {
                figureAboveRook = clickedFigure[0] + "-" + num.toString();
                break;
            }
        }

        if (figureBelowRook) {
            availableMoves.push(figureBelowRook);
            attackingMoves.push(figureBelowRook);
        }

        if (figureAboveRook) {
            availableMoves.push(figureAboveRook);
            attackingMoves.push(figureAboveRook);
        }

        // adds empty squares between rook and its targets to availableMoves
        for (move of squaresWithoutFigures) {
            if (move[0] === clickedFigure[0]) {
                availableMoves.push(move);
            }
        }
    }

    const controlsRookMoveX = function (opponent) {
        let figuresRookCanBeatX = [];
        let figureLeftRook = "";
        let figureRightRook = "";

        for (figure of opponent) {
            console.table(figure[2], clickedFigure[2])
            if (figure[2] === clickedFigure[2]) {
                figuresRookCanBeatX.push(figure[0]);
            }
        }

        console.log(figuresRookCanBeatX);
    }
    // main

    removesHighlightOnPreviousFigure();
    // manages highlighting
    if (squaresWithFigures.includes(e.target.parentNode.id) && attackingMoves.length < 1) {

        clearAvailableMoves();

        // highlights the clicked figure
        clickedFigure = e.target.parentNode.id;
        nameOfFigure = e.target.id;
        changeElementColorById(clickedFigure, "red");

        switch (nameOfFigure) {
            case "w-pawn":
                if (whoseMove === "w") {
                    controlsPawnMove(2, 1, 2, "9");
                    showsAvailableMoves();
                }
                break;
            case "b-pawn":
                if (whoseMove === "b") {
                    controlsPawnMove(-2, -1, 7, "0");
                    showsAvailableMoves();
                }
                break;
            case "w-knight":
                if (whoseMove === "w") {
                    controlsKnightMove(squaresWithBlackFigures);
                    showsAvailableMoves();
                }
                break;
            case "b-knight":
                if (whoseMove === "b") {
                    controlsKnightMove(squaresWithWhiteFigures);
                    showsAvailableMoves();
                }
                break;
            case "w-rook":
                if (whoseMove === "w") {
                    controlsRookMoveY(squaresWithBlackFigures);
                    controlsRookMoveX(squaresWithBlackFigures);
                    showsAvailableMoves();
                }
                break;
        }
        // console.log(attackingMoves)
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
        clearAvailableMoves();
        isSomeFigureClicked = false;
    }
})