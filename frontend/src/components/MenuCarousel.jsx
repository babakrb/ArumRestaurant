import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const MenuCarousel = () => {
  const [menuItems, setMenuItems] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/menu`)
      .then(res => setMenuItems(res.data))
      .catch(err => console.error('Error fetching menu:', err));
  }, []);

  const scroll = (direction) => {
    const scrollAmount = 220;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="container my-5">
      <h2 className="text-center mb-4">🥙 Our Menu</h2>
      <div className="d-flex align-items-center gap-3">
        {/* Left Button */}
        <button
          className="btn btn-dark btn-outline-warning"
          onClick={() => scroll('left')}
          style={{ height: '40px', width: '40px', borderRadius: '50%' }}
        >
          &lt;&lt;
        </button>

        {/* Scrollable Menu */}
        <div
          ref={scrollRef}
          className="d-flex gap-4"
          style={{
            overflowX: 'hidden',
            scrollBehavior: 'smooth',
            flexGrow: 1,
          }}
        >
          {menuItems.map((item, index) => (
            <div key={index} className="card text-center flex-shrink-0" style={{ width: '200px' }}>
              <img
                src={`${item.image}`}
                className="card-img-top"
                alt={item.name}
                style={{ height: '150px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text fw-bold">
                  {item.cat === 'Turkish' ? (
                    <>
                      <p className="card-text fw-bold">Medium: ${item.priceMedium}</p>
                      <p className="card-text fw-bold">Large: ${item.priceLarge}</p>
                    </>
                  ) : (
                      <p className="card-text fw-bold">price:${item.price}</p>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button
          className="btn btn-outline-warning btn-dark"
          onClick={() => scroll('right')}
          style={{ height: '40px', width: '40px', borderRadius: '50%' }}


        >
          &gt;&gt;
        </button>
      </div>
    </section>
  );
};

export default MenuCarousel;