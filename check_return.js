const { getDigiPin, getLatLngFromDigiPin } = require('digipinjs');

try {
    // Encode New Delhi coordinates
    const pin = getDigiPin(28.6139, 77.2090);
    console.log('Generated PIN:', pin);

    // Decode back
    const decoded = getLatLngFromDigiPin(pin);
    console.log('Decoded:', decoded);
} catch (e) {
    console.error(e);
}
