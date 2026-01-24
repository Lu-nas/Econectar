
import { ToastContainer } from 'react-toastify';
import AppRoutes from './routes/AppRoutes';
import Footer from './components/Footer/Footer';
import Navbar from './components/NavBar/NavBar';

function App() {
  return ( 
    <>
      <Navbar/>
      <ToastContainer />
      <AppRoutes />
      <Footer /> 
    </>
  );
}
export default App;