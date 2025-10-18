import React from 'react';

const menuSheets = [
  {
    id: 1,
    thumb: 'https://res.cloudinary.com/dfs2sqkxy/image/upload/v1760814559/Menu11_cjgec5.jpg',
    full: 'https://res.cloudinary.com/dfs2sqkxy/image/upload/v1760814559/Menu11_cjgec5.jpg',
  },
  {
    id: 2,
    thumb: 'https://res.cloudinary.com/dfs2sqkxy/image/upload/v1760813965/Menu2_rpaugm.jpg',
    full: 'https://res.cloudinary.com/dfs2sqkxy/image/upload/v1760813965/Menu2_rpaugm.jpg',
  },
  {
    id: 3,
    thumb: 'https://res.cloudinary.com/dfs2sqkxy/image/upload/v1760813962/Menu3_cim0d4.jpg',
    full: 'https://res.cloudinary.com/dfs2sqkxy/image/upload/v1760813962/Menu3_cim0d4.jpg',
  },
  {
    id: 4,
    thumb: 'https://res.cloudinary.com/dfs2sqkxy/image/upload/v1760813961/Menu4_d664da.jpg',
    full: 'https://res.cloudinary.com/dfs2sqkxy/image/upload/v1760813961/Menu4_d664da.jpg',
  },
];

const MenuSheetsSection = () => {
  return (
    <div className="container my-5">
      <h3 className="text-center text-warning mb-4">📄 Our Menu Sheets</h3>
      <div className="row g-4" >
        {menuSheets.map(sheet => (
          <div key={sheet.id} className="col-md-6" >
            <a
              href={sheet.full}
              target="_blank"
              rel="noopener noreferrer"
              className="d-block text-center"
            >
              <img
                src={sheet.thumb}
                alt={`Menu Sheet ${sheet.id}`}
                className="img-fluid rounded shadow-sm"
                style={{ maxHeight: '300px',maxWidth:'400px', objectFit: 'cover' }}
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuSheetsSection;
