let player = "circle";
let gameFinished = false;
const result = document.querySelector(".result");

const wins = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],

    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],

    [1, 5, 9],
    [3, 5, 7],
];

document.querySelectorAll(".cell").forEach((cell) =>
    cell.addEventListener("click", (e) => {
        // Check if game is finsihed or not:
        if (gameFinished) return;

        //  Check if something is already present in that cell:
        if (cell.children.length == 1) {
            return;
        }

        const playerMark = document.createElement("div");
        playerMark.classList.add(player);

        cell.appendChild(playerMark);

        calculatePositions();
        changePlayer();
    })
);

function calculatePositions() {
    const circles = document.querySelectorAll(".circle");
    const crosses = document.querySelectorAll(".cross");

    let circlePositions = [];
    let crossPositions = [];

    circles.forEach((circle) =>
        circlePositions.push(
            Number(circle.parentElement.getAttribute("data-address"))
        )
    );

    crosses.forEach((cross) =>
        crossPositions.push(
            Number(cross.parentElement.getAttribute("data-address"))
        )
    );

    if (circlePositions.length >= 3 || crossPositions.length >= 3) {
        const circleResult = determineWinner("circle", circlePositions);
        const crossResult = determineWinner("cross", crossPositions);

        // console.log(circleResult);
        // console.log(crossResult);

        if (!circleResult && !crossResult) return;
        else if (circleResult) announceResult("circle");
        else if (crossResult) announceResult("cross");

        gameFinished = true;
    }
}

function announceResult(player) {
    result.textContent = `${player} won !!!`;
}

function determineWinner(playerName, playerPositions) {
    const won = wins
        .map((win) => {
            return win.every((value) => playerPositions.includes(value));
        })
        .some((value) => value === true);

    // console.log(won);
    return `${won ? playerName : ""}`;
}

function changePlayer() {
    if (player === "circle") player = "cross";
    else player = "circle";
}
