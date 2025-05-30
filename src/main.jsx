import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'

import { ClerkProvider } from "@clerk/clerk-react";

// Import Layout
import MainLayout from './layouts/main.layout'
// import AdminProtected from './layouts/AdminProtected';
// import DriverProtected from './layouts/DriverProtected';
import DashboardLayout from './layouts/dashboard.layout'


// Import pages
import HomePage from './pages/home/home.page'
import AboutUs from './pages/about-us.page'
import ContactUs from './pages/contact-us.page';
import ViewMap from './pages/view-map.page'
import SignInPage from './pages/sign-in.page'
import SignUpPage from './pages/sign-up.page'

import AdminDashboard from './pages/dashboard/admin/admin.dashboard'
import FinesPage from './pages/dashboard/admin/components/fines.page';
import AppealsPage from './pages/dashboard/admin/components/appeals.page';
import DriversPage from './pages/dashboard/admin/components/drivers.page';
import PoliceOfficersPage from './pages/dashboard/admin/components/police.page';
import ReportsPage from './pages/dashboard/admin/components/report.statics.page';
import UsersPage from './pages/dashboard/admin/components/users.page';

import DriverDashboard from './pages/dashboard/driver/driver.dashboard'
import DriverFinePage from './pages/dashboard/driver/components/fine-detail.page';
import DriverAppealPage from './pages/dashboard/driver/components/fine-appeal.page';
import DriverProfilePage from './pages/dashboard/driver/components/driver-profile.page';

import PoliceDashboard from './pages/dashboard/police/policeOfficer.page'
import IssueFinePage from './pages/dashboard/police/components/issue-fine.page';
import PoliceProfilePage from './pages/dashboard/police/components/police-profile.page';


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env.local file");
}

createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUs/>} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/view-map" element={<ViewMap />} />
        </Route>

        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />


        <Route element={<DashboardLayout />}>
          {/* <Route element={<AdminProtected />}> */}
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="/dashboard/admin/users" element={<UsersPage />} />
            <Route path="/dashboard/admin/fines" element={<FinesPage />} />
            <Route path="/dashboard/admin/appeals" element={<AppealsPage />} />
            <Route path="/dashboard/admin/drivers" element={<DriversPage />} />
            <Route path="/dashboard/admin/police" element={<PoliceOfficersPage />} />
            <Route path="/dashboard/admin/reports" element={<ReportsPage />} />
          {/* </Route> */}

          <Route path="/dashboard/driver" element={<DriverDashboard />} />
          <Route path="/dashboard/driver/fine" element={<DriverFinePage />} />
          <Route path="/dashboard/driver/appeal" element={<DriverAppealPage />} />
          <Route path="/dashboard/driver/profile" element={<DriverProfilePage />} />

          {/* <Route element={<PoliceProtected />}> */}
            <Route path="/dashboard/police" element={<PoliceDashboard />} />
            <Route path="/dashboard/police/issue-fine" element={<IssueFinePage />} />
            <Route path="/dashboard/police/profile" element={<PoliceProfilePage />} />
          {/* </Route> */}
        </Route>


      </Routes>
    </BrowserRouter>
  </ClerkProvider>
);
