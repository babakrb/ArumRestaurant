import React from 'react';

const ReviewSection = () => {
  return (
    <section className="bg-light py-5">
      <div className="container">
        <h2 className="text-center mb-4">Customer Reviews</h2>
        <div className="card mx-auto" style={{ maxWidth: '600px' }}>
          <div className="card-body">
            <p className="card-text">
              "Absolutely delicious. The kebabs are mouth-wateringly good and bursting with flavours. Arume Kebab is my new go-to spot for lunch!"
            </p>
            <footer className="blockquote-footer">Mark J. <cite title="Review Date">March 7</cite></footer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;