import React from 'react'
import Link from 'next/link'

export default function HomeBlog() {
  const topics = [
    { icon : "uil uil-robot" , name : "Technology"},
    { icon : "uil uil-plane-departure" , name : "Travel"},
    { icon : "il uil-basketball" , name : "Sport"},
    { icon : "uil uil-dollar-alt" , name : "Business"},
    { icon : "uil uil-fire" , name : "Trends"},
    { icon : "uil uil-newspaper" , name : "News"},

  ]
  return (
    <div className='py-10 text-center'>
      <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css"></link>
      <div>
        <h3 className='font-semibold py-5'>Explore Trending Topics</h3>
        <div className='w-1/2 mx-auto flex flex-wrap justify-center gap-5 py-4'>

          {
            topics.map((item,index)=>(
              <Link key={index} href="" className='p-3 rounded-full border-2 border-black hover:bg-black hover:text-white duration-300 flex items-center space-x-2'>
                <i className={`${item.icon} text-xl`}></i>
                <span className='font-semibold text-lg'>{item.name}</span>
              </Link>
            ))
          }

        </div>
      </div>

    </div>
  )
}
