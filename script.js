// Wait for the page to load
window.onload = function () {
    document.getElementById("consent-box").style.display = "flex"; // Show consent box

    // Yes Button: Show name input box
    document.getElementById("yes-btn").addEventListener("click", function () {
        document.getElementById("consent-box").style.display = "none"; // Hide consent box
        document.getElementById("name-box").style.display = "flex"; // Show name box
    });

    // No Button: Show "Maybe Next Time" box
    document.getElementById("no-btn").addEventListener("click", function () {
        document.getElementById("consent-box").style.display = "none"; // Hide consent box
        document.getElementById("maybe-box").style.display = "flex"; // Show maybe box
    });

    // OK Button: Close the "Maybe Next Time" box
    document.getElementById("ok-btn").addEventListener("click", function () {
        document.getElementById("maybe-box").style.display = "none"; // Hide maybe box
        window.location.href = "https://www.google.com"; // Redirect (optional)
    });

    // Start Button: Capture player name and show house selection
    document.getElementById("start-btn").addEventListener("click", function () {
        let playerName = document.getElementById("player-name").value.trim();
        if (playerName === "") {
            alert("Please enter your name!"); // Prevent empty name
        } else {
            localStorage.setItem("playerName", playerName); // Store player name
            document.getElementById("name-box").style.display = "none"; // Hide name box
            document.getElementById("house-box").style.display = "flex"; // Show house selection
        }
    });

    // House Selection: Store choice and show pet selection
    document.querySelectorAll(".house-icon").forEach(icon => {
        icon.addEventListener("click", function () {
            let selectedHouse = this.getAttribute("data-house");
            localStorage.setItem("selectedHouse", selectedHouse); // Store house choice
            document.getElementById("house-box").style.display = "none"; // Hide house selection
            document.getElementById("pet-box").style.display = "flex"; // Show pet selection
        });
    });

    // Pet Selection: Store choice and start the game
    document.querySelectorAll(".pet-option").forEach(pet => {
        pet.addEventListener("click", function () {
            let selectedPet = this.getAttribute("data-pet");
            localStorage.setItem("selectedPet", selectedPet); // Store pet choice
            document.getElementById("pet-box").style.display = "none"; // Hide pet selection
            startGame();
        });
    });
};

// House Background Images
const houseBackgrounds = {
    "Gryffindor": "images/gryffindor-room.jpg",
    "Ravenclaw": "images/ravenclaw-room.jpg",
    "Hufflepuff": "images/hufflepuff-room.jpg",
    "Slytherin": "images/Slytherin-room.jpg"
};

// House Descriptions
const houseDescriptions = {
    "Gryffindor": "You step into the warm and cozy Gryffindor common room. A roaring fireplace flickers, casting golden light across the room.",
    "Ravenclaw": "You enter the Ravenclaw common room, filled with towering bookshelves and a starry night ceiling. A feeling of wisdom surrounds you.",
    "Hufflepuff": "The Hufflepuff common room greets you with a comforting warmth. Earthy tones and plant life make it feel like home.",
    "Slytherin": "The Slytherin common room is sleek and elegant, lit with green-tinted lamps. The air is cool, and whispers of ambition fill the space."
};

// Start the game
function startGame() {
    let playerName = localStorage.getItem("playerName") || "Player";
    let house = localStorage.getItem("selectedHouse") || "Gryffindor";
    let pet = localStorage.getItem("selectedPet") || "Owl";

    // Set blurred background image
    document.getElementById("background-blur").style.backgroundImage = `url('${houseBackgrounds[house]}')`;

    // Update common room text
    document.getElementById("welcome-text").innerText = `Welcome to ${house}, ${playerName}!`;
    document.getElementById("common-room-desc").innerText = houseDescriptions[house];

    // Display chosen pet
    document.getElementById("pet-display").innerText = ` your pet is: ${pet}`;

    // Show common room
    document.getElementById("common-room").style.display = "block";
}

// Functions for Common Room Choices
function exploreCommonRoom() {
    alert("You walk around, taking in the atmosphere of your new home.");
}

function talkToSenior() {
    alert("A senior student welcomes you and gives you advice about surviving Hogwarts.");
}

function goToDorm() {
    alert("You head to your dormitory to rest for the night.");
}
