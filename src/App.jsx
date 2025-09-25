import React from 'react';
import { UserProvider } from './Components/UserContext.jsx';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx';
import Home from './Components/Home.jsx';
import Footer from './Components/Footer.jsx';
import Form from './Components/Form.jsx';
import About from './Components/About.jsx';
import VerificationPage from './Components/VerificationPage.jsx';
import RoleBasedForm from './Components/RoleBasedForm.jsx';
import LoginForm from './Components/LoginForm.jsx';
import InstitutionForm from './Components/InstitutionForm.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';


function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
    {/* <RoleBasedForm/> */}
          <Route path='/role' element={<RoleBasedForm/>}/>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Form />} />
          <Route path="/about" element={<About/>} />
          <Route path="/verifi-page" element={<VerificationPage/>} />
          <Route path="/login" element={<LoginForm/>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/insertrecord" element={<InstitutionForm/>} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </UserProvider>
  );
}

// Wrapper to handle redirect after signup
function FormWrapper() {
  const navigate = useNavigate();
  // Pass a prop to Form to handle redirect
  return <Form onSignupSuccess={() => navigate('/')} />;
}

export default App;
