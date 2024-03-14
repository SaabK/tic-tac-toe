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

    if (circlePositions.length >= 3 || crossPositions.length >= 3)
        result.textContent = determineWinner(circlePositions, crossPositions);
}

function announceResult(player) {
    result.textContent = `${player} won !!!`;
}

function determineWinner(circlePositions, crossPositions) {
    const circleResult = wins
        .map((win) => {
            return win.every((value) => circlePositions.includes(value));
        })
        .some((value) => value === true);

    const crossResult = wins
        .map((win) => {
            return win.every((value) => crossPositions.includes(value));
        })
        .some((value) => value === true);

    if (!circleResult && !crossResult) return;

    gameFinished = true;

    return circleResult ? "Circle Wins !!!" : "Cross Wins !!!";
}

function changePlayer() {
    if (player === "circle") player = "cross";
    else player = "circle";
}
