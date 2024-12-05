// App.jsx
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
import Review from './components/review';
import ReviewReply from "./components/review_reply";
import Photos from "./components/photos";
import Analytics from './components/analytics'; 
// import Settings from './components/settings'; // Assuming you have a Settings component

const AppWithHeader = () => {
  const location = useLocation();
  
  // Paths where the entire Header should be hidden
  const noHeaderPaths = [
    '/business/:businessId',  // Business profile pages with dynamic ID
    '/signup-business',       // Business signup page
    '/signup-confirmation',
    // Add more paths if needed
  ];
  
  // Paths where specific Header elements should be hidden
  const hideHeaderElementsPaths = [
    '/user-profile',
    '/review_reply',
    '/business-dashboard',
    '/photos',
    '/analytics',
    '/settings'

    // Add more paths if needed
  ];
  
  // Function to check if current path matches any pattern in the array
  const pathMatches = (paths, pathname) => {
    return paths.some(path => {
      if (path.includes(':')) {
        // Handle dynamic routes like /business/:businessId
        const basePath = path.split('/:')[0];
        return pathname.startsWith(basePath + '/');
      }
      return pathname === path;
    });
  };

  // Determine if the Header should be hidden entirely
  const shouldHideHeader = pathMatches(noHeaderPaths, location.pathname);

  // Determine if specific Header elements should be hidden
  const shouldHideHeaderElements = pathMatches(hideHeaderElementsPaths, location.pathname);

  return (
    <>
      {/* Conditionally render Header based on the current path */}
      {!shouldHideHeader && <Header hideElements={shouldHideHeaderElements} />}
      
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
        <Route path="/review" element={<Review />}/>
        <Route path="/review_reply" element={<ReviewReply />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/analytics" element={<Analytics />} />
        {/* <Route path="/settings" element={<Settings />} /> */}
        {/* Add more routes as needed */}
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
