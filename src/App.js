import Navigation from "./components/layout/Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./components/home/HomePage";
import AccommodationsPage from "./components/accommodations/AccommodationsPage";
import Hotels from "./components/accommodations/Hotels";
import BedBreakfast from "./components/accommodations/BedBreakfast";
import GuestHouses from "./components/accommodations/GuestHouses";
import ContactPage from "./components/contact/ContactPage";
import SigninPage from "./components/signin/SigninPage";
import AdminAddPage from "./components/admin/AdminAddPage";
import AdminMessagesPage from "./components/admin/AdminMessagesPage";
import AdminEnquiresPage from "./components/admin/AdminEnquiresPage";
import DetailsPage from "./components/details/DetailsPage";
import Footer from "./components/layout/Footer";
import "./sass/style.scss";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <div className="main-wrapper">
          <Routes>
            <Route path="/" exact="true" element={<HomePage />} />
            <Route path="/accommodations" element={<AccommodationsPage />} />
            <Route path="/accommodations/hotels" element={<Hotels />} />
            <Route path="/accommodations/bed-and-breakfast" element={<BedBreakfast />} />
            <Route path="/accommodations/guest-houses" element={<GuestHouses />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/admin/add" element={<AdminAddPage />} />
            <Route path="/admin/messages" element={<AdminMessagesPage />} />
            <Route path="/admin/enquires" element={<AdminEnquiresPage />} />
            <Route path="/detail/:id" element={<DetailsPage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
