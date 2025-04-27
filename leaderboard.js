const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRM_bD3CHrtSDMOt2-iJ04wbivtj99QdolG2ehTI1ZD8kkYyMA5rL4b-LFyTy6KSXQiJWeP_1sW9SUK/pub?output=csv";

function parseCSV(csv) {
    const lines = csv.trim().split("\n");
    return lines.slice(1).map(line => {
        const [Photo, Name, Score] = line.split(",");
        return { Name, Score: parseInt(Score, 10) };
    });
}

function randomCharacter() {
    const chars = ['❂', '✼', '❖', '❉', '⌘'];
    return chars[Math.floor(Math.random() * chars.length)];
}

function convertToPersianNumber(number) {
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    return number.toString().replace(/\d/g, (digit) => persianDigits[digit]);
}

fetch(sheetURL)
    .then(response => response.text())
    .then(csvText => {
        const data = parseCSV(csvText);
        data.sort((a, b) => b.Score - a.Score);

        const leaderboardHTML = document.getElementById("leaderboard-section");

        fetch('leaderboard.html')
            .then(response => response.text())
            .then(leaderboardTemplate => {
                leaderboardHTML.innerHTML = leaderboardTemplate;
                const leaderboardContainer = document.getElementById("leaderboard-container");

                data.forEach((entry, index) => {
                    const row = document.createElement("div");
                    row.className = "leaderboard-entry";

                    const circle = document.createElement("div");
                    circle.className = "color-circle";
                    
                    // Use medal emojis for top 3 places
                    if (index === 0) {
                        circle.textContent = "🥇"; // First place
                    } else if (index === 1) {
                        circle.textContent = "🥈"; // Second place
                    } else if (index === 2) {
                        circle.textContent = "🥉"; // Third place
                    } else {
                        circle.textContent = randomCharacter(); // For other positions
                    }

                    const nameSpan = document.createElement("div");
                    nameSpan.className = "name";
                    nameSpan.textContent = entry.Name;

                    const scoreSpan = document.createElement("div");
                    scoreSpan.className = "score";
                    scoreSpan.textContent = convertToPersianNumber(entry.Score);

                    row.appendChild(circle);
                    row.appendChild(nameSpan);
                    row.appendChild(scoreSpan);

                    leaderboardContainer.appendChild(row);
                });
            });
    })
    .catch(error => {
        console.error("Error fetching or parsing CSV:", error);
    });