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
        // window.location.href = "https://www.google.com"; // Redirect (optional)
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

    // Pet Selection: Store choice and show wand selection
    document.querySelectorAll(".pet-option").forEach(pet => {
        pet.addEventListener("click", function () {
            let selectedPet = this.getAttribute("data-pet");
            localStorage.setItem("selectedPet", selectedPet); // Store pet choice
            document.getElementById("pet-box").style.display = "none"; // Hide pet selection
            document.getElementById("wand-box").style.display = "flex"; // Show wand selection
        });
    });

    // Wand Selection: Store choice and start the game
    document.querySelectorAll(".wand-option").forEach(wand => {
        wand.addEventListener("click", function () {
            let selectedWand = this.getAttribute("data-wand");
            localStorage.setItem("selectedWand", selectedWand); // Store wand choice
            document.getElementById("wand-box").style.display = "none"; // Hide wand selection
            startGame(); // Start game
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

// Wand Options
const wands = ["Holly & Phoenix Feather", "Oak & Dragon Heartstring", "Willow & Unicorn Hair", "Yew & Basilisk Fang"];




// Start the game
function startGame() {
    let playerName = localStorage.getItem("playerName") || "Player";
    let house = localStorage.getItem("selectedHouse") || "Gryffindor";
    let pet = localStorage.getItem("selectedPet") || "Owl";
    let wand = localStorage.getItem("selectedWand") || "Holly & Phoenix Feather";
    // let playerLevel = parseInt(localStorage.getItem("playerLevel")) || 1;
    
    

    // updateLevelDisplay(); // Show the current level on top-right

   
    console.log("Start game function called");
    console.log("Player Name:", playerName);
    console.log("House:", house);
    console.log("Pet:", pet);
    console.log("Wand:", wand);

    // Set blurred background image
    document.getElementById("background-blur").style.backgroundImage = `url('${houseBackgrounds[house]}')`;

    // Update common room text
    document.getElementById("welcome-text").innerText = `Welcome to ${house}, ${playerName}!`;
    document.getElementById("common-room-desc").innerText = houseDescriptions[house];

    // Display chosen pet and wand
    document.getElementById("pet-display").innerText = `Your pet is: ${pet}`;
    document.getElementById("wand-display").innerText = `Your wand is: ${wand}`;

    // Show common room
    document.getElementById("common-room").style.display = "block";

    // Attach explore event
    document.getElementById("explore-btn").addEventListener("click", function () {
        document.getElementById("explore-box").style.display = "block"; // Show explore options
    });
 // Book Exploration Options (Main Categories)
const bookOptions = {
    "Philosopher's Stone": ["Meet Hagrid", "Board Hogwarts Express", "Ignore Letter"]
};

// Track exploration history for back navigation
let historyStack = [];
let lives = 3;
let rewards = [];
let level = 1;

function updateStats() {
    document.getElementById("lives").innerText = `❤️ Lives: ${lives}`;
    document.getElementById("level").innerText = `📖 Level: ${level}`;
    document.getElementById("reward").innerText = `🎁 Rewards: ${rewards.length > 0 ? rewards.join(", ") : "None"}`;
}



// Function to show book selection
function showBooks() {
    document.getElementById("welcome-text").style.display = "none";
    document.getElementById("common-room-desc").style.display = "none";
    document.getElementById("pet-display").style.display = "none";
    document.getElementById("wand-display").style.display = "none";
     
    document.querySelector(".common-room-options").style.display = "block";
    
    let exploreBox = document.getElementById("explore-box");
    exploreBox.innerHTML = "<h3>Select an Adventure</h3>";
    
    Object.keys(bookOptions).forEach(book => {
        let btn = document.createElement("button");
        btn.innerText = book;
        btn.classList.add("explore-option");
        btn.addEventListener("click", function () {
            historyStack = []; // Reset history when selecting a new book
            level = 1;
            updateStats();
            showBookEvents(book, 1);
        });
        exploreBox.appendChild(btn);
    });

    exploreBox.style.display = "block"; // Show exploration box
}

// Function to show events based on book selection
function showBookEvents(book, level) {
    let exploreBox = document.getElementById("explore-box");
    exploreBox.innerHTML = `<h3>${book} - Choose an Event</h3>`;

    bookOptions[book].forEach(event => {
        let btn = document.createElement("button");
        btn.innerText = event;
        btn.classList.add("event-option");
        btn.addEventListener("click", function () {
            historyStack.push({ book, level }); // Save history
            continueExploration(event, level + 1);
        });
        exploreBox.appendChild(btn);
    });


}

// Function to show animation for rewards
function showRewardAnimation() {
    let exploreBox = document.getElementById("explore-box");
    exploreBox.innerHTML = `<h3 class="reward-animation">🏆 Congratulations! You found a secret passage and earned a reward! 🏆</h3>`;
    
    let restartBtn = document.createElement("button");
    restartBtn.innerText = "Continue Exploring";
    restartBtn.addEventListener("click", function () {
        showBooks();
    });

    exploreBox.appendChild(restartBtn);
}

// Function to show animation for death
function showDeathAnimation() {
    let exploreBox = document.getElementById("explore-box");
    exploreBox.innerHTML = `<h3 class="death-animation">💀 Oh no! Your adventure has ended! 💀</h3>`;

    let restartBtn = document.createElement("button");
    restartBtn.innerText = "Try Again";
    restartBtn.addEventListener("click", function () {
        showBooks();
    });

    exploreBox.appendChild(restartBtn);
}


// Recursive function for continued exploration
function continueExploration(choice, level) {
    let exploreBox = document.getElementById("explore-box");

    // Stop after 6 levels of exploration
    if (level > 6) {
        exploreBox.innerHTML = `<h3>${choice} - Your journey ends here! 🎉</h3>`;
        let restartBtn = document.createElement("button");
        restartBtn.innerText = "Return to Common Room";
        restartBtn.addEventListener("click", function () {
            showBooks(); // Restart the adventure
        });
        exploreBox.appendChild(restartBtn);
        return;
    }

    

    let nextChoices = getNextChoices(choice);


    // If dead, trigger death animation
    if (nextChoices.includes("DEAD")) {
        showDeathAnimation();
        return;
    }

    // If reward earned, trigger reward animation
    if (nextChoices.includes("REWARD")) {
        showRewardAnimation();
        return;
    }

    // 🚨 Check if any of the next choices is "Dead"
    if (nextChoices.includes("DEAD")) {
        exploreBox.innerHTML = `<h3>💀 Oh no! Your adventure has ended! 💀</h3>`;
        let restartBtn = document.createElement("button");
        restartBtn.innerText = "Try Again";
        restartBtn.addEventListener("click", function () {
            showBooks(); // Restart the game
        });
        exploreBox.appendChild(restartBtn);
        return; // Prevent further choices from displaying
    }

    // If no deadly option, continue the game normally
    exploreBox.innerHTML = `<h3>${choice} - What will you do next?</h3>`;

    // 🎉 Check for "Reward Earned" option
    if (nextChoices.includes("REWARD")) {
        exploreBox.innerHTML = `<h3>🏆 Congratulations! You found a secret passage and earned a reward! 🏆</h3>`;
        let restartBtn = document.createElement("button");
        restartBtn.innerText = "Continue Exploring";
        restartBtn.addEventListener("click", function () {
            showBooks(); // Restart or continue game
        });
        exploreBox.appendChild(restartBtn);
        return; // Stop further choices from showing
    }

    // If no special condition, continue the game normally
    exploreBox.innerHTML = `<h3>${choice} - What will you do next?</h3>`;


    nextChoices.forEach(next => {
        let btn = document.createElement("button");
        btn.innerText = next;
        btn.classList.add("next-option");
        btn.addEventListener("click", function () {
            historyStack.push({ choice, level }); // Save history
            continueExploration(next, level + 1);
        });
        exploreBox.appendChild(btn);
    });

}

// Function to dynamically generate next level choices based on previous selection
function getNextChoices(choice) {
    const options = {
        "Meet Hagrid": ["Visit Diagon Alley","Ask about secret passage", "Explore Hagrid’s Hut"],
        "Visit Diagon Alley":["Grignotts Wizard Bank","olivers wand shop","notice a witch watching you"],
        "Grignotts Wizard Bank": ["withdraw money from family vault and become rich"],
        "withdraw money from family vault and become rich":["REWARD"],
        "olivers wand shop": ["Let ollivander choose a wand for you", "pick a wand that looks interesting to you", "ask for Harry potters wand"],
        "Let ollivander choose a wand for you": ["first Attempt He hands you a sleek ebony wand.", "Second Attempt He hands you a shorter, twisted oak wand.", "Third Attempt – The Right Wand: ✨"],
        "first Attempt He hands you a sleek ebony wand.": ["BOOM!"],
        "BOOM!":["DEAD"],
        "Second Attempt He hands you a shorter, twisted oak wand.": ["a burst of sparks singes the curtains!"],
        "a burst of sparks singes the curtains!":["DEAD"],
        "Third Attempt – The Right Wand: ✨": ["Solve t a warm glow surrounds you."],
        "Solve t a warm glow surrounds you.":["REWARD"],
        "notice a witch watching you": ["DEAD"],
        "pick a wand that looks interesting to you":["A sleek black wand with silver engravings ✨ ","A short, twisted oak wand 🌿","A wand with a glowing tip on the shelf 🔥"],
        "A sleek black wand with silver engravings ✨ ":["the lights flicker ominously"],
        "the lights flicker ominously":["DEAD"],
        "A short, twisted oak wand 🌿":["a pile of books catches fire!"],
        "a pile of books catches fire!":["DEAD"],
        "A wand with a glowing tip on the shelf 🔥":["zaps you with a shock!"],
        "zaps you with a shock!":["DEAD"],
        "ask for Harry potters wand":["Gives Holly and Phoenix Feather (Like Harry's) – A wand of great destiny… but are you ready for it?","Willow and Unicorn Hair – Graceful and loyal, perfect for a wise and skilled witch/wizard."],
        "Gives Holly and Phoenix Feather (Like Harry's) – A wand of great destiny… but are you ready for it?":[" a warm energy rushes through your fingers. A soft breeze stirs the dust in the shop, and a faint golden glow surrounds you"],
        " a warm energy rushes through your fingers. A soft breeze stirs the dust in the shop, and a faint golden glow surrounds you":["REWARD"],
        "Willow and Unicorn Hair – Graceful and loyal, perfect for a wise and skilled witch/wizard.":["The moment you hold it, a soothing warmth spreads through your fingers. A faint shimmer dances along the wand’s length, and the air around you feels lighter."],
        "The moment you hold it, a soothing warmth spreads through your fingers. A faint shimmer dances along the wand’s length, and the air around you feels lighter.":["REWARD"],
        "Ask about secret passage":["Ask about the safest passage","Insist on learning about the most dangerous one ","Ask if there’s a passage leading to something valuable"],
        "Ask about the safest passage":["One-Eyed Witch Passage","Room of Requirement Passage ","Behind the Mirror on the Fourth Floor"],
        "One-Eyed Witch Passage":["REWARD"],
        "Room of Requirement Passage ":["REWARD"],
        "Behind the Mirror on the Fourth Floor":["REWARD"],
        "Insist on learning about the most dangerous one ":["DEAD"],
        "Ask if there’s a passage leading to something valuable":["REWARD"],
        "Explore Hagrid’s Hut":["The Mysterious Egg ","The Locked Chest ","The Forbidden Forest Warning (Knowledge & Mystery 🌲)"],
        "The Mysterious Egg ":["egg cracks! A tiny black-scaled dragon struggles out, blinking its bright orange eyes"],
        "egg cracks! A tiny black-scaled dragon struggles out, blinking its bright orange eyes":["DEAD"],
        "The Locked Chest ":["REWARD"],
        "The Forbidden Forest Warning (Knowledge & Mystery 🌲)":["a silver fabric fragment.","Offer to investigate the forest yourself "],
        "a silver fabric fragment.":["Earned invisibility"],
        "Earned invisibility":["REWARD"],
        "Offer to investigate the forest yourself ":["DEAD"],  
        "Board Hogwarts Express":["Join Ron Weasley & Harry Potter","Sit Alone & Observe","Find an Empty Compartment"] ,
        "Join Ron Weasley & Harry Potter":["Ron excitedly holds up a box Ever tried Bertie Bott’s Every Flavor Beans? "," Ask Harry about Hogwarts "," Mysterious Knock on the Door → Someone unexpected is at the compartment door. Will you open it"],
        "Ron excitedly holds up a box Ever tried Bertie Bott’s Every Flavor Beans? ":["DEAD"],
        " Ask Harry about Hogwarts ":["get to know abouts secrets"],
        "get to know abouts secrets":["REWARD"],
        " Mysterious Knock on the Door → Someone unexpected is at the compartment door. Will you open it":["Draco Malfoy & His Gang "," Hermione Granger "],
        "Draco Malfoy & His Gang ":["DEAD"],
        " Hermione Granger ":["REWARD"],
        "Find an Empty Compartment":["A Strange Note on the Seat ","A Mysterious Chill "],
        "A Strange Note on the Seat ":["Mora Portus.Whisper these words, and the path will shift.Your heart pounds. A spell? Could this be a secret way to reach Hogwarts instantly?"],
        "Mora Portus.Whisper these words, and the path will shift.Your heart pounds. A spell? Could this be a secret way to reach Hogwarts instantly?":["REWARD"],
        "A Mysterious Chill ":["DEAD"],
        "Sit Alone & Observe":["A Hooded Figure Passes By"," 🦉 An Owl Taps on the Window ","A Soft Glow Under the Seat"],
        "A Hooded Figure Passes By":["DEAD"],
        " 🦉 An Owl Taps on the Window ":["REWARD"],
        "A Soft Glow Under the Seat":["REWARD"],
        "Ignore Letter":["No adventures life your lose!"],
        "No adventures life your lose!":["DEAD"]




        

    };  

    return options[choice] ||[] ;
}

// Function to add a "Back" button to return to the previous step
// function addBackButton() {
//     if (historyStack.length > 0) {
//         let exploreBox = document.getElementById("explore-box");
//         let backBtn = document.createElement("button");
//         // backBtn.innerText = "⬅️ Go Back";
//         // backBtn.classList.add("back-option");
//         backBtn.addEventListener("click", function () {
//             let previous = historyStack.pop();
//             if (previous.book) {
//                 showBookEvents(previous.book, previous.level);
//             } else {
//                 continueExploration(previous.choice, previous.level);
//             }
//         });
//         exploreBox.appendChild(backBtn);
//     }
// }
// Function to restart game
function addRestartButton() {
    let exploreBox = document.getElementById("explore-box");
    let restartBtn = document.createElement("button");
    restartBtn.innerText = "🔄 Restart Game";
    restartBtn.addEventListener("click", function () {
        lives = 3;
        rewards = [];
        level = 1;
        updateStats();
        showBooks();
    });
    exploreBox.appendChild(restartBtn);
}


// Attach the event listener to your existing Explore button
document.getElementById("explore-btn").addEventListener("click", showBooks);
}