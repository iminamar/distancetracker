// // Function to calculate distance between two lat/long pairs using Haversine formula
// function DISTANCE_BETWEEN(lat1, lon1, lat2, lon2) {
//     const earthRadius = 6378000; // Earth's radius in meters
//     const dLat = degreesToRadian(lat2 - lat1);
//     const dLon = degreesToRadian(lon2 - lon1);
//     const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//               Math.cos(degreesToRadian(lat1)) * Math.cos(degreesToRadian(lat2)) *
//               Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return earthRadius * c; // Distance in meters
// }

// // Helper function to convert degrees to radians
// function degreesToRadian(deg) {
//     return deg * Math.PI / 180;
// }

// // Coordinates array (example)
// const coordinates = [
//     { latitude: 52.2296756, longitude: 21.0122287 },
//     { latitude: 41.8919300, longitude: 12.5113300 },
//     // Add more coordinates here
// ];

// // Calculate total distance (in meters) by iterating over the coordinate array
// let total_distance = 0;
// if (coordinates.length > 1) {
//     for (let i = 1; i < coordinates.length; i++) {
//         let lat1 = coordinates[i - 1].latitude;
//         let lon1 = coordinates[i - 1].longitude;
//         let lat2 = coordinates[i].latitude;
//         let lon2 = coordinates[i].longitude;

//         total_distance += DISTANCE_BETWEEN(lat1, lon1, lat2, lon2);
//     }
// }

// console.log("Total Distance:", total_distance, "meters");


// function startTracking() {
//     if (navigator.geolocation) {
//         trackingInterval = setInterval(getLocation, 5000);
//         console.log("started");
//     } else {
//         alert("Geolocation is not supported by this browser.");
//     }
// }



// Function to get the current location and store it in the coordinates array
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Store the coordinates in the array
            coordinates.push({ latitude, longitude });
            console.log(`Stored coordinates: Latitude: ${latitude}, Longitude: ${longitude}`);

            // If there are at least two coordinates, calculate the distance
            if (coordinates.length > 1) {
                const lastIndex = coordinates.length - 1;
                const distance = DISTANCE_BETWEEN(
                    coordinates[lastIndex - 1].latitude,
                    coordinates[lastIndex - 1].longitude,
                    coordinates[lastIndex].latitude,
                    coordinates[lastIndex].longitude
                );
                console.log(`Distance between last two points: ${distance.toFixed(2)} meters`);
            }
        }, function (error) {
            console.error('Error getting location: ' + error.message);
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
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
