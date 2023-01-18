const takenSquares = ["a-1", "b-1", "c-1", "d-1", "e-1", "g-1", "f-1", "h-1", "a-2", "b-2", "c-2", "d-2", "e-2", "g-2", "f-2", "h-2"];
let highlightedFigure = "";
let colorOfHighlightedFigure = "";

// checks if the figure is already highlighted and if it is not, changes the previous figure's color to the default one
const checksIfFigureIsHighlighted = function (parentOfTarget) {
    if (highlightedFigure.id !== parentOfTarget.id && parentOfTarget.id !== "board" && highlightedFigure !== "") {
        highlightedFigure.style.backgroundColor = "";
    }
}

const highlightsClickedFigure = function (event) {
    try {
        // will check if there is a figure on the square
        let parentOfTarget = document.getElementById(event.target.parentNode.id);
        // highlightes the picked figure
        if (parentOfTarget.classList[0].slice(0, 6) === "column") {
            checksIfFigureIsHighlighted(parentOfTarget);
            // sets the clicked figure into the highlightedFigure variable
            highlightedFigure = document.getElementById(parentOfTarget.id);
        
            //gets the backgroundColor of highlighted figure in order to set this color back when the figure is no longer highlighted
            colorOfHighlightedFigure = getComputedStyle(highlightedFigure).backgroundColor;
        
            // changes the color of the clicked figure
            document.getElementById(parentOfTarget.id).style.backgroundColor = "yellow";
            }
    }
    catch (error) {
        console.log(error);
    }
}

const movesFigure = function (event) {
    
    const clickedSquare = document.getElementById(event.target.id);

    if (clickedSquare && !takenSquares.includes(clickedSquare.id)) {
        if (highlightedFigure) {
            clickedSquare.innerHTML = highlightedFigure.innerHTML;
            delete takenSquares[takenSquares.indexOf(highlightedFigure.id)];
            takenSquares.push(clickedSquare.id);
            // console.log(takenSquares);
            highlightedFigure.innerHTML = "";
            highlightedFigure.style.backgroundColor = "";
        }
    }
}


document.getElementById("squares").addEventListener("click", highlightsClickedFigure);
document.getElementById("squares").addEventListener("click", movesFigure);


        // if (highlightedFigure !== currentFigure) {
        //     if (document.getElementById(currentFigure).innerHTML) {
        //         document.getElementById(currentFigure).style.backgroundColor = 'yellow';
        //     }
        //     if (highlightedFigure) {
        // colorOfHighlightedFigure = getComputedStyle(document.getElementsByClassName(document.getElementById(highlightedFigure).classList[0])[0]).backgroundColor;
        //         console.log(getComputedStyle(document.getElementsByClassName(document.getElementById(highlightedFigure).classList[0])[0]).backgroundColor);
        //         document.getElementById(highlightedFigure).style.backgroundColor = colorOfHighlightedFigure;
        //     }
    

    // changes location of the figure
    // else {
    //     if (currentFigure) {
    //         currentTarget.innerHTML = document.getElementById(currentFigure).innerHTML;
    //         document.getElementById(highlightedFigure).style.backgroundColor = colorOfHighlightedFigure;
    //         document.getElementById(currentFigure).innerHTML = "";

    //     }
    // })
