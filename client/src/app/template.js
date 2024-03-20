import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/userContext";

export default function Template({ children }){


   return( 
    <AuthProvider>
        <Navbar/>
           {children}
        <Footer/>
    </AuthProvider>

)}