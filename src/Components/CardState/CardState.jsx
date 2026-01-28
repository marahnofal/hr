import React from 'react';
import { users2 } from '../../assets/data';
export default function CardState({ image, title, records, percentage }) {
  return (
    <>
      <div className="me-5 flex flex-col justify-between rounded-lg border-2 border-gray-200 p-5">
        <div className="flex gap-4">
          <div className="h-5 w-5">
            <img src={image} className="w-full" alt="" />
          </div>
          <h2>{title}</h2>
        </div>
        <div className="flex justify-between">
          <h2 className="text-4xl font-bold">{records}</h2>
          <div className="secondary-bg flex items-center justify-center">
            <i className="fa-solid fa-caret-up icon-color text-lg"></i>
            <p className="text-green"> {percentage}</p>
          </div>
        </div>
        <hr className="w-full text-gray-200" />
        <p className="text-xs  dark:text-gray-500">Upadate:July 16, 2025</p>
      </div>
    </>
  );
}
