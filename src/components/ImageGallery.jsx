import { useState, useEffect } from 'react';

const ImageGallery = ({ base64Images, genUIisDisplayed }) => {
  const [collapse, setCollapse] = useState(false);
  const [showGalleryOverlay, setShowGalleryOverlay] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (genUIisDisplayed) {
      setCollapse(true);
    }
  }, [genUIisDisplayed]);

  const GalleryOverlay = () => (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-50 overflow-auto">
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div className="p-4 flex justify-between items-center bg-zinc-900">
          <h2 className="text-yellow-400 text-xl font-semibold">Gallery</h2>
          <button 
            onClick={() => setShowGalleryOverlay(false)}
            className="text-yellow-400 hover:text-yellow-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Main Image */}
        <div className="flex-1 flex items-center justify-center p-4 bg-black">
          <div className={`relative ${isMobile ? 'w-full' : 'max-w-4xl w-full'}`}>
            <img
              src={`data:image/png;base64,${base64Images[selectedImageIndex].image_base64}`}
              className={`w-full object-contain ${isMobile ? 'max-h-[50vh]' : 'max-h-[70vh]'}`}
            />
            
            {base64Images.length > 1 && (
              <>
                <button 
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-zinc-900 hover:bg-zinc-800 p-2 rounded-r text-yellow-400"
                  onClick={() => setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : base64Images.length - 1))}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-zinc-900 hover:bg-zinc-800 p-2 rounded-l text-yellow-400"
                  onClick={() => setSelectedImageIndex((prev) => (prev < base64Images.length - 1 ? prev + 1 : 0))}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>

        {base64Images.length > 1 && (
          <div className="p-4 bg-zinc-900">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {base64Images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 ${isMobile ? 'w-16 h-16' : 'w-20 h-20'} rounded-lg overflow-hidden border-2 
                    ${selectedImageIndex === index ? 'border-yellow-400' : 'border-zinc-700'}`}
                >
                  <img
                    src={`data:image/png;base64,${image.image_base64}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (collapse) {
    return (
      <>
        <div className="bg-zinc-900 p-2 mb-4 rounded-full flex items-center gap-2 max-w-fit">
          <div className="flex items-center gap-1.5">
            {base64Images.slice(0, 3).map((image, index) => (
              <div 
                key={index} 
                className="w-8 h-8 rounded-lg bg-black overflow-hidden cursor-pointer border border-zinc-700"
                onClick={() => {
                  setSelectedImageIndex(index);
                  setShowGalleryOverlay(true);
                }}
              >
                <img
                  src={`data:image/png;base64,${image.image_base64}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <button 
            onClick={() => setShowGalleryOverlay(true)}
            className="flex items-center gap-1 bg-black hover:bg-zinc-800 transition-colors rounded-full px-3 py-1.5 border border-zinc-700"
          >
            <span className="text-yellow-400 text-sm">show images</span>
          </button>
        </div>
        {showGalleryOverlay && <GalleryOverlay />}
      </>
    );
  }

  const imagesToDisplay = base64Images.slice(0, 3);

  return (
    <>
      <div className="bg-black mb-4">
        <div className="p-4">
          <div className={`grid gap-4 ${
            imagesToDisplay.length === 1 ? 'grid-cols-1' : 
            imagesToDisplay.length === 2 ? 'grid-cols-2' : 
            'grid-cols-2 md:grid-cols-3'
          }`}>
            {imagesToDisplay.map((image, index) => (
              <div 
                key={index} 
                className={`relative cursor-pointer ${
                  imagesToDisplay.length === 1 ? 'col-span-1' :
                  index === 0 && imagesToDisplay.length === 3 ? 'col-span-2 md:col-span-1' : ''
                }`}
                onClick={() => {
                  setSelectedImageIndex(index);
                  setShowGalleryOverlay(true);
                }}
              >
                <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-1 hover:border-yellow-400 transition-colors aspect-video">
                  <img
                    src={`data:image/png;base64,${image.image_base64}`}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              </div>
            ))}
            {base64Images.length > 3 && (
              <button 
                onClick={() => setShowGalleryOverlay(true)}
                className="bg-zinc-900 hover:bg-zinc-800 text-yellow-400 px-4 py-2 rounded-lg border border-zinc-700"
              >
                View All Images ({base64Images.length})
              </button>
            )}
          </div>
        </div>
      </div>
      {showGalleryOverlay && <GalleryOverlay />}
    </>
  );
};

export default ImageGallery;
