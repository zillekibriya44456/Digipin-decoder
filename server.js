const express = require('express');
const cors = require('cors');
const { getLatLngFromDigiPin } = require('digipinjs');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/decode', async (req, res) => {
    const { digipin } = req.body;

    if (!digipin) {
        return res.status(400).json({ error: 'DIGIPIN is required' });
    }

    try {
        console.log('Decoding PIN:', digipin);
        const decoded = getLatLngFromDigiPin(digipin);
        console.log('Decoded result:', decoded);

        if (!decoded) {
            return res.status(400).json({ error: 'Invalid DIGIPIN' });
        }

        const { latitude, longitude } = decoded;

        // Reverse Geocoding using Nominatim (OpenStreetMap)
        const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

        let address = 'Address not found';
        let addressDetails = {};

        try {
            const response = await axios.get(nominatimUrl, {
                headers: {
                    'User-Agent': 'DigiPinDecoder/1.0'
                }
            });
            if (response.data && response.data.address) {
                address = response.data.display_name;
                addressDetails = {
                    street: response.data.address.road || response.data.address.pedestrian || '',
                    neighborhood: response.data.address.suburb || response.data.address.neighbourhood || '',
                    city: response.data.address.city || response.data.address.town || response.data.address.village || '',
                    state: response.data.address.state || '',
                    postal_code: response.data.address.postcode || '',
                    country: response.data.address.country || ''
                };
            }
        } catch (geoError) {
            console.error('Geocoding error:', geoError.message);
            // Continue even if geocoding fails, returning coordinates
        }

        res.json({
            digipin,
            latitude,
            longitude,
            address,
            addressDetails
        });

    } catch (error) {
        console.error('Decoding error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
