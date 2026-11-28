
// ================================
// Game Configuration
// ================================

const defaultColours = [
    { name: "Red", value: "#FF5C5C" },
    { name: "Orange", value: "#FFA64D" },
    { name: "Yellow", value: "#FFE066" },
    { name: "Green", value: "#65D98A" },
    { name: "Blue", value: "#5C9DFF" },
    { name: "Purple", value: "#B58AFF" }
];

// ================================
// Current Guess
// ================================

const codeLength = 4;

let currentGuess = Array(codeLength).fill(null);
let activePegIndex = 0;


// ================================
// Colour Picker
// ================================

const colourOptions = document.querySelector("#colourOptions");

function renderColourOptions(colours) {

    if (!colourOptions) {
        return;
    }

    colourOptions.innerHTML = "";

    colours.forEach(colour => {

        const button = document.createElement("button");

        button.className = "colour-option";
        button.type = "button";
        button.dataset.color = colour.name.toLowerCase();
        button.setAttribute("aria-label", colour.name);
        button.style.backgroundColor = colour.value;

        colourOptions.appendChild(button);
    });
}

renderColourOptions(defaultColours);



// ================================
// Guess History
// ================================

const guessList = document.querySelector("#guessList");

const totalAttempts = 10;

function renderGuessRows() {

    if (!guessList) {
        return;
    }

    guessList.innerHTML = "";

    for (let attempt = 1; attempt <= totalAttempts; attempt++) {

        const row = document.createElement("div");
        row.className = attempt === 1
            ? "guess-row active"
            : "guess-row";

        // Attempt number
        const number = document.createElement("span");
        number.textContent = attempt;

        // Guess pegs
        const guessPegs = document.createElement("div");
        guessPegs.className = "guess-pegs";

        for (let i = 0; i < 4; i++) {
            const peg = document.createElement("button");

            peg.className = "guess-peg";
            peg.type = "button";
            peg.dataset.index = i;
            peg.setAttribute("aria-label", `Guess slot ${i + 1}`);

            guessPegs.appendChild(peg);
        }

        // Feedback pegs
        const feedbackPegs = document.createElement("div");
        feedbackPegs.className = "feedback-pegs";

        for (let i = 0; i < 4; i++) {
            const peg = document.createElement("div");
            peg.className = "feedback-peg";
            feedbackPegs.appendChild(peg);
        }

        row.appendChild(number);
        row.appendChild(guessPegs);
        row.appendChild(feedbackPegs);

        guessList.appendChild(row);
    }
}

renderGuessRows();

// ================================
// Render Current Guess
// ================================

function renderCurrentGuess() {

    const activeRow = guessList.querySelector(".guess-row.active");

    if (!activeRow) {
        return;
    }

    const pegs = activeRow.querySelectorAll(".guess-peg");

    pegs.forEach((peg, index) => {

        const selectedColour = defaultColours.find(
            colour => colour.name.toLowerCase() === currentGuess[index]
        );

        peg.style.backgroundColor = selectedColour
            ? selectedColour.value
            : "transparent";

        peg.classList.toggle("selected", index === activePegIndex);
    });
}

// ================================
// Colour Selection
// ================================

colourOptions.addEventListener("click", event => {

    const button = event.target.closest(".colour-option");

    if (!button) {
        return;
    }

    const selectedColour = button.dataset.color;

    currentGuess[activePegIndex] = selectedColour;

    // Move to the next empty peg
    const nextEmptyIndex = currentGuess.findIndex(
        (colour, index) => colour === null && index > activePegIndex
    );

    if (nextEmptyIndex !== -1) {
        activePegIndex = nextEmptyIndex;
    } else {
        activePegIndex = currentGuess.findIndex(
            colour => colour === null
        );

        if (activePegIndex === -1) {
            activePegIndex = codeLength - 1;
        }
    }

    renderCurrentGuess();
});

// ================================
// Edit Guess Peg
// ================================

guessList.addEventListener("click", event => {

    const peg = event.target.closest(".guess-peg");

    if (!peg) {
        return;
    }

    const row = peg.closest(".guess-row");

    // Only allow editing the active row
    if (!row.classList.contains("active")) {
        return;
    }

    activePegIndex = Number(peg.dataset.index);

    renderCurrentGuess();
});

// ================================
// Clear Guess
// ================================

const clearGuessButton = document.querySelector("#clearGuess");

clearGuessButton.addEventListener("click", () => {

    currentGuess = Array(codeLength).fill(null);
    activePegIndex = 0;

    renderCurrentGuess();
});