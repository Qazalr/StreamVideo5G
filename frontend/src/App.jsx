import { useState } from 'react';
import { GrStatusGoodSmall } from "react-icons/gr";

function App() {
  const [showBoostButton, setShowBoostButton] = useState(true);
  const handleBoostClick = () => {
    setShowBoostButton(false);
  };
  const handleStopClick = () => {
    setShowBoostButton(true);
  };

  return (
    <div className='flex flex-col items-center justify-center text-center w-full min-w-full px-32'>
      <div className='flex flex-col w-full justify-start items-start mt-14'>
        <h2 className='top-2 font-bold text-prime text-xl'>Robot ID: 933</h2>
        <h2 className='top-2 font-bold text-prime text-xl'>Camera ID: 482</h2>
        <div className='flex flex-row'>
        <h2 className='top-2 font-bold text-prime text-xl'>Camera Status: Live</h2>
        {<GrStatusGoodSmall className='text-green-500 self-center ml-1'/>}
      </div>
      </div>
        <h1 className='absolute top-2 font-bold text-prime text-3xl'>Live Video Stream using NaC & 5G</h1>
        <img 
          src='http://10.78.14.64:5000/video_feed' 
          className='bg-slate-600 w-[1000px] h-[85vh] mx-auto mt-0 object-cover rounded-lg'
        />
        { showBoostButton ? (  
          <button
            onClick={handleBoostClick}
            className="relative mt-4 px-8 py-2.5 text-lg font-medium bg-sky-400 border-bg rounded shadow-lg transition-all duration-300 ease-in-out hover:bg-bg hover:text-sky-400 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2  focus:ring-sky-300 focus:ring-offset-2"
          >
            QoD Video Boost
          </button>
          ) : (
          <button
            onClick={handleStopClick}
            className="relative mt-4 px-8 py-2.5 text-lg font-medium bg-red-400 border-bg rounded shadow-lg transition-all duration-300 ease-in-out hover:bg-red-900 hover:text-red-50-400 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2  focus:ring-sky-300 focus:ring-offset-2"
          >
            Stop QoD Boost
          </button>
          )}
          <div className='h-4'></div>
    </div>
  )
}
export default App
