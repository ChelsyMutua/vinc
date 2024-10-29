import './App.css'
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from './components/Hero';
import Categories from './components/CaterogyButtons';
import BusinessCategory from './components/BusinessCategory';
import { Box } from '@mui/material';
import Component from './components/business-signup';
import CustomerSignin from './components/customer-signin';


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
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Categories />
              <Box
                sx={{
                  backgroundColor: '#f9f9f9',
                  color: '#1d1d1d',
                  minHeight: '100vh',
                  padding: '20px',
                }}
              >
                {businessData.map((categoryData, index) => (
                  <BusinessCategory
                    key={index}
                    category={categoryData.category}
                    businesses={categoryData.businesses}
                  />
                ))}
              </Box>
              <Component />
              <CustomerSignin />
            </>
          }
        />
        <Route path="/signin" element={<CustomerSignin />} />
      </Routes>
    </Router>
  );
}
export default App;