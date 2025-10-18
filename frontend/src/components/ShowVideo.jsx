import React from 'react';

const ShowVideo = ({ src, title = 'Video Preview', width = '100%', height = '400px' }) => {
  if (!src) return <p className="text-danger">⚠️ No video source provided.</p>;

  return (
    <div className="p-0">
      <h2 className="text-center mb-4 ">{title}</h2>
      <div
        className="shadow rounded overflow-hidden"
        style={{
          width: width,
          height: height,
          backgroundColor: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <video
          controls
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default ShowVideo;
