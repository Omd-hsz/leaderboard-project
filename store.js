document.addEventListener('DOMContentLoaded', function () {
    const storeHTML = document.getElementById("store-section");

    fetch('store.html')
        .then(response => response.text())
        .then(storeTemplate => {
            storeHTML.innerHTML = storeTemplate;
            loadItemsFromFolder();
        });

    function loadItemsFromFolder() {
        // Define the list of items that match your image filenames in the GoodsImage folder
        const itemNames = [
            "Premium Avatar", 
            "Special Badge", 
            "Extra Points", 
            "Unique Theme", 
            "Rare Collectible", 
            "Profile Theme", 
            "Digital Sticker", 
            "Custom Emote", 
            "Account Boost", 
            "Mystery Box", 
            "Golden Ticket", 
            "Elite Status", 
            "Digital Pet", 
            "Special Effect", 
            "Exclusive Background"
        ];
        
        // Create store items with actual image paths
        const storeItems = itemNames.map(name => {
            // Generate a filename based on the item name (remove spaces, lowercase)
            const filename = name.replace(/\s+/g, '').toLowerCase();
            
            return {
                name: name,
                emoji: getRandomEmoji(), // Assign an emoji to each item
                price: Math.floor(Math.random() * 10 + 1) * 100, // Random price between 100-1000
                qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(name)}`,
            };
        });

        function getRandomEmoji() {
            const emojis = ["😀", "🚀", "🎮", "🎁", "💎", "🏆", "⭐️", "🔥", "💫", "🎯", "🎨", "🎭", "🎧", "📱", "🎪"];
            return emojis[Math.floor(Math.random() * emojis.length)];
        }

        const storeContainer = document.getElementById("store-container");
        
        // Create a parent container for all rows
        const rowsContainer = document.createElement("div");
        rowsContainer.className = "store-rows-container";
        storeContainer.appendChild(rowsContainer);
        
        // Create rows with 3 cards each
        for (let i = 0; i < storeItems.length; i += 3) {
            const row = document.createElement("div");
            row.className = "store-item-row";
            
            // Add up to 3 cards per row
            for (let j = i; j < i + 3 && j < storeItems.length; j++) {
                const item = storeItems[j];
                
                const card = document.createElement("div");
                card.className = "store-item-card";

                const cardInner = document.createElement("div");
                cardInner.className = "card-inner";

                const cardFront = document.createElement("div");
                cardFront.className = "card-front";

                // Create large emoji display instead of small emoji + image
                const emojiDisplay = document.createElement("div");
                emojiDisplay.className = "item-emoji";
                emojiDisplay.textContent = item.emoji;
                emojiDisplay.style.fontSize = "80px";
                emojiDisplay.style.display = "block";
                emojiDisplay.style.margin = "30px 0";
                emojiDisplay.style.textAlign = "center";

                const itemName = document.createElement("div");
                itemName.className = "item-name";
                itemName.textContent = item.name;

                const itemPrice = document.createElement("div");
                itemPrice.className = "item-price";
                itemPrice.textContent = `قیمت ${item.price}`;

                cardFront.appendChild(emojiDisplay);
                cardFront.appendChild(itemName);
                cardFront.appendChild(itemPrice);

                const cardBack = document.createElement("div");
                cardBack.className = "card-back";

                const qrImage = document.createElement("img");
                qrImage.className = "qr-image";
                qrImage.src = item.qrCode;
                qrImage.alt = "QR Code";

                cardBack.appendChild(qrImage);

                cardInner.appendChild(cardFront);
                cardInner.appendChild(cardBack);
                card.appendChild(cardInner);

                card.addEventListener("click", function () {
                    if (cardInner.style.transform === "rotateY(180deg)") {
                        cardInner.style.transform = "rotateY(0deg)";
                    } else {
                        cardInner.style.transform = "rotateY(180deg)";
                    }
                });

                row.appendChild(card);
            }
            
            rowsContainer.appendChild(row);
        }
    }
});