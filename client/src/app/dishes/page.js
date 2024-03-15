// "use client";
// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';

// export default function Home() {
//   const Dishes = () => {
//     const [dishes, setDishes] = useState([]);

//     useEffect( () => {
//        fetch("http://localhost:3001/user/dishes")
//         .then((res) => res.json())
//         .then((data) => {
//           setDishes(data);
//         });
//     }, []);

//     return dishes;
//   };

//   const dishCards = Dishes().map((dish, index) => {
//     return (
//       <div
//         key={index}
//         className="md:max-xl:flex min-w-[230px] mt-6 mb-6 mx-3 rounded-lg w-[230px] pt-6 pr-4 pb-2 pl-2 px-8 py-12 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110"
//       >
//         <Link href={`./dishes/${dish._id}`}>
//           <img
//             className="rounded-lg w-130 h-80"
//             src={dish.dishImage}
//             alt={dish.dishName}
//           />
//         </Link>
//         <p
//           className="text-lg font-semibold line-clamp-3 hover:line-clamp-4 max-w-[150px] mx-auto"
//         >
//           {dish.dishName}
//         </p>
//       </div>
//     );
//   });

//   return (
//     <div className="text-center text-slate-100 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900">
//       <h1 className="text-5xl tracking-wider font-semibold pt-8">Latest Movies</h1>
//       <div className="flex flex-none flex-wrap flex-initial justify-center py-6">
//         {Array.isArray(dishCards) ? dishCards : null}
//       </div>
//     </div>
//   );
// }

import DishesList from '../components/DishesList/DishesList';

export default function DishesPage() {
  return <DishesList />;
}