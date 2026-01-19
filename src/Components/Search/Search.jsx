import React, { useState } from 'react';

export default function Search({ Search, setSearch }) {
  return (
    <>
      <input
        onChange={(e) => setSearch(e.target.value)}
        type="search"
        id="search"
        className="bg-neutral-secondary-medium border-default-medium text-heading rounded-base placeholder:text-body block w-full rounded-2xl border border-none p-3 ps-9 text-sm shadow-sm focus:border-0 focus:outline-none"
        placeholder="Search"
      />
    </>
  );
}
