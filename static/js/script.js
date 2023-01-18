class Figure {
    constructor(title, place) {
        this.title = title;
        this.place = document.getElementById(place);
    }
}

class Queen extends Figure {
    constructor(title, place, movements, image) {
        super(title, place);
        this.movements = movements;
        this.image = image;
    }
}

let wQueen = new Queen("w_queen", "d-1", "", "");
let curLog = "";

document.addEventListener("click", function (event) {
    if (event.target.parentNode.id !== "board") {
        curLog = event.target.parentNode.id;
    }
    else {
        if (curLog) {
            document.getElementById(event.target.id).innerHTML = document.getElementById(curLog).innerHTML;
        }
    }

    // console.log(event.target.parentNode.id);
})
