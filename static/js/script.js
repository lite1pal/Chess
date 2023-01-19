let clickedFigure = "";
let nameOfFigure = "";
let isSomeFigureClicked = false;
let availableMove = "";

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
        if (e.target.id === availableMove) {
            document.getElementById(clickedFigure).style.backgroundColor = "";
            document.getElementById(e.target.id).innerHTML = document.getElementById(clickedFigure).innerHTML;
            document.getElementById(clickedFigure).innerHTML = "";
            document.getElementById(availableMove).style.backgroundColor = "";
        }
    }

    // manages highlighting
    if (squaresWithFigures.includes(e.target.parentNode.id)) {
        // removes highlighting from the previous figure if the clicked figure is different
        if (clickedFigure && clickedFigure !== e.target.parentNode) {
            document.getElementById(clickedFigure).style.backgroundColor = "";
            document.getElementById(availableMove).style.backgroundColor = "";
        }

        // highlights figure if it was clicked
        clickedFigure = e.target.parentNode.id;
        nameOfFigure = e.target.id;
        document.getElementById(clickedFigure).style.backgroundColor = "red";

        switch (e.target.id) {
            case "w-pawn":
                availableMove = e.target.parentNode.id.slice(0, 2) + (parseInt(e.target.parentNode.id[2]) + 1).toString();
                document.getElementById(availableMove).style.backgroundColor = "green";
        }

        isSomeFigureClicked = true;
    }

    // manages moving on the free squares
    else if (isSomeFigureClicked && e.target.id !== "board") {
        switch (nameOfFigure) {
            case "w-pawn":
                movingOnAvailableSquares();
                break;
        }
    }
})
