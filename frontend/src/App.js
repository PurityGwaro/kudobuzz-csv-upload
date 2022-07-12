import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const ViewCsv = React.lazy(() => import('./components/ViewCsv'));
const Error = React.lazy(() => import('./components/Error'));
const LoginPage = React.lazy(() => import('./components/LoginPage'));
const ClientUI = React.lazy(() => import('./components/ClientUI'));
const UploadForm = React.lazy(() => import('./components/UploadForm'));
const EditCustomer = React.lazy(() => import('./components/EditCustomer'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Router>
      <Routes>
        <Route path="/" element={<ClientUI />} />
        <Route path="/csv/:id" exact element={<ViewCsv />} />
        <Route path="/upload" exact element={<UploadForm />} />
        <Route path="/logout" exact element={<LoginPage />} />
        <Route path="/edit/:id" exact element={<EditCustomer />} />
        <Route path="*" component={<Error />} />
      </Routes>
    </Router>
    </Suspense>
  );
}

export default App;
