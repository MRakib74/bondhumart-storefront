export default function Footer() {
  return (
    <footer className="footer mt-[60px] md:mt-0">
      <div className="footer-grid three-cols">
        <div className="footer-col">
          <h1 className="text-white text-3xl font-black mb-4">Bondhumart</h1>
          <p>
            Your trusted online shop. Fast cash on delivery nationwide. Quality products at the best prices.
          </p>
          <div className="footer-socials">
            <a href="https://wa.me/8801861382534" target="_blank" rel="noreferrer"><i className="fab fa-whatsapp"></i></a>
            <a href="#" target="_blank" rel="noreferrer"><i className="fab fa-facebook-f"></i></a>
            <a href="#" target="_blank" rel="noreferrer"><i className="fab fa-youtube"></i></a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/return-policy">Return Policy</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms & Conditions</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact Info</h4>
          <p>
            <i className="fas fa-map-marker-alt w-5 text-center"></i> Dhaka, Bangladesh<br/>
            <i className="fas fa-phone-alt w-5 text-center mt-2"></i> Call: 01861382534<br/>
            <i className="fas fa-envelope w-5 text-center mt-2"></i> Email: info@bondhumart.com
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()}. All rights reserved. Design by Bondhumart
      </div>
    </footer>
  )
}
