import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// code splitting to allow only the required components to be loaded
const ViewCsv = React.lazy(() => import('./components/ViewCsv'));
const Error = React.lazy(() => import('./components/Error'));
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
        <Route path="/edit/:id" exact element={<EditCustomer />} />
        <Route path="*" component={<Error />} />
      </Routes>
    </Router>
    </Suspense>
  );
}

export default App;
