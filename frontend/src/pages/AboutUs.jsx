import React from 'react';

const AboutUs = () => {
  return (
    <section className="container my-5">
      {/* Title */}
      <div className="text-center mb-4">
        <h2 className="text-warning fw-bold">👨‍🍳 About Us</h2>
        <div className="mx-auto" style={{ width: '80px', height: '4px', background: 'linear-gradient(to right, #ffc107, #ff8c00)', borderRadius: '2px' }}></div>
      </div>

      {/* Content */}
      <div className="row align-items-center g-5">
        {/* Text Section */}
        <div className="col-md-6">
          <p className="lead text-muted">
            At <strong>Arume Kebab and Takeaway</strong>, we bring the rich flavors of Middle Eastern cuisine to the heart of West Harbour, Auckland. Our journey began with a passion for authentic recipes, fresh ingredients, and a commitment to serving our community with love and care.
          </p>
          <p>
            Whether you're craving a juicy lamb kebab, a crispy chicken wrap, or a hearty mixed platter, our menu is crafted to satisfy every taste. We believe food should be more than just a meal—it should be an experience.
          </p>
          <p>
            Family-owned and proudly local, we welcome you to enjoy our cozy atmosphere, friendly service, and unforgettable flavors. Come hungry, leave happy!
          </p>
        </div>

        {/* Image Section */}
        <div className="col-md-6">
          <img
            src="/images/about-us.jpg"
            alt="Arume Kebab Team"
            className="img-fluid rounded shadow"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;