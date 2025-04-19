import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useContext } from "react";
import IntroPage from "./Pages/IntroPage";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home"; // Corrected path
import About from "./Pages/About";
import AskUs from "./Pages/AskUs";
import Servicespage from "./Pages/Servicespage";
import FQAPAGE from "./Pages/FQAPAGE";
import AccountLayout from "./AccountLayout";
import Profile from "./Pages/nurse/Profile";
import RequestsList from "./Pages/nurse/RequestsList";
import MyRequests from "./Pages/user/MyRequests";
import NewRequst from "./Pages/user/NewRequst";
import EditRequest from "./Pages/user/EditRequest";
import MyOffers from "./Pages/nurse/MyOffers";
import OffersPage from "./Pages/user/OffersPage";
import AddReview from "./Pages/user/AddReview";
import RequestReviwes from "./Pages/nurse/RequestReviews";
import ScrollToTop from "./Componants/ScrollToTop";
import Layout from "./Layout";
import ErrorBoundary from "./Componants/ErrorBoundary"; // Import ErrorBoundary
import NotFound from "./Pages/NotFound"; // Import a NotFound component
import Unauthorized from "./Pages/Unauthorized"; // Import Unauthorized component
import { UserProvider, UserContext } from "./context/UserContext"; // Import UserContext
import Chatbot from "./Componants/Chatbot";

// ProtectedRoute Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(UserContext);

  if (!user) return <Navigate to="/login" />; // Redirect if not logged in

  // Safely access user properties
  if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" />; // Redirect if role not allowed

  return children;
};

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/intro", element: <IntroPage /> },
        { path: "/register", element: <Register /> },
        { path: "/login", element: <Login /> },
        { path: "/about", element: <About /> },
        { path: "/askus", element: <AskUs /> },
        { path: "/serivcepage", element: <Servicespage /> },
        { path: "/FQAPAGE", element: <FQAPAGE /> },
        {
          path: "/account",
          element: (
            <ProtectedRoute allowedRoles={["nurse", "patient"]}>
              <AccountLayout />
            </ProtectedRoute>
          ),
          children: [
            { path: "Profile", element: (
              <ProtectedRoute allowedRoles={["nurse","patient"]}>
                <Profile />
              </ProtectedRoute>
            ) },
            // Protected routes for nurse
            {
              path: "RequestNew",
              element: (
                <ProtectedRoute allowedRoles={["nurse"]}>
                  <RequestsList />
                </ProtectedRoute>
              ),
            },
            { path: "MyOffers",  element: (
              <ProtectedRoute allowedRoles={["nurse"]}>
              <MyOffers />
              </ProtectedRoute>
            ), },
            { path: "RequestReviwes/:nurseId", element: (
              <ProtectedRoute allowedRoles={["nurse"]}>
              <RequestReviwes />
              </ProtectedRoute>
            ), },
            // Protected routes for patient
            {
              path: "my-requests",
              element: (
                <ProtectedRoute allowedRoles={["patient"]}>
                  <MyRequests />
                </ProtectedRoute>
              ),
            },
            {
              path: "requsts",
              element: (
                <ProtectedRoute allowedRoles={["patient"]}>
                  <NewRequst />
                </ProtectedRoute>
              ),
            },
            {
              path: "edit-request/:id",
              element: (
                <ProtectedRoute allowedRoles={["patient"]}>
                  <EditRequest />
                </ProtectedRoute>
              ),
            },
            {
              path: "offers/:requestId",
              element: (
                <ProtectedRoute allowedRoles={["patient"]}>
                  <OffersPage />
                </ProtectedRoute>
              ),
            },
            {
              path: "add-review/:offerId",
              element: (
                <ProtectedRoute allowedRoles={["patient"]}>
                  <AddReview />
                </ProtectedRoute>
              ),
            },
            { path: "account/:request_id", element: <RequestsList /> },
           
          ],
        },
        { path: "/unauthorized", element: <Unauthorized /> },
        { path: "*", element: <NotFound /> }, // Fallback route for unmatched paths
      ],
    },
  ]);

  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
      <Chatbot /> 
    </ErrorBoundary>
  );
};

export default App;
