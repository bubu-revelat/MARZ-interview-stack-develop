import React from 'react';
import { CardProps } from '../interfaces';


const Card= (props: CardProps)=> {
  return (
    <div className='transform transition-transform duration-200 hover:scale-105 bg-light-green rounded-lg p-4 m-2 inline-block border-2 shadow-lg'>
      <img alt='' src={props.image} className='w-[200px] h-[200px]' />
      <div className="relative text-white px-6 pb-6 mt-6">
            <div className="flex justify-between">
                <span className="block font-semibold text-xl">{props.name}</span>
                <span className="block bg-white rounded-full text-red-700 text-xs font-bold px-3 py-2 leading-none flex items-center">#{props.id}</span>
            </div>
        </div>
    </div>
  );
};
export default Card;
export {}