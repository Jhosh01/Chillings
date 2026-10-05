const modal = document.getElementById("gameModal");
const gameContent = document.getElementById("gameContent");

let gameMode = "";
let currentUser = "";
let currentPartner = "";


// ==========================================
// RANDOM HELPER
// ==========================================

function pick(array) {
    return array[Math.floor(Math.random() * array.length)];
}


// ==========================================
// BACKGROUND MUSIC
// ==========================================

const backgroundMusic = new Audio("music/chill.mp3");

backgroundMusic.loop = true;
backgroundMusic.volume = 0.35;

let musicStarted = false;

function startMusic() {

    if (musicStarted) return;

    backgroundMusic.play()
        .then(() => {

            musicStarted = true;

            console.log("Background music started.");

        })
        .catch(() => {

            console.log("Waiting for user interaction to start music.");

        });
}


// Try when page opens
window.addEventListener("load", () => {
    startMusic();
});


// Start after interaction if browser blocks autoplay
document.addEventListener("click", startMusic, { once: true });
document.addEventListener("touchstart", startMusic, { once: true });
document.addEventListener("keydown", startMusic, { once: true });


// ==========================================
// START GAME
// ==========================================

function startGame(mode) {

    gameMode = mode;

    modal.classList.add("show");

    if (mode === "single") {

        gameContent.innerHTML = `

            <div class="game-screen">

                <h2>Let's see what's coming...</h2>

                <p>
                    Enter your name and let the universe
                    make some questionable decisions about you.
                </p>

                <div class="input-group">

                    <label>Your name</label>

                    <input
                        id="playerName"
                        type="text"
                        placeholder="e.g. Maxwell"
                        maxlength="30"
                    >

                </div>

                <button
                    type="button"
                    class="continue-btn"
                    onclick="beginPrediction()"
                >
                    Reveal My Future →
                </button>

            </div>
        `;

    } else {

        gameContent.innerHTML = `

            <div class="game-screen">

                <h2>Your future together</h2>

                <p>
                    Let's see whether you're destined for
                    greatness... or mutual blocking.
                </p>

                <div class="input-group">

                    <label>Your name</label>

                    <input
                        id="playerName"
                        type="text"
                        placeholder="e.g. Maxwell"
                        maxlength="30"
                    >

                </div>

                <div class="input-group">

                    <label>Partner's name</label>

                    <input
                        id="partnerName"
                        type="text"
                        placeholder="e.g. Juliet"
                        maxlength="30"
                    >

                </div>

                <button
                    type="button"
                    class="continue-btn"
                    onclick="beginPrediction()"
                >
                    Predict Our Future
                </button>

            </div>
        `;
    }
}


// ==========================================
// BEGIN PREDICTION
// ==========================================

function beginPrediction() {

    const playerInput =
        document.getElementById("playerName");

    if (!playerInput || playerInput.value.trim() === "") {

        alert("Enter your name first 😂");

        return;
    }

    currentUser =
        playerInput.value.trim();


    if (gameMode === "couple") {

        const partnerInput =
            document.getElementById("partnerName");

        if (
            !partnerInput ||
            partnerInput.value.trim() === ""
        ) {

            alert("We need your partner's name too.");

            return;
        }

        currentPartner =
            partnerInput.value.trim();
    }


    runUniverseScan();
}


// ==========================================
// UNIVERSE SCAN
// ==========================================

async function runUniverseScan() {

    const messages = [

        "Connecting to the universe...",
        "Reading your personality...",
        "Checking your financial future...",
        "Investigating your love life...",
        "Locating your future home...",
        "Counting your future children...",
        "Checking your future garage...",
        "Looking through your travel history...",
        "Something suspicious was detected...",
        "Finalizing your future..."

    ];


    gameContent.innerHTML = `

        <div class="prediction-loading">

            <div class="loading-orb">
                ◇
            </div>

            <h2 id="scanTitle">
                Connecting to the universe...
            </h2>

            <p id="scanMessage">
                Please remain calm.
            </p>

            <div class="loading-bar">

                <div id="loadingProgress"></div>

            </div>

            <div
                class="loading-percent"
                id="loadingPercent"
            >
                0%
            </div>

        </div>
    `;


    const title =
        document.getElementById("scanTitle");

    const message =
        document.getElementById("scanMessage");

    const progress =
        document.getElementById("loadingProgress");

    const percent =
        document.getElementById("loadingPercent");


    const littleMessages = [

        "The universe is checking your receipts.",
        "This may take a few questionable calculations.",
        "Your future is looking interesting.",
        "The stars are currently discussing you.",
        "We found something interesting.",
        "Almost there.",
        "Your destiny has surprisingly good WiFi."

    ];


    for (
        let i = 0;
        i < messages.length;
        i++
    ) {

        title.textContent =
            messages[i];

        message.textContent =
            pick(littleMessages);


        const percentage =
            Math.round(
                ((i + 1) / messages.length) * 100
            );


        progress.style.width =
            percentage + "%";

        percent.textContent =
            percentage + "%";


        await wait(650);
    }


    await wait(500);


    if (gameMode === "single") {

        showSingleResults();

    } else {

        showCoupleResults();

    }
}


// ==========================================
// SINGLE FUTURE DATA
// ==========================================

const careers = [

    "Software Engineer",
    "Tech Founder",
    "Web3 Builder",
    "Content Creator",
    "Creative Director",
    "DJ",
    "Professional Nap Consultant",
    "Digital Nomad",
    "YouTube Creator",
    "Serial Entrepreneur",
    "Full-Time Problem Solver"

];


const homes = [

    "A 4-bedroom mansion in Lekki",
    "A beautiful house in Abuja",
    "A smart home with more gadgets than furniture",
    "A luxury apartment with an unnecessarily large TV",
    "A quiet beach house",
    "A surprisingly beautiful house your parents will brag about"

];


const cars = [

    "Mercedes-Benz GLE",
    "Toyota Highlander",
    "Range Rover Sport",
    "Tesla Model 3",
    "Lexus RX",
    "Toyota Prado",
    "A very clean 2007 Corolla",
    "A car you bought because the fuel consumption is okay"

];


const loveStatuses = [

    "Happily married",
    "Deeply in love",
    "Married your best friend",
    "In a relationship that survived everything",
    "Single by choice... allegedly",
    "Single and enjoying premium peace",
    "Currently avoiding relationship stress",
    "Married after saying you would never marry"

];


const travelDestinations = [

    "Dubai",
    "London",
    "Paris",
    "New York",
    "Tokyo",
    "Cape Town",
    "Santorini",
    "Canada"

];


const randomEvents = [

    "You randomly become famous on the internet",
    "You accidentally start a business that becomes huge",
    "Someone you helped years ago changes your life",
    "You move to another city and completely restart your life",
    "You buy something expensive just because you can",
    "You become the friend everyone calls for advice",
    "You disappear for 6 months and return suspiciously successful",
    "You become rich and suddenly everyone remembers your name",
    "You accidentally become an influencer",
    "One crazy decision completely changes your life"

];


const kidDescriptions = [

    "tiny troublemakers",
    "future billionaires",
    "professional noise makers",
    "mini versions of you",
    "children who will finish your data subscription",
    "future footballers",
    "future engineers",
    "future comedians"

];


const wealthValues = [

    42.8,
    67.4,
    91.6,
    128.3,
    184.7,
    284.7,
    347.8,
    512.6,
    728.4,
    950.2

];


// ==========================================
// SINGLE RESULTS
// ==========================================

function showSingleResults() {

    const wealth =
        pick(wealthValues);


    const age =
        Math.floor(Math.random() * 8) + 25;


    const kids =
        Math.floor(Math.random() * 7);


    const countries =
        Math.floor(Math.random() * 15) + 3;


    const career =
        pick(careers);

    const home =
        pick(homes);

    const car =
        pick(cars);

    const love =
        pick(loveStatuses);

    const travel =
        pick(travelDestinations);

    const randomEvent =
        pick(randomEvents);


    gameContent.innerHTML = `

        <div class="results-screen">

            <div class="result-heading">

                <span class="result-kicker">
                    YOUR FUTURE
                </span>

                <h2>
                    ${escapeHTML(currentUser)}
                </h2>

                <p>
                    Here's what the universe came up with.
                </p>

            </div>


            <div class="result-grid">


                <div class="result-card career-card">

                    <div class="card-label">
                        Career
                    </div>

                    <strong>
                        ${career}
                    </strong>

                </div>


                <div class="result-card money-card">

                    <div class="card-label">
                        Future Wealth
                    </div>

                    <strong>
                        $${wealth}M
                    </strong>

                </div>


                <div class="result-card home-card">

                    <div class="card-label">
                        Future Home
                    </div>

                    <strong>
                        ${home}
                    </strong>

                </div>


                <div class="result-card car-card">

                    <div class="card-label">
                        Future Ride
                    </div>

                    <strong>
                        ${car}
                    </strong>

                </div>


                <div class="result-card love-card">

                    <div class="card-label">
                        Love Life
                    </div>

                    <strong>
                        ${love}
                    </strong>

                    <span class="card-detail">
                        Marriage prediction: age ${age}
                    </span>

                </div>


                <div class="result-card kids-card">

                    <div class="card-label">
                        Future Children
                    </div>

                    <strong>
                        ${kids}
                    </strong>

                    <span class="card-detail">

                        ${
                            kids === 0
                                ? "Peace and quiet forever."
                                : kids + " " + pick(kidDescriptions)
                        }

                    </span>

                </div>


                <div class="result-card travel-card">

                    <div class="card-label">
                        Travel
                    </div>

                    <strong>
                        ${countries} countries
                    </strong>

                    <span class="card-detail">
                        First big trip: ${travel}
                    </span>

                </div>


                <div class="result-card twist-card">

                    <div class="card-label">
                        Plot Twist
                    </div>

                    <strong>
                        ${randomEvent}
                    </strong>

                </div>


            </div>


            <div class="destiny-score">

                <div>

                    <span>
                        Destiny Score
                    </span>

                    <small>
                        For entertainment only
                    </small>

                </div>

                <strong>

                    ${Math.floor(Math.random() * 21) + 80}

                    <small>
                        /100
                    </small>

                </strong>

            </div>


            <div class="result-actions">

                <button
                    type="button"
                    class="back-result-btn"
                    onclick="backToGame()"
                >
                    ← Back
                </button>


                <button
                    type="button"
                    class="continue-btn"
                    onclick="runUniverseScan()"
                >
                    Regenerate
                </button>


                <button
                    type="button"
                    class="share-result-btn"
                    onclick="shareFuture()"
                >
                    Share My Future
                </button>

            </div>


        </div>
    `;
}


// ==========================================
// COUPLE DATA
// ==========================================

const coupleLove = [

    "You become an annoyingly cute married couple.",
    "You argue over small things but somehow always fix them.",
    "You become the couple everyone secretly envies.",
    "You survive enough plot twists to deserve a Netflix series.",
    "One of you is definitely the stubborn one.",
    "You somehow turn chaos into a beautiful relationship.",
    "You become best friends who happen to be married."

];


const coupleHomes = [

    "A luxury 5-bedroom mansion",
    "A modern smart home",
    "A beautiful house in Lagos",
    "A peaceful family home outside the city",
    "A luxury apartment before upgrading to a mansion"

];


const coupleCars = [

    "Mercedes GLE + Toyota Highlander",
    "Range Rover + Lexus RX",
    "Tesla + Toyota Prado",
    "Two very clean SUVs",
    "One expensive car and one very reliable Corolla"

];


const coupleTwists = [

    "You randomly move to another country together",
    "One of you starts a business that becomes huge",
    "You become the couple that travels every holiday",
    "You buy your dream house earlier than expected",
    "Your first major argument is somehow about interior decoration",
    "You become financially comfortable enough to stop checking food prices",
    "Your children become more famous than both of you"

];


// ==========================================
// COUPLE RESULTS
// ==========================================

