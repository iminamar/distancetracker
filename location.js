// Function to get the current location and store it in the coordinates array
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Store the coordinates in the array
            coordinates.push({ latitude, longitude });
            displayCoordinates(latitude, longitude);

            // If there are at least two coordinates, calculate the distance
            if (coordinates.length > 1) {
                const lastIndex = coordinates.length - 1;
                const distance = DISTANCE_BETWEEN(
                    coordinates[lastIndex - 1].latitude,
                    coordinates[lastIndex - 1].longitude,
                    coordinates[lastIndex].latitude,
                    coordinates[lastIndex].longitude
                );
                console.log('Distance calculated:', distance);
                displayDistance(distance);
            }
        }, function (error) {
            console.error('Error getting location: ' + error.message);
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}

// Function to display coordinates in the list
function displayCoordinates(latitude, longitude) {
    const coordinatesList = document.getElementById('coordinates-list');
    const newCoordinateItem = document.createElement('li');
    newCoordinateItem.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
    coordinatesList.appendChild(newCoordinateItem);
}

// Function to display the calculated distance
function displayDistance(distance) {
    const distanceOutput = document.getElementById('distance-output');
    distanceOutput.textContent = `${distance.toFixed(2)} meters`;
}

// Haversine formula to calculate the distance between two latitude/longitude points
function DISTANCE_BETWEEN(lat1, lon1, lat2, lon2) {
    const earthRadius = 6378000; // Radius of the Earth in meters
    const dLat = degreesToRadian(lat2 - lat1);
    const dLon = degreesToRadian(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degreesToRadian(lat1)) * Math.cos(degreesToRadian(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadius * c; // Distance in meters
}

// Convert degrees to radians
function degreesToRadian(deg) {
    return deg * Math.PI / 180;
}

// Array to store coordinates (latitude, longitude)
const coordinates = [];

// Call the getLocation function every 5 seconds
setInterval(getLocation, 5000); // 5000 ms = 5 seconds
