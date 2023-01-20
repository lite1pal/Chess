let clickedFigure = "";
let nameOfFigure = "";
let isSomeFigureClicked = false;
let availableMovesY = [];
let availableMoveX = "";
let doubleMovePawn = "";
let singleMovePawn = "";

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

    for (element of document.getElementsByClassName("square")) {
        if (element.innerHTML.includes("img")) {
            squaresWithFigures.push(element.id);
        }
        else {
            squaresWithoutFigures.push(element.id);
        }
    }

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
        }
    }

    const removesAvailableMoveWithFigureOnIt = function () {
        for (move of availableMovesY) {
            if (squaresWithFigures.includes(move)) {
                availableMovesY[availableMovesY.indexOf(move)] = "";
            }
            else {
                if (move) {
                    document.getElementById(move).style.backgroundColor = "green";

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

        }
        isSomeFigureClicked = true;
    }
    // manages moving on the free squares
    else if (isSomeFigureClicked && e.target.id !== "board") {
        switch (nameOfFigure) {
            case "w-pawn":

                movingOnAvailableSquares();
                break;
            case "b-pawn":

                movingOnAvailableSquares();
                break;
        }
        isSomeFigureClicked = false;
    }
})


