// Function to decode a polyline string into a list of coordinates
function decodePolyline(polyline) {
    let index = 0, len = polyline.length;
    let lat = 0, lng = 0;
    const coordinates = [];

    while (index < len) {
        let shift = 0, result = 0, byte;
        do {
            byte = polyline.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);
        const deltaLat = (result & 1) ? ~(result >> 1) : (result >> 1);
        lat += deltaLat;

        shift = 0;
        result = 0;
        do {
            byte = polyline.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);
        const deltaLng = (result & 1) ? ~(result >> 1) : (result >> 1);
        lng += deltaLng;

        coordinates.push([lat / 1e5, lng / 1e5]);
    }
    return coordinates;
}

// Function to extract and decode polyline points from the response
function extractAndDecodePolylines(response) {
    const polylines = [];
    response.routes.forEach(route => {
        route.transitions.forEach(transition => {
            if (transition.routePolyline && transition.routePolyline.points) {
                const decodedPolyline = decodePolyline(transition.routePolyline.points);
                polylines.push(decodedPolyline);
            }
        });
    });
    return polylines;
}

module.exports = {
    decodePolyline,
    extractAndDecodePolylines
};


