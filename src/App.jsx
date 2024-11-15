import './App.css'
import { useState } from 'react'
import ImageGallery from './components/Gallery'
import DisplayUI from './components/InteractiveUI'


// function App() {
//   return (
//     <div className='App min-h-screen bg-[#000000] p-4 flex flex-col gap-4 items-center'>
//       <DisplayUI />
//     </div>
//   )
// }

// export default App


const sampleImages = [
  {
    url: 'https://picsum.photos/800/600?random=1',
    alt: 'Beautiful Mountain Landscape'
  },
  {
    url: 'https://picsum.photos/800/600?random=2',
    alt: 'Urban Architecture'
  },
  {
    url: 'https://picsum.photos/800/600?random=3',
    alt: 'Natural Wildlife'
  },
  {
    url: 'https://picsum.photos/800/600?random=4',
    alt: 'Ocean Waves'
  },
  {
    url: 'https://picsum.photos/800/600?random=5',
    alt: 'Desert Sunset'
  },
  {
    url: 'https://picsum.photos/800/600?random=6',
    alt: 'Forest Trail'
  },
  {
    url: 'https://picsum.photos/800/600?random=7',
    alt: 'City Nightlife'
  },
  {
    url: 'https://picsum.photos/800/600?random=8',
    alt: 'Abstract Art'
  }
];

function App() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-3xl mx-auto">
      <ImageGallery images={sampleImages} collapse={false} />

      <ImageGallery images={sampleImages} collapse={true} />
      </div>
    </div>
  );
}

export default App;

