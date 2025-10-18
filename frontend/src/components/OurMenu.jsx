import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OurMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCat, setSelectedCat] = useState('');
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/menu`)
      .then(res => {
        setMenuItems(res.data);
        setFilteredItems(res.data);
      })
      .catch(err => console.error('Error loading menu:', err));
  }, []);

  useEffect(() => {
    const filtered = selectedCat
      ? menuItems.filter(item => item.cat === selectedCat)
      : menuItems;
    setFilteredItems(filtered);
    setCurrentPage(1); // reset to first page on filter change
  }, [selectedCat, menuItems]);

  const uniqueCats = [...new Set(menuItems.map(item => item.cat))];
  const totalPages = Math.ceil(filteredItems.length / pageSize);
  const paginatedItems = filteredItems.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="container my-5">
      <h2 className="text-center text-warning mb-4">🍽️ Our Menu</h2>

      {/* Filters */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <label className="me-2">Filter by Category:</label>
          <select
            className="form-select d-inline-block w-auto"
            value={selectedCat}
            onChange={e => setSelectedCat(e.target.value)}
          >
            <option value="">All</option>
            {uniqueCats.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="me-2">Items per page:</label>
          <select
            className="form-select d-inline-block w-auto"
            value={pageSize}
            onChange={e => setPageSize(Number(e.target.value))}
          >
            {[20, 15, 10, 5].map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="row g-4">
        {paginatedItems.map(item => (
          <div key={item._id} className="col-md-4">
            <a
              href={`${process.env.REACT_APP_API_URL}${item.image}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-dark"
            >
              <div className="card shadow-sm h-100">
                <img
                  src={`${item.image}`}
                  alt={item.name}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title text-primary">{item.name}</h5>
                  {item.cat === 'Turkish' ? (
                    <>
                      <p className="card-text fw-bold">Medium: ${item.priceMedium}</p>
                      <p className="card-text fw-bold">Large: ${item.priceLarge}</p>
                    </>
                    ) : (
                      <p className="card-text fw-bold">price:${item.price}</p>
                    )}
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              {[...Array(totalPages)].map((_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default OurMenu;
