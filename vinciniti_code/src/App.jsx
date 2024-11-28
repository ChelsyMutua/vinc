import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Header from './components/Header';
import Hero from './components/Hero';
import Categories from './components/CaterogyButtons';
import BusinessCategory from './components/BusinessCategory';
import BusinessProfile from './components/BusinessProfile';
import { Box } from '@mui/material';
import Component from './components/business-signup';
import CustomerSignin from './components/customer-signin';
import { businessData } from './components/businessData';
import BusinessListScreen from './components/business-list';
import SignUpConfirmation from "./components/confirm_screen";
import BusinessProfileManagement from "./components/business_dash";
import UserProfile from './components/user-profile';

// Wrapper to conditionally render Header
const AppWithHeader = () => {
  const location = useLocation();
  
  // List of paths where header should not appear
  const noHeaderPaths = [
    '/business/',  // Business profile pages
    '/signup-business' , // Business signup page
    "/signup-confirmation",
    "/business-dashboard",
    "/user-profile",
  ];
  
  // Check if current path should hide header
  const shouldHideHeader = noHeaderPaths.some(path => 
    location.pathname.startsWith(path)
  );

  return (
    <>
      {/* Only render the Header if not on excluded pages */}
      {!shouldHideHeader && <Header />}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Categories />
              <Box
                sx={{
                  backgroundColor: '#',
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
            </>
          }
        />
        <Route path="/businesses" element={<BusinessListScreen />} />
        <Route path="/signin" element={<CustomerSignin />} />
        <Route path="/signup-business" element={<Component />} />
        <Route path="/signup-confirmation" element={<SignUpConfirmation />} />
        <Route path="/business-dashboard" element={<BusinessProfileManagement />} />
        <Route path="/business/:businessId" element={<BusinessProfile />} />
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
    </>
  );
};

const App = () => (
  <Router>
    <AppWithHeader />
  </Router>
);

export default App;