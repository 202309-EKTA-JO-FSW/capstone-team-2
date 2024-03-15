import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

export default function Template({ children }) {
    return <div>
<Navbar/>
        {children}
<Footer/>
        </div>
  }