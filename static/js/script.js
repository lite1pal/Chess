let clickedFigure = "";
let nameOfFigure = "";
let isSomeFigureClicked = false;
let availableMoveY = "";
let availableMoveX = "";
const charsInNumbers = {
    "a": 1,
    "b": 2,
    "c": 3,
    "d": 4,
    "e": 5,
    "g": 6,
    "f": 7,
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
        if (e.target.id === availableMoveY) {
            document.getElementById(clickedFigure).style.backgroundColor = "";
            document.getElementById(e.target.id).innerHTML = document.getElementById(clickedFigure).innerHTML;
            document.getElementById(clickedFigure).innerHTML = "";
            document.getElementById(availableMoveY).style.backgroundColor = "";
        }
    }

    const removesAvailableMoveWithFigureOnIt = function () {
        if (squaresWithFigures.includes(availableMoveY)) {
            availableMoveY = "";
        }
        else {
            document.getElementById(availableMoveY).style.backgroundColor = "green";

        }
    }

    // manages highlighting
    if (squaresWithFigures.includes(e.target.parentNode.id)) {
        // removes highlighting from the previous figure if the clicked figure is different
        if (clickedFigure && clickedFigure !== e.target.parentNode) {
            document.getElementById(clickedFigure).style.backgroundColor = "";

            if (availableMoveY) {
                document.getElementById(availableMoveY).style.backgroundColor = "";
            }
        }

        // highlights figure if it was clicked
        clickedFigure = e.target.parentNode.id;
        nameOfFigure = e.target.id;
        document.getElementById(clickedFigure).style.backgroundColor = "red";

        switch (e.target.id) {
            case "w-pawn":
                availableMoveY = e.target.parentNode.id.slice(0, 2) + (parseInt(e.target.parentNode.id[2]) + 1).toString();
                removesAvailableMoveWithFigureOnIt();
                break;
            case "b-pawn":
                availableMoveY = e.target.parentNode.id.slice(0, 2) + (parseInt(e.target.parentNode.id[2]) - 1).toString();
                removesAvailableMoveWithFigureOnIt();
                break;

        }
        console.log(availableMoveY)
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
    }
})
