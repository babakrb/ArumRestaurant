import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-4 mt-5 shadow-lg" id="ftr">
      <div className="container">
        <div className="row g-4 align-items-center">
          {/* Left Column: Contact Info + Social Media */}
          <div className="col-md-6">
            <h5 className="text-warning mb-3">📍 Visit Us</h5>
            <ul className="list-unstyled">
              <li><strong>Phone:</strong> <a href="tel:093200675" className="text-light text-decoration-none">093200675</a></li>
              <li><strong>Address:</strong> 45 Luckens Road, West Harbour, Auckland 0618</li>
              <li><strong>Hours:</strong> Tue–Sun: 10:30am – 9pm<br />❌ Closed on Monday</li>
            </ul>

            {/* Social Media */}
            <div className="mt-3">
              <h6 className="text-warning">Follow Us</h6>
              <a
                href="https://www.facebook.com/people/Arum-Kebabs-West-Harbour/100054335636773"
                target="_blank"
                rel="noopener noreferrer"
                className="me-3 text-light fs-5"
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="https://www.instagram.com/arumkebabs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light fs-5"
              >
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>

          {/* Right Column: Google Map */}
          <div className="col-md-6">
            <h5 className="text-warning mb-3">🗺️ Find Us on the Map</h5>
            <div className="rounded overflow-hidden border border-secondary" style={{ width: '100%', height: '300px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3155.013833862962!2d174.6359!3d-36.8183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d0d3f5b7f9e3c9b%3A0x123456789abcdef!2s45%20Luckens%20Road%2C%20West%20Harbour%2C%20Auckland%200618!5e0!3m2!1sen!2snz!4v1690000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Arume Kebab Location"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-4 border-top pt-3"  >
          <small className="text-white">© {new Date().getFullYear()} Arume Kebab and Takeaway. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
