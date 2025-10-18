import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const MenuManager = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    priceMedium: '',
    priceLarge: '',
    cat: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [selectedCat, setSelectedCat] = useState('');
  const [message, setMessage] = useState('');
  const formRef = useRef(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/menu`)
      .then(res => setMenuItems(res.data))
      .catch(err => console.error('Error fetching menu:', err));
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = e => {
    setImageFile(e.target.files[0]);
  };

  const resetForm = () => {
    setFormData({ name: '', price: '', priceMedium: '', priceLarge: '', cat: '' });
    setImageFile(null);
    setEditingId(null);
  };

  const showMessage = (msg, timeout = 3000) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), timeout);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', formData.name);
    form.append('cat', formData.cat);

    if (formData.cat === 'Turkish') {
      form.append('priceMedium', formData.priceMedium);
      form.append('priceLarge', formData.priceLarge);
    } else {
      form.append('price', formData.price);
    }

    if (imageFile) form.append('image', imageFile);

    const url = editingId
      ? `${process.env.REACT_APP_API_URL}/api/menu/${editingId}`
      : `${process.env.REACT_APP_API_URL}/api/menu`;
    const method = editingId ? 'put' : 'post';

    axios[method](url, form)
      .then(() => {
        fetchMenu();
        resetForm();
        showMessage(editingId ? 'Item updated successfully!' : 'Item added successfully!');
        // اسکرول به فرم بعد از add/update
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
      })
      .catch(err => {
        console.error('Error saving item:', err);
        showMessage('Error saving item. Please try again.');
      });
  };

  const handleEdit = item => {
    setFormData({
      name: item.name,
      price: item.price || '',
      priceMedium: item.priceMedium || '',
      priceLarge: item.priceLarge || '',
      cat: item.cat,
    });
    setEditingId(item._id);
    // اسکرول به فرم هنگام Edit
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDelete = id => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      axios.delete(`${process.env.REACT_APP_API_URL}/api/menu/${id}`)
        .then(() => {
          fetchMenu();
          showMessage('Item deleted successfully!');
        })
        .catch(err => {
          console.error('Error deleting item:', err);
          showMessage('Error deleting item.');
        });
    }
  };

  const filteredItems = selectedCat
    ? menuItems.filter(item => item.cat === selectedCat)
    : menuItems;

  const uniqueCats = [...new Set(menuItems.map(item => item.cat))];

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">🍽️ Manage Menu</h2>

      {/* پیام موفقیت/خطا */}
      {message && (
        <div className="alert alert-info text-center">{message}</div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-4" ref={formRef}>
        <div className="row g-3">
          <div className="col-md-2">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Food Name"
              required
            />
          </div>

          {formData.cat !== 'Turkish' && (
            <div className="col-md-2">
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="form-control"
                placeholder="Price"
                required
              />
            </div>
          )}

          {formData.cat === 'Turkish' && (
            <>
              <div className="col-md-2">
                <input
                  type="text"
                  name="priceMedium"
                  value={formData.priceMedium}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Price Medium"
                  required
                />
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  name="priceLarge"
                  value={formData.priceLarge}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Price Large"
                  required
                />
              </div>
            </>
          )}

          <div className="col-md-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="form-control"
            />
          </div>

          <div className="col-md-2">
            <input
              type="text"
              name="cat"
              value={formData.cat}
              onChange={handleChange}
              className="form-control"
              placeholder="Category"
              required
            />
          </div>

          <div className="col-md-1 d-grid">
            <button type="submit" className="btn btn-success">
              {editingId ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
      </form>

      {/* Filter */}
      <div className="mb-3">
        <select
          className="form-select w-auto"
          value={selectedCat}
          onChange={e => setSelectedCat(e.target.value)}
        >
          <option value="">All Categories</option>
          {uniqueCats.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Menu List */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map(item => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>
                  {item.cat === 'Turkish' ? (
                    <>
                      <div>Medium: ${item.priceMedium}</div>
                      <div>Large: ${item.priceLarge}</div>
                    </>
                  ) : (
                    <div>${item.price}</div>
                  )}
                </td>
                <td>
                  <img
                    src={`${item.image}`}
                    alt={item.name}
                    style={{ width: '80px', height: '60px', objectFit: 'cover' }}
                  />
                </td>
                <td>{item.cat}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MenuManager;
