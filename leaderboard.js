const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRM_bD3CHrtSDMOt2-iJ04wbivtj99QdolG2ehTI1ZD8kkYyMA5rL4b-LFyTy6KSXQiJWeP_1sW9SUK/pub?output=csv";

function parseCSV(csv) {
    const lines = csv.trim().split("\n");
    return lines.slice(1).map(line => {
        const [Photo, Name, Score] = line.split(",");
        return { Name, Score: parseInt(Score, 10) };
    });
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

        // The section where leaderboard HTML will be placed
        const leaderboardHTML = document.getElementById("leaderboard-section");

        // Enhanced styles for top 3 places with more prominent gradients
        const topPlaceStyles = `
            .leaderboard-entry.first-place .color-circle {
                background: linear-gradient(135deg, #ffd700 0%, #f9d423 30%, #e6b422 60%, #ffd700 100%) !important;
            }
            .second-place .color-circle {
                background: linear-gradient(135deg, #e3e3e3 0%, #c0c0c0 30%, #a9a9a9 60%, #e3e3e3 100%) !important;
            }
            .third-place .color-circle {
                background: linear-gradient(135deg, #d7995b 0%, #c17e3e 30%, #9c682c 60%, #d7995b 100%) !important;
            }
        `;

        // Create style element and append to head
        const styleElement = document.createElement('style');
        styleElement.textContent = topPlaceStyles;
        document.head.appendChild(styleElement);

        // Fetch and apply leaderboard template
        fetch('leaderboard.html')
            .then(response => response.text())
            .then(leaderboardTemplate => {
                leaderboardHTML.innerHTML = leaderboardTemplate;
                const leaderboardContainer = document.getElementById("leaderboard-container");

                data.forEach((entry, index) => {
                    const row = document.createElement("div");
                    row.className = "leaderboard-entry";
                    
                    // Add special classes for top 3 positions
                    if (index === 0) {
                        row.classList.add("first-place");
                    } else if (index === 1) {
                        row.classList.add("second-place");
                    } else if (index === 2) {
                        row.classList.add("third-place");
                    }

                    const circle = document.createElement("div");
                    circle.className = "color-circle";
                    
                    // Convert position number to Persian digits for consistency
                    circle.textContent = convertToPersianNumber(index + 1);
                    
                    // Ensure Vazir font is applied directly to this element
                    circle.style.fontFamily = '"Vazir", "vazirmatn", Arial, sans-serif';
                    circle.style.direction = 'rtl';

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
