let map, userMarker, deliveryCircle;

function initMap() {
    // Default center (village center)
    const center = { lat: 0, lng: 0 }; // Replace with actual village coordinates
    map = new google.maps.Map(document.getElementById("map"), {
        center: center,
        zoom: 15,
    });

    // Try to get user's current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const userPos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                map.setCenter(userPos);

                // User marker
                userMarker = new google.maps.Marker({
                    position: userPos,
                    map: map,
                    title: "Your Location"
                });

                // Draw 1KM delivery circle
                deliveryCircle = new google.maps.Circle({
                    center: userPos,
                    radius: 1000,
                    map: map,
                    fillColor: '#00FF00',
                    fillOpacity: 0.2,
                    strokeColor: '#00FF00',
                    strokeOpacity: 0.5,
                    strokeWeight: 2
                });

                calculateDelivery(userPos);
            },
            error => {
                alert("Location access denied. Delivery distance calculation may not work.");
            }
        );
    } else {
        alert("Geolocation not supported by your browser.");
    }
}

// ================= DELIVERY CHARGE =================
function calculateDelivery(userPos) {
    // Example: Shop/village center coordinates
    const shopPos = { lat: 0, lng: 0 }; // Replace with actual shop coordinates

    const distance = google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(userPos.lat, userPos.lng),
        new google.maps.LatLng(shopPos.lat, shopPos.lng)
    );

    const distanceKM = distance / 1000;
    let deliveryMsg = "";
    if (distanceKM <= 1) {
        deliveryMsg = "Delivery: Free (under 1KM)";
    } else {
        deliveryMsg = `Delivery charge applies (Distance: ${distanceKM.toFixed(2)} KM)`;
    }

    const infoDiv = document.createElement("div");
    infoDiv.style.padding = "10px";
    infoDiv.style.fontWeight = "bold";
    infoDiv.innerText = deliveryMsg;

    document.getElementById("map").appendChild(infoDiv);
}

// Initialize map on window load
window.onload = initMap;