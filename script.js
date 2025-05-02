const body = document.querySelector("body");
const playerDisplay = document.querySelectorAll(".display")[0];
const computerDisplay = document.querySelectorAll(".display")[1];
const options = document.querySelectorAll(".option");
const div = document.createElement("div");

// Make the countdown div
const countdownDiv = document.createElement("div");
body.appendChild(countdownDiv);
countdownDiv.style.width = "20%";
countdownDiv.style.height = "20%";
countdownDiv.style.backgroundColor = "black";
countdownDiv.style.position = "fixed";
countdownDiv.style.top = "0";
countdownDiv.style.left = "0";
countdownDiv.style.zIndex = "9999";
countdownDiv.style.display = "flex";
countdownDiv.style.justifyContent = "center";
countdownDiv.style.alignItems = "center";
countdownDiv.style.color = "white";
countdownDiv.style.fontSize = "50px";
countdownDiv.style.display = "none"; // Hide initially

let playerScore = 0;
let computerScore = 0;

options.forEach((option) => {
    option.addEventListener("click", () => {
        const playerChoice = getChoiceFromBackground(option.style.backgroundImage);
        // playerDisplay.src = `./../images/rock_hand_shake.gif`;
        // computerDisplay.src = `./../images/robot_rock_hand_shake.gif`;
        startCountdown(() => {
            let computerChoice = getRandomChoice();
            computerDisplay.src = `./../images/${computerChoice}c.png`;
            playerDisplay.src = `./../images/${playerChoice}.png`;
            const winner = determineWinner(playerChoice, computerChoice);
            if (winner === "player") {
                playerScore++;
            }
            if (winner === "computer") {
                computerScore++;
            }
            showResult(winner);
        });
    });
});
// Start countdown function
function startCountdown(callback) {
    let count = 3;
    countdownDiv.style.display = "flex"; 
    countdownDiv.innerHTML = count;

    const intervalId = setInterval(() => {
        count--;
        if (count > 0) {
            countdownDiv.innerHTML = count;
        } else {
            clearInterval(intervalId);
            countdownDiv.style.display = "none";
            callback();
        }
    }, 1000);
}

// Helper to get choice name from style background
function getChoiceFromBackground(bg) {
    if (bg.includes("rock")) return "rock";
    if (bg.includes("paper")) return "paper";
    if (bg.includes("scissors")) return "scissors";
}

const choices = ["rock", "paper", "scissors"];


// Get random choice
function getRandomChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Determine winner
function determineWinner(player, computer) {
    if (player === computer) return "draw";
    if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {
        return "player";
    } else {
        return "computer";
    }
}

// Show result
function showResult(winner) {
    let resultText = "";

    if (winner === "draw") resultText = "It's a Draw!";
    else if (winner === "player") resultText = "You Win!";
    else resultText = "You Lose!";

    // If result div not exist, create it
    let resultDiv = document.querySelector(".result");
    resultDiv.innerHTML = `
        <p>${resultText}</p>
        <p>Player: ${playerScore} | Computer: ${computerScore}</p>
    `;
}