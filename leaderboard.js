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

        // Enhanced styles for top 3 places with more prominent gradients
        const topPlaceStyles = `
            .leaderboard-entry.first-place {
                background: linear-gradient(135deg, #ffd700 0%, #f9d423 30%, #e6b422 60%, #ffd700 100%) !important;
                border: 2px solid #e6b422 !important;
                box-shadow: 0 4px 12px rgba(230, 180, 34, 0.4) !important;
                transition: all 0.3s ease !important;
            }
            .leaderboard-entry.first-place .name, 
            .leaderboard-entry.first-place .score {
                color: #222222 !important;
                text-shadow: 0 1px 1px rgba(255, 255, 255, 0.5) !important;
                font-weight: bold !important;
            }
            .leaderboard-entry.first-place:hover {
                transform: translateY(-2px) !important;
                box-shadow: 0 6px 14px rgba(230, 180, 34, 0.5) !important;
            }
            
            .leaderboard-entry.second-place {
                background: linear-gradient(135deg, #e3e3e3 0%, #c0c0c0 30%, #a9a9a9 60%, #e3e3e3 100%) !important;
                border: 2px solid #a9a9a9 !important;
                box-shadow: 0 4px 12px rgba(169, 169, 169, 0.4) !important;
                transition: all 0.3s ease !important;
            }
            .leaderboard-entry.second-place .name, 
            .leaderboard-entry.second-place .score {
                color: #222222 !important;
                text-shadow: 0 1px 1px rgba(255, 255, 255, 0.5) !important;
                font-weight: bold !important;
            }
            .leaderboard-entry.second-place:hover {
                transform: translateY(-2px) !important;
                box-shadow: 0 6px 14px rgba(169, 169, 169, 0.5) !important;
            }
            
            .leaderboard-entry.third-place {
                background: linear-gradient(135deg, #d7995b 0%, #c17e3e 30%, #9c682c 60%, #d7995b 100%) !important;
                border: 2px solid #9c682c !important;
                box-shadow: 0 4px 12px rgba(156, 104, 44, 0.4) !important;
                transition: all 0.3s ease !important;
            }
            .leaderboard-entry.third-place .name, 
            .leaderboard-entry.third-place .score {
                color: #222222 !important;
                text-shadow: 0 1px 1px rgba(255, 255, 255, 0.5) !important;
                font-weight: bold !important;
            }
            .leaderboard-entry.third-place:hover {
                transform: translateY(-2px) !important;
                box-shadow: 0 6px 14px rgba(156, 104, 44, 0.5) !important;
            }
            
            /* Make sure color circles stand out on the gradient backgrounds */
            .first-place .color-circle,
            .second-place .color-circle,
            .third-place .color-circle {
                background-color: rgba(255, 255, 255, 0.2) !important;
                border: 2px solid rgba(255, 255, 255, 0.4) !important;
                font-size: 1.8em !important;
            }
            
            /* Style for number emoji placeholders (positions 4-9) */
            .leaderboard-entry:not(.first-place):not(.second-place):not(.third-place) .color-circle {
                background: linear-gradient(135deg, #444444 0%, #333333 40%, #222222 80%, #111111 100%) !important;
                border: 2px solid #555555 !important;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3) !important;
                color: white !important;
                font-size: 1.5em !important;
                text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5) !important;
                font-family: "Vazir", "vazirmatn", Arial, sans-serif !important; /* Fix font name */
                direction: rtl !important; /* Ensure proper RTL display */
            }
            
            /* Scroll down button styles */
            #scroll-down-btn {
                position: fixed; /* Use fixed instead of absolute */
                bottom: 200px; /* Position it above the store section */
                left: 50%;
                transform: translateX(-50%);
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: rgba(200, 46, 46, 0.5);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                cursor: pointer;
                z-index: 1002;
                transition: all 0.3s ease;
                border: none;
                pointer-events: auto;
            }
            
            #scroll-down-btn:hover {
                background-color: rgba(200, 46, 46, 0.8);
                transform: translateX(-50%) translateY(-5px);
            }
            
            #scroll-down-btn.hidden {
                opacity: 0;
                pointer-events: none;
            }
        `;

        // Create style element and append to head
        const styleElement = document.createElement('style');
        styleElement.textContent = topPlaceStyles;
        document.head.appendChild(styleElement);

        fetch('leaderboard.html')
            .then(response => response.text())
            .then(leaderboardTemplate => {
                leaderboardHTML.innerHTML = leaderboardTemplate;
                const leaderboardContainer = document.getElementById("leaderboard-container");
                
                // No need for position relative or button wrapper
                
                // Add scroll down button directly to the body
                const scrollButton = document.createElement('button');
                scrollButton.id = 'scroll-down-btn';
                scrollButton.innerHTML = '&#x25BC;'; // Down arrow symbol
                scrollButton.title = 'پایین رفتن';
                document.body.appendChild(scrollButton);
                
                // Add scroll functionality
                scrollButton.addEventListener('click', () => {
                    leaderboardHTML.scrollBy({
                        top: 300,
                        behavior: 'smooth'
                    });
                });
                
                // Show the button only when the leaderboard is visible and not scrolled much
                window.addEventListener('scroll', () => {
                    const leaderboardRect = leaderboardHTML.getBoundingClientRect();
                    const isLeaderboardVisible = 
                        leaderboardRect.top < window.innerHeight && 
                        leaderboardRect.bottom > 0;
                    
                    if (isLeaderboardVisible && leaderboardHTML.scrollTop < 50) {
                        scrollButton.classList.remove('hidden');
                    } else {
                        scrollButton.classList.add('hidden');
                    }
                });
                
                // Also hide button when scrolling within the leaderboard
                leaderboardHTML.addEventListener('scroll', () => {
                    if (leaderboardHTML.scrollTop > 50) {
                        scrollButton.classList.add('hidden');
                    } else {
                        scrollButton.classList.remove('hidden');
                    }
                });

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
                    
                    // Use medal emojis for top 3 places and regular numbers for positions 4 and beyond
                    if (index === 0) {
                        circle.textContent = "🥇"; // First place
                    } else if (index === 1) {
                        circle.textContent = "🥈"; // Second place
                    } else if (index === 2) {
                        circle.textContent = "🥉"; // Third place
                    } else {
                        // Convert position number to Persian digits for consistency
                        circle.textContent = convertToPersianNumber(index + 1);
                        
                        // Ensure Vazir font is applied directly to this element
                        circle.style.fontFamily = '"Vazir", "vazirmatn", Arial, sans-serif';
                        circle.style.direction = 'rtl';
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