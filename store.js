document.addEventListener('DOMContentLoaded', function () {
    const storeHTML = document.getElementById("store-section");

    fetch('store.html')
        .then(response => response.text())
        .then(storeTemplate => {
            storeHTML.innerHTML = storeTemplate;
            addStoreItemCards();
        });

    function addStoreItemCards() {
        function getRandomEmoji() {
            const emojis = ["😀", "🚀", "🎮", "🎁", "💎", "🏆", "⭐️", "🔥", "💫", "🎯", "🎨", "🎭", "🎧", "📱", "🎪"];
            return emojis[Math.floor(Math.random() * emojis.length)];
        }
        
        function getRandomItem() {
            const names = ["Premium Avatar", "Special Badge", "Extra Points", "Unique Theme", 
                          "Rare Collectible", "Profile Theme", "Digital Sticker", "Custom Emote", 
                          "Account Boost", "Mystery Box", "Golden Ticket", "Elite Status", 
                          "Digital Pet", "Special Effect", "Exclusive Background"];
            const prices = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
            
            return {
                name: names[Math.floor(Math.random() * names.length)],
                image: `https://via.placeholder.com/240x200?text=${Math.floor(Math.random() * 1000)}`,
                price: prices[Math.floor(Math.random() * prices.length)],
                qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=item${Math.floor(Math.random() * 10000)}`,
            };
        }

        // Generate 20 random store items
        const storeItems = Array.from({ length: 20 }, () => getRandomItem());

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

                const emojiSpan = document.createElement("span");
                emojiSpan.textContent = getRandomEmoji();
                emojiSpan.style.fontSize = "40px";
                emojiSpan.style.display = "block";
                emojiSpan.style.marginBottom = "10px";

                const itemImage = document.createElement("img");
                itemImage.className = "item-image";
                itemImage.src = item.image;
                itemImage.alt = item.name;

                const itemName = document.createElement("div");
                itemName.className = "item-name";
                itemName.textContent = item.name;

                const itemPrice = document.createElement("div");
                itemPrice.className = "item-price";
                itemPrice.textContent = `قیمت ${item.price}`;

                cardFront.appendChild(emojiSpan);
                cardFront.appendChild(itemImage);
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