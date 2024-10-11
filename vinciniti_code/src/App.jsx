
import './App.css'
// import CustomerSignin from './components/customer-signin';
// import CustomerSignup from './components/customer-signup';
import Header from './components/Header'
import Hero from './components/Hero';
import Categories from './components/CaterogyButtons';
import BusinessCategory from './components/BusinessCategory';
import { Box } from '@mui/material';


// Sample data structure for categories and businesses
const businessData = [
  {
    category: 'Restaurants',
    businesses: [
      { name: 'Tatu Moto', rating: 4.5, logo: '/tatu-logo.png' },
      { name: 'Choma Zone', rating: 4.0, logo: '/tatu-logo.png' },
      { name: 'Grill Master', rating: 4.7, logo: '/tatu-logo.png' },
    ],
  },
  {
    category: 'Barbershop',
    businesses: [
      { name: 'Classic Cuts', rating: 4.2, logo: '/tatu-logo.png' },
      { name: 'Gents Grooming', rating: 4.3, logo: '/tatu-logo.png' },
    ],
  },
  {
    category: 'Shoes',
    businesses: [
      { name: 'Sneaker World', rating: 4.5, logo: '/tatu-logo.png' },
      { name: 'Footwear Hub', rating: 4.1, logo: '/tatu-logo.png' },
    ],
  },
];

function App() {
 return(
  <>
    <Header/>
    {/* <CustomerSignup /> */}
  </>
 )
}

export default App;
