import React from 'react';
import Header from '../components/Header';
import MenuCarousel from '../components/MenuCarousel';
import ReviewSection from '../components/ReviewSection';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';
import ShowVideo from '../components/ShowVideo';
import MenuSheetSection from '../components/MenuSheetSection';

const HomePage = () => {
  return (
    <>
      <MenuCarousel />
      <MenuSheetSection />
      {/* Side-by-side layout with vertical alignment */}
      <div className="container my-5">
  <div className="row">
    {/* Gallery Section */}
    <div className="col-md-6 d-flex flex-column justify-content-center">
      <Gallery />
    </div>

    {/* Video Section */}
    <div className="col-md-6 d-flex flex-column justify-content-center">
      <ShowVideo
        src="https://res.cloudinary.com/dfs2sqkxy/video/upload/v1760813778/Video_wv4on8.mp4"
        title="Welcome to Arum Kebab!"
        width="100%"
      />
    </div>
  </div>
</div>


    
      
    </>
  );
};

export default HomePage;
