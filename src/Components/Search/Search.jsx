import React, { useState } from 'react'


export default function Search({Search,setSearch}) {

  return (
    <>
            <input onChange={(e)=>setSearch(e.target.value)} type="search" id="search" className="block w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:border-0 focus:outline-none  border-none shadow-sm placeholder:text-body rounded-2xl" placeholder="Search"  />
    </>

    
  )
}
