// ================= MENU DATA =================
const menuData = {
    "hotelHarsh": [
        {name: "Chicken Biryani", full: 180, half: 135, img: "images/chicken_biryani.png"},
        {name: "Veg Biryani", full: 150, half: 113, img: "images/veg_biryani.png"},
        {name: "Beef Biryani", full: 200, half: 150, img: "images/beef_biryani.png"},
        {name: "Chicken Gravy", full: 100, img: "images/chicken_gravy.png"},
        {name: "Tandoori Roti", full: 30, img: "images/tandoori_roti.png"},
        {name: "Rumali Roti", full: 20, img: "images/rumali_roti.png"}
    ],
    "redDragon": [
        {name: "Chicken Triple Rice", full: 160, half: 80, img: "images/triple_rice.png"},
        {name: "Chicken Rice", full: 120, half: 60, img: "images/chicken_rice.png"},
        {name: "Chicken Lollipop", full: 140, half: 70, img: "images/lollipop.png"},
        {name: "Gobi Manchurian", full: 120, half: 60, img: "images/gobi.png"},
        {name: "Chicken Chilli", full: 150, half: 90, img: "images/chicken_chilli.png"},
        {name: "Thousand Rice", full: 200, half: 100, img: "images/thousand_rice.png"}
    ],
    "cafes": [
        {name: "Bhel", full: 50, img: "images/bhel.png"},
        {name: "Burger", full: 80, img: "images/burger.png"},
        {name: "Pizza", full: 120, img: "images/pizza.png"},
        {name: "Cold Coffee", full: 60, img: "images/coffee.png"}
    ]
};

// ================= FUNCTION TO LOAD MENU =================
function loadMenu(sectionId, items) {
    const section = document.getElementById(sectionId);
    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item';

        // Image
        const img = document.createElement('img');
        img.src = item.img;
        div.appendChild(img);

        // Name + Price
        const details = document.createElement('div');
        let priceText = item.half ? `Full ₹${item.full} | Half ₹${item.half}` : `₹${item.full}`;
        details.innerHTML = `${item.name}<br><span class="price">${priceText}</span>`;
        div.appendChild(details);

        // Click event for WhatsApp order
        div.addEventListener('click', () => {
            orderWhatsApp(item.name, item.full, item.half);
        });

        section.appendChild(div);
    });
}

// ================= FUNCTION TO OPEN WHATSAPP =================
function orderWhatsApp(itemName, fullPrice, halfPrice) {
    let message = `Order: ${itemName} `;
    if(halfPrice){
        message += `(Full ₹${fullPrice} / Half ₹${halfPrice})`;
    } else {
        message += `(₹${fullPrice})`;
    }
    message += " - MAN-O-SALWA";

    // Open WhatsApp
    window.open(`https://wa.me/917057942815?text=${encodeURIComponent(message)}`);
}

// ================= INITIALIZE =================
window.onload = function(){
    loadMenu('hotel-harsh', menuData.hotelHarsh);
    loadMenu('red-dragon', menuData.redDragon);
    loadMenu('cafes', menuData.cafes);
};