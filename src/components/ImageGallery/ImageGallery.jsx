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
        <div className="p-4 flex justify-between items-center bg-zinc-900">
          <h2 className="text-zinc-300 text-xl font-semibold">Gallery</h2>
          <button 
            onClick={() => setShowGalleryOverlay(false)}
            className="text-zinc-500 hover:text-yellow-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center p-4 bg-black">
          <div className={`relative ${isMobile ? 'w-full' : 'max-w-4xl w-full'}`}>
            <img
              src={`data:image/png;base64,${base64Images[selectedImageIndex].image_base64}`}
              className={`w-full object-contain ${isMobile ? 'max-h-[50vh]' : 'max-h-[70vh]'}`}
            />
            
            {base64Images.length > 1 && (
              <>
                <button 
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-zinc-700 hover:bg-yellow-500 p-2 rounded-l text-zinc-300"
                  onClick={() => setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : base64Images.length - 1))}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-zinc-700 hover:bg-yellow-500 p-2 rounded-r text-zinc-300"
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
                    ${selectedImageIndex === index ? 'border-zinc-300' : 'border-zinc-700'}`}
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
        <div className="bg-zinc-900 p-2 mb-4 rounded-lg flex items-center gap-2 max-w-fit">
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
            className="flex items-center gap-1 bg-black hover:bg-zinc-300 transition-colors rounded-lg px-3 py-1.5 border border-zinc-700"
          >
            <span className="text-zinc-400 text-sm hover:text-yellow-500">show images</span>
          </button>
        </div>
        {showGalleryOverlay && <GalleryOverlay />}
      </>
    );
  }

  return (
    <>
      <div className="min-h-full bg-black">
        {/* Large Screen Layout */}
        <div className="hidden lg:block mx-auto my-auto max-w-md bg-black p-6">
          <div className="mb-4 rounded-lg border border-zinc-700 p-1 cursor-pointer hover:border-zinc-400 transition-colors"
               onClick={() => setShowGalleryOverlay(true)}>
            <img
              src={`data:image/png;base64,${base64Images[0]?.image_base64}`}
              className="mx-auto"
            />
          </div>

          <div className="mb-2 grid grid-cols-2 gap-4">
            {base64Images.slice(1, 3).map((image, index) => (
              <div 
                key={index} 
                className={`rounded-lg border border-zinc-700 p-1 cursor-pointer hover:border-zinc-400 transition-colors
                  ${index === 1 ? 'bg-zinc-900' : ''}`}
                onClick={() => {
                  setSelectedImageIndex(index + 1);
                  setShowGalleryOverlay(true);
                }}
              >
                <img
                  src={`data:image/png;base64,${image.image_base64}`}
                  className="mx-auto object-cover"
                />
              </div>
            ))}
          </div>

          {base64Images.length > 3 && (
            <div className="mb-4 flex items-center gap-2">
              {base64Images.slice(3, 6).map((image, index) => (
                <div 
                  key={index} 
                  className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 p-1 cursor-pointer hover:border-zinc-400 transition-colors"
                  onClick={() => {
                    setSelectedImageIndex(index + 3);
                    setShowGalleryOverlay(true);
                  }}
                >
                  <img
                    src={`data:image/png;base64,${image.image_base64}`}
                    className="mx-auto"
                  />
                </div>
              ))}
              <button 
                onClick={() => setShowGalleryOverlay(true)}
                className="flex flex-1 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-700 p-1 pl-2 text-zinc-400 hover:border-zinc-400 transition-colors"
              >
                View More
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Medium Screen Layout */}
        <div className="hidden md:block lg:hidden bg-black p-4 max-w-sm mx-auto">
          {base64Images.slice(0, 3).map((image, index) => (
            <div 
              key={index} 
              className={`rounded-lg p-1 mb-4 cursor-pointer border border-zinc-700 hover:border-zinc-400 transition-colors
                ${index === 2 ? 'bg-zinc-900' : 'bg-zinc-800'}`}
              onClick={() => {
                setSelectedImageIndex(index);
                setShowGalleryOverlay(true);
              }}
            >
              <img
                src={`data:image/png;base64,${image.image_base64}`}
                className="mx-auto"
              />
            </div>
          ))}

          {base64Images.length > 3 && (
            <div className="bg-zinc-900 rounded-lg p-1 mb-4 flex items-center justify-between gap-2 border border-zinc-700">
              {base64Images.slice(3, 6).map((image, index) => (
                <img
                  key={index}
                  src={`data:image/png;base64,${image.image_base64}`}
                  className={`cursor-pointer ${index === 0 ? 'w-14 rounded' : 'max-h-10 rounded'}`}
                  onClick={() => {
                    setSelectedImageIndex(index + 3);
                    setShowGalleryOverlay(true);
                  }}
                />
              ))}
              <div 
                className="flex items-center gap-1 text-zinc-400 text-sm ml-auto cursor-pointer hover:text-zinc-300"
                onClick={() => setShowGalleryOverlay(true)}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path d="M2 10a2 2 0 114 0 2 2 0 01-4 0z"/>
                  <path d="M14 10a2 2 0 114 0 2 2 0 01-4 0z"/>
                </svg>
                View More
              </div>
            </div>
          )}
        </div>

        {/* Small Screen Layout */}
        <div className="block md:hidden bg-black p-4">
          <div className="overflow-x-auto">
            <div className="flex gap-3 pb-2">
              {base64Images.map((image, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 w-32 cursor-pointer"
                  onClick={() => {
                    setSelectedImageIndex(index);
                    setShowGalleryOverlay(true);
                  }}
                >
                  <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-1 h-24 hover:border-zinc-400 transition-colors">
                    <img
                      src={`data:image/png;base64,${image.image_base64}`}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showGalleryOverlay && <GalleryOverlay />}
    </>
  );
};

export default ImageGallery;