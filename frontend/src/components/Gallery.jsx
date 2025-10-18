import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/gallery`)
      .then(res => setImages(res.data))
      .catch(err => console.error('Error loading gallery:', err));
  }, []);

  if (images.length === 0) return null;

  return (
    <section className="container my-5">
      <h2 className="text-center mb-4 ">🍽️ Image Gallery</h2>
      <div className="d-flex justify-content-center">
        <div
          id="galleryCarousel"
          className="carousel slide shadow rounded overflow-hidden"
          data-bs-ride="carousel"
          style={{ width: '650px', height: '400px' }}
        >
          <div className="carousel-inner">
            {images.map((img, index) => (
              <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <img
                  src={`${img.imageUrl}`}
                  alt={img.caption || `Slide ${index + 1}`}
                  className="d-block w-100"
                  style={{ width: '650px', height: '400px', objectFit: 'cover' }}
                />
                {img.caption && (
                  <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
                    <p className="mb-0 text-light">{img.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#galleryCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#galleryCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;