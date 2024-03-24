"use client"
import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
function Log({ changeActivePage }) {

  const [loged, setLoged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter(); 
  const [user, setUser] = useState(null);
  // let userInfo = JSON.parse(localStorage.getItem('userInfo'));
  useEffect(() => {
     if(localStorage.getItem('userInfo')) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      setLoged(true)
      setIsAdmin(userInfo.role === 'admin');
      setUser(userInfo);
     }else {
      setLoged(false);
      setIsAdmin(false);
     }
  }, [])
  
  // useEffect(() => {
  //   // Listen for changes in local storage
  //   const handleStorageChange = () => {
  //     if (localStorage.getItem('userInfo')) {
  //       setLoged(true);
  //     } else {
  //       setLoged(false);
  //     }
  //   };

  //   // Attach event listener for storage change
  //   window.addEventListener('storage', handleStorageChange);

  //   // Clean up event listener on component unmount
  //   return () => {
  //     window.removeEventListener('storage', handleStorageChange);
  //   };
  // }, []);
 

  const handleLogin = () => {
    localStorage.setItem('activePage', 'login'); 
    changeActivePage('login');
    router.push('/login');
  };

  const handleLogout = () => {
    localStorage.clear('token');
    localStorage.removeItem('userInfo');
    setLoged(false); // Update the state immediately after logout
    setIsAdmin(false);
    router.push('/');
  };

  return (
    // <>
    // {
    //   loged ? 
    //   <div className="hover:text-blue-400 text-white">
    //   <button
    //   className="bg-[#AD343E] hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    //   onClick={() => {
    //   localStorage.clear('token');
    //   localStorage.removeItem('userInfo');
    //   router.push('/');
    //   setLoged(false);
    //    }}
    //   >
    //    Logout
    //   </button>
    // </div>
    //   :
    //  <div className="hover:text-blue-400 text-white">
    //    <button
    //    className="bg-[#AD343E] hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    //    onClick={() => {
    //    router.push('/userprofile'); 
    //    } }
    //    >
    //     LogIn
    //    </button>
    //  </div>
    //     }
    //     </>
    /*************** */
//     <div className="hover:text-blue-400 text-white">
//       <button
//         className="bg-[#AD343E] hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//         onClick={loged ? handleLogout : handleLogin}
//       >
//         {loged ? 'Logout' : 'LogIn'}
//       </button>
//     </div>
//   );
// }
/************** */
<div style={{marginLeft:"400px"}}>
      {loged ? (
        <div className="flex items-center">
        
           {isAdmin ? (
            <div className="mr-4 flex">
              <Link href={user?` /userprofile/user/${user._id}`: '/userprofile'} className="hover:text-blue-400 text-white mr-4 ">
                <span>Profile</span>
            </Link>



            <button className="mr-4"
            onClick={() => {
                 router.push('/admin'); 
                 } }
            
            >
              Dashboard
            </button>
            
          </div>
           ):(
           
            <div className="mr-4">
              <Link href={user?` /userprofile/user/${user._id}`: '/userprofile'} className="hover:text-blue-400 text-white">
                <span>Profile</span>
            </Link>



              <button className="mr-4"
              onClick={() => {
                   router.push('/order'); 
                   } }
              
              >
                Cart
              </button>
              {/* <Link href={`/order/${userInfo._id}`} className="hover:text-blue-400 text-white">
                <span>cart</span>
            </Link> */}
            </div>
           ) }

          <div className="hover:text-blue-400 text-white mr-4">
            <button
              className="bg-[#AD343E] hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="hover:text-blue-400 text-white">
          <button
           className="bg-[#AD343E] hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleLogin}
          >
            LogIn
          </button>

                  {/* <div> 
          <button
              className={`bg-[#AD343E] hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline `}
              onClick={() => {
                
                router.push("/signup");
              }}
            >
              SignUp
            </button>

            </div> */}
        </div>
      )}
    </div>
  );
}
  // )
// }

export default Log


  /* {isAdmin && (
            <div className="mr-4">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => {
                   router.push('/admin'); 
                   } }
              
              >
                Admin
              </button>
            </div>
          )} */