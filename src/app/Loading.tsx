import React from 'react'

export default function Loading() {
  
  const bgStyle = {
    backgroundImage: "url(/book.jpeg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className='h-full w-full' style={bgStyle} >
      <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css"/>
      <div className=" bg-white/50 backdrop-blur-3xl h-full flex justify-center items-center">
        <div className='text-5xl animate-spin w-fit'>
          <i className="uil uil-spin"></i>
        </div>
      </div>
    </div>
  )
}
