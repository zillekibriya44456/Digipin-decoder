export function SEOContent() {
  return (
    <article className="py-24 bg-black/5 dark:bg-white/5 border-t border-border">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl prose prose-zinc dark:prose-invert prose-lg">
        <h2 className="text-3xl font-bold mb-8">Understanding the DIGIPIN Location Intelligence Ecosystem</h2>
        
        <h3>What is DIGIPIN?</h3>
        <p>
          DIGIPIN is an official, highly precise 10-character alphanumeric addressing system designed to revolutionize spatial identification across India and globally. Unlike traditional addresses that rely on street names and landmarks, a DIGIPIN is directly tied to fixed geospatial coordinates (latitude and longitude), ensuring absolute accuracy down to a 4-meter radius.
        </p>

        <h3>How DIGIPIN Works?</h3>
        <p>
          The DIGIPIN framework divides geographical areas into standardized grid cells. When you use our <strong>Address to DIGIPIN Generator</strong> or <strong>GPS to DIGIPIN</strong> tools, the system detects your exact coordinates and maps them to the corresponding alphanumeric grid cell. This 10-character string (e.g., <code>39J-438-TJC7</code>) contains all the necessary data to reverse-engineer your location without relying on a centralized database.
        </p>

        <h3>Benefits of DIGIPIN</h3>
        <ul>
          <li><strong>Pinpoint Accuracy:</strong> Delivers locations within a 4-meter radius.</li>
          <li><strong>Universal Language:</strong> Eliminates language barriers and confusing local address formats.</li>
          <li><strong>Emergency Response:</strong> Vital for our <strong>SOS Location Sharing</strong> feature, allowing first responders to navigate to your exact GPS location instantly.</li>
          <li><strong>Logistics & Delivery:</strong> Dramatically reduces last-mile delivery failures.</li>
        </ul>

        <h3>Address to DIGIPIN Conversion (Encoder)</h3>
        <p>
          Our platform allows seamless encoding. By typing any standard address or clicking on our interactive maps, the system geocodes the textual input into raw coordinates, and subsequently encodes those coordinates into a globally standard DIGIPIN. You can instantly share this via a QR code or a unique link.
        </p>

        <h3>DIGIPIN to Address Conversion (Decoder)</h3>
        <p>
          The reverse process is equally powerful. Enter any DIGIPIN into our Decoder, and our system reverses the mathematical grid algorithm to extract the exact GPS coordinates. We then reverse-geocode these coordinates to provide you with the closest readable street address, building name, and an interactive routing map.
        </p>

      </div>
    </article>
  )
}
