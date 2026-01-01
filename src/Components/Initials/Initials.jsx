import React from 'react'

export default function Initials({name=''}) {
    let initials=name.split(' ').map(n=>n[0]).join('').toUpperCase()

  return (
       <div className="rounded-full h-8 w-8 md:w-12 md:h-12 bg-green flex items-center justify-center">
                  <p className="text-white font-bold text-shadow-md md:text-lg">
                    {initials}
               
                  </p>
                </div>
  )
}
   