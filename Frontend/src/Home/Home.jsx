
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import Freebook from '../components/Freebook'


const App = () => {
  return (
    <div className> {/* Set background to white and ensure full height */}
      <Navbar />
      <Banner/>
    
    <Freebook/>
    <Footer/>
    </div>
  )
}

export default App
