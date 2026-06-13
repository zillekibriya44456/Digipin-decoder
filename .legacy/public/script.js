const digipinInput = document.getElementById('digipin-input');
const decodeBtn = document.getElementById('decode-btn');
const errorMessage = document.getElementById('error-message');
const resultSection = document.getElementById('result-section');
const copyBtn = document.getElementById('copy-btn');

// Result Elements
const resStreet = document.getElementById('res-street');
const resCity = document.getElementById('res-city');
const resState = document.getElementById('res-state');
const resPincode = document.getElementById('res-pincode');
const resAddress = document.getElementById('res-address');

let map;
let marker;

// Initialize Map with CartoDB Voyager Tiles (Cleaner look)
function initMap() {
    map = L.map('map', {
        zoomControl: false
    }).setView([20.5937, 78.9629], 5);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    L.control.zoom({
        position: 'bottomright'
    }).addTo(map);
}

// initMap(); // Removed immediate call

decodeBtn.addEventListener('click', handleDecode);
digipinInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleDecode();
});

copyBtn.addEventListener('click', () => {
    const text = resAddress.textContent;
    navigator.clipboard.writeText(text).then(() => {
        const originalIcon = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
        setTimeout(() => {
            copyBtn.innerHTML = originalIcon;
        }, 2000);
    });
});

async function handleDecode() {
    const digipin = digipinInput.value.trim();

    if (!digipin) {
        showError('Please enter a DIGIPIN.');
        return;
    }

    hideError();
    decodeBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Decoding...';
    decodeBtn.disabled = true;

    try {
        const response = await fetch('/decode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ digipin })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to decode DIGIPIN');
        }

        console.log('Received data:', data);
        displayResult(data);

    } catch (error) {
        showError(error.message);
        resultSection.classList.add('hidden');
    } finally {
        decodeBtn.innerHTML = 'Decode <i class="fa-solid fa-arrow-right"></i>';
        decodeBtn.disabled = false;
    }
}

function displayResult(data) {
    resultSection.classList.remove('hidden');

    // Initialize map if not already done, now that container is visible
    if (!map) {
        initMap();
    } else {
        map.invalidateSize();
    }

    // Update Details
    const details = data.addressDetails || {};
    resStreet.textContent = details.street || details.neighborhood || 'N/A';
    resCity.textContent = details.city || 'N/A';
    resState.textContent = details.state || 'N/A';
    resPincode.textContent = details.postal_code || 'N/A';
    resAddress.textContent = data.address || 'Address not found';

    const lat = parseFloat(data.latitude);
    const lon = parseFloat(data.longitude);

    if (isNaN(lat) || isNaN(lon)) {
        console.error('Invalid coordinates:', data);
        throw new Error(`Received invalid coordinates: ${JSON.stringify(data)}`);
    }

    // Update Map
    if (marker) {
        map.removeLayer(marker);
    }

    // Custom Icon
    const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="background-color: #6366f1; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(99,102,241,0.5);"></div>`,
        iconSize: [26, 26],
        iconAnchor: [13, 13]
    });

    marker = L.marker([lat, lon], { icon: customIcon }).addTo(map)
        .bindPopup(`<b>${data.digipin}</b><br>${details.city || ''}`)
        .openPopup();

    map.flyTo([lat, lon], 16, {
        animate: true,
        duration: 1.5
    });
}

function showError(msg) {
    errorMessage.textContent = msg;
    errorMessage.classList.remove('hidden');
}

function hideError() {
    errorMessage.classList.add('hidden');
}