function showCoupleResults() {

    const compatibility =
        Math.floor(Math.random() * 16) + 84;


    const kids =
        Math.floor(Math.random() * 6) + 1;


    const marriageYear =
        new Date().getFullYear() +
        Math.floor(Math.random() * 7) + 1;


    const wealth =
        pick([
            96.4,
            128.7,
            214.5,
            347.8,
            482.3,
            675.9
        ]);


    const love =
        pick(coupleLove);

    const home =
        pick(coupleHomes);

    const car =
        pick(coupleCars);

    const twist =
        pick(coupleTwists);


    gameContent.innerHTML = `

        <div class="results-screen">

            <div class="result-heading">

                <span class="result-kicker">
                    YOUR FUTURE TOGETHER
                </span>

                <h2>

                    ${escapeHTML(currentUser)}
                    +
                    ${escapeHTML(currentPartner)}

                </h2>

                <p>
                    The universe has made its decision.
                </p>

            </div>


            <div class="compatibility">

                <div>

                    <span>
                        Compatibility
                    </span>

                    <strong>
                        ${compatibility}%
                    </strong>

                </div>


                <div class="compatibility-bar">

                    <div
                        style="width:${compatibility}%"
                    ></div>

                </div>

            </div>


            <div class="result-grid">


                <div class="result-card love-card">

                    <div class="card-label">
                        Marriage
                    </div>

                    <strong>
                        ${marriageYear}
                    </strong>

                    <span class="card-detail">
                        ${love}
                    </span>

                </div>


                <div class="result-card kids-card">

                    <div class="card-label">
                        Future Children
                    </div>

                    <strong>
                        ${kids}
                    </strong>

                    <span class="card-detail">
                        ${kids} ${pick(kidDescriptions)}
                    </span>

                </div>


                <div class="result-card money-card">

                    <div class="card-label">
                        Combined Wealth
                    </div>

                    <strong>
                        $${wealth}M
                    </strong>

                </div>


                <div class="result-card home-card">

                    <div class="card-label">
                        Future Home
                    </div>

                    <strong>
                        ${home}
                    </strong>

                </div>


                <div class="result-card car-card">

                    <div class="card-label">
                        Future Garage
                    </div>

                    <strong>
                        ${car}
                    </strong>

                </div>


                <div class="result-card twist-card">

                    <div class="card-label">
                        Relationship Plot Twist
                    </div>

                    <strong>
                        ${twist}
                    </strong>

                </div>


            </div>


            <div class="destiny-score">

                <div>

                    <span>
                        Couple Destiny
                    </span>

                    <small>
                        For entertainment only
                    </small>

                </div>


                <strong>

                    ${Math.floor(Math.random() * 11) + 90}

                    <small>
                        /100
                    </small>

                </strong>

            </div>


            <div class="result-actions">


                <button
                    type="button"
                    class="back-result-btn"
                    onclick="backToGame()"
                >
                    ← Back
                </button>


                <button
                    type="button"
                    class="continue-btn"
                    onclick="runUniverseScan()"
                >
                    Regenerate
                </button>


                <button
                    type="button"
                    class="share-result-btn"
                    onclick="shareFuture()"
                >
                    Share My Future
                </button>


            </div>


        </div>
    `;
}


// ==========================================
// SHARE MY FUTURE
// ==========================================

async function shareFuture() {

    const resultScreen =
        document.querySelector(".results-screen");


    if (!resultScreen) {
        return;
    }


    const resultText =
        resultScreen.innerText;


    const shareText = `

WHAT HAPPENS NEXT?

${resultText}

I just discovered my future.

Find yours:
${window.location.href}

`;


    try {

        if (navigator.share) {

            await navigator.share({

                title: "What Happens Next?",

                text: shareText.trim()

            });

        } else {

            await navigator.clipboard.writeText(
                shareText.trim()
            );

            alert(
                "Your future has been copied!"
            );

        }

    } catch (error) {

        console.log(
            "Share cancelled."
        );

    }
}


// ==========================================
// BACK TO GAME
// ==========================================

function backToGame() {

    modal.classList.add("show");


    if (gameMode === "single") {

        gameContent.innerHTML = `

            <div class="game-screen">

                <h2>
                    Let's see what's coming...
                </h2>

                <p>
                    Enter your name and we'll generate
                    your future.
                </p>


                <div class="input-group">

                    <label>
                        Your name
                    </label>

                    <input
                        id="playerName"
                        type="text"
                        placeholder="e.g. Maxwell"
                        maxlength="30"
                    >

                </div>


                <button
                    type="button"
                    class="continue-btn"
                    onclick="beginPrediction()"
                >
                    Reveal My Future →
                </button>

            </div>
        `;

    } else {

        gameContent.innerHTML = `

            <div class="game-screen">

                <h2>
                    Your future together
                </h2>

                <p>
                    Let's see what the universe
                    has planned.
                </p>


                <div class="input-group">

                    <label>
                        Your name
                    </label>

                    <input
                        id="playerName"
                        type="text"
                        placeholder="e.g. Maxwell"
                        maxlength="30"
                    >

                </div>


                <div class="input-group">

                    <label>
                        Partner's name
                    </label>

                    <input
                        id="partnerName"
                        type="text"
                        placeholder="e.g. Juliet"
                        maxlength="30"
                    >

                </div>


                <button
                    type="button"
                    class="continue-btn"
                    onclick="beginPrediction()"
                >
                    Predict Our Future →
                </button>

            </div>
        `;
    }
}


// ==========================================
// UTILITIES
// ==========================================

function wait(ms) {

    return new Promise(resolve => {

        setTimeout(resolve, ms);

    });

}


function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}


function closeGame() {

    modal.classList.remove("show");

}