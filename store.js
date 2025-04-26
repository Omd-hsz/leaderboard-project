document.addEventListener('DOMContentLoaded', function () {
    const storeHTML = document.getElementById("store-section");

    fetch('store.html')
        .then(response => response.text())
        .then(storeTemplate => {
            storeHTML.innerHTML = storeTemplate;
            addStoreItems();
        });

    function addStoreItems() {
        function getRandomEmoji() {
            const emojis = ["😀", "🚀", "🎮", "🎁", "💎", "🏆", "⭐️", "🔥", "💫", "🎯", "🎨", "🎭", "🎧", "📱", "🎪"];
            return emojis[Math.floor(Math.random() * emojis.length)];
        }

        const storeItems = [
            {
                name: "Premium Avatar",
                image: "https://via.placeholder.com/240x200",
                price: 500,
                qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=item1",
            },
            {
                name: "Special Badge",
                image: "https://via.placeholder.com/240x200",
                price: 300,
                qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=item2",
            },
            {
                name: "Extra Points",
                image: "https://via.placeholder.com/240x200",
                price: 200,
                qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=item3",
            },
            {
                name: "Unique Theme",
                image: "https://via.placeholder.com/240x200",
                price: 450,
                qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=item4",
            },
        ];

        const storeContainer = document.getElementById("store-container");

        storeItems.forEach((item) => {
            const card = document.createElement("div");
            card.className = "item-card";

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

            storeContainer.appendChild(card);
        });
    }
});