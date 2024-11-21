import './App.css'
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from './components/Hero';
import Categories from './components/CaterogyButtons';
import BusinessCategory from './components/BusinessCategory';
import BusinessProfile from './components/BusinessProfile';
import { Box } from '@mui/material';
import Component from './components/business-signup';
import CustomerSignin from './components/customer-signin';
import { businessData } from './components/businessData';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Homepage Route */}
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

        {/* Business Profile Route */}
        <Route path="/business/:businessId" element={<BusinessProfile />} />
      </Routes>
    </Router>
  );
}
export default App;