📍 DIGIPIN Decoder System

A powerful, modern, and intelligent DIGIPIN-to-Location Decoder that converts any valid DIGIPIN code into exact GPS coordinates and a full real-world address, complete with an interactive map interface and a clean UI — built with Node.js, Express, JavaScript, and Leaflet Maps.

✨ Features 🎯 Core Features

📌 DIGIPIN Decoding – Converts any valid DIGIPIN into exact latitude & longitude 🗺️ Interactive Map View – Automatically zooms to decoded location 📍 Full Address Extraction – Reverse geocoding via Nominatim / Google / Mapbox ⚙️ Backend API – Clean REST endpoint: /api/decode ⚡ Fast Processing – Lightweight and optimized Node.js server 📁 JSON Output Viewer – Displays decoded data clearly 🧪 Error Handling – Handles invalid codes, API errors, and format issues

🤖 Smart Add-ons

🧠 Geocoding Provider Switch – Choose between OpenStreetMap, Google, or Mapbox 📦 Caching Support – Optional Redis-based caching for instant lookups 🚦 Rate Limiting – Protects against spam or automated misuse 🔐 Privacy & Security – DIGIPIN masking & consent notice

🎨 Design Features

🖥️ Modern Clean UI – Simple, minimal, and easy to use 📱 Fully Responsive – Works on desktop, tablet, and mobile 🌓 Dark/Light Friendly – Styled for maximum readability 🗺️ Map Marker Popups – Shows full address on marker 🎨 Attractive Layout – Organized output & highlight blocks

🚀 Getting Started ✅ Prerequisites

Node.js 18+

npm or yarn

(Optional) Google Maps API key

(Optional) Redis server

git clone https://github.com/zillekibriya44456/Digipin-decoder.git cd Digipin-decoder npm install

or
yarn install

npm run dev

or
yarn dev

Now open: 👉 https://digipin-decoder.onrender.com/

📁 Project Structure ├── public/ │ ├── index.html # Main UI │ ├── script.js # Frontend logic │ └── style.css # Optional styles │ ├── server.js # Express backend API ├── package.json ├── .env.example # Env config template ├── Dockerfile # Docker build file ├── docker-compose.yml # Optional Redis support └── README.md 🛠️ Technology Stack

🔧 Backend: Node.js, Express.js 🌐 Geocoding: Nominatim / Google Maps / Mapbox 🗺️ Maps: Leaflet.js + OpenStreetMap 📦 Caching (optional): Redis 🐳 Containerization: Docker 🧪 Testing: Jest + Supertest

POST /api/decode { "digipin": "AB12-CD34E5" }

{ "digipin": "AB12-CD34E5", "coords": { "lat": 12.971599, "lon": 77.594566 }, "geocode": { "provider": "nominatim", "address": "MG Road, Bengaluru, Karnataka, India", "addressDetails": { ... } }, "cached": false }

🌍 Map Integration The frontend uses Leaflet.js to:

Display decoded coordinates on the map

Auto-zoom to the location

Show full address in a popup

🔧 Customization Choose a Geocoding Provider In .env:

ini Copy code

GEOCODER=nominatim

or
GEOCODER=google GOOGLE_API_KEY=your_key

or
GEOCODER=mapbox MAPBOX_TOKEN=your_token

Enable Redis Cache REDIS_URL=redis://localhost:6379 npm run build npm start

📦 Build for Production npm run build npm start

🔐 Environment Variables

Create .env: PORT=4000 GEOCODER=nominatim CONTACT_EMAIL=your-email@example.com

Only if Google/Mapbox used:
GOOGLE_API_KEY= MAPBOX_TOKEN=

Optional Redis:
REDIS_URL=

🤝 Contributing

Contributions, feature improvements, and pull requests are welcome! You can improve UI, add new providers, optimize decoding, or enhance security.

📝 License

This project is open-source and free to modify.

🎯 Roadmap

Future planned upgrades:

🚀 Offline DIGIPIN decoding 📱 Mobile-friendly React/Next.js UI 🗺️ Satellite + terrain map layers 📥 QR code → DIGIPIN scanning 🌐 Bulk decode (admin-protected) 📍 Address verification engine

🙏 Acknowledgments

Built with modern web technologies and inspired by India Post’s Digital Address innovations. Made with ❤️ by Zille Kibriya (Technical Ilahi).

Authors
Zille Kibriya

Contributing
Contributions are always welcome!

See contributing.md for ways to get started.

Please adhere to this project's code of conduct.

Deployment
To deploy this project run

  npm run deploy
Environment Variables
To run this project, you will need to add the following environment variables to your .env file

API_KEY

ANOTHER_API_KEY

🚀 About Me
I’m Zille Kibriya (Technical Ilahi), a 21-year-old Computer Science Engineering student at Sri Krishna Institute of Technology, Bengaluru. I build AI-powered apps and web projects (including hospital management systems and the BrahmaGuard flood-alert idea), write tech blogs, and run the YouTube channel Technical Ilahi. I’m skilled in Python, Java, C, SQL, Linux, Git, cybersecurity, and Google Cloud — and I also run a refurbished laptop import/export business.

🔗 Social media links
https://www.instagram.com/mr.zille_ilahi/?hl=en

https://x.com/kibriya_zille

https://www.linkedin.com/in/zille-kibriya-3168b91a7/

Installation
Install my-project with npm

  npm install my-project
  cd my-project
Optimizations
What optimizations did you make in your code? E.g. refactors, performance improvements, accessibility

Support
zillekibriya44456@gmail.com

Tech Stack
Client: React, Redux, TailwindCSS

Server: Node, Express
