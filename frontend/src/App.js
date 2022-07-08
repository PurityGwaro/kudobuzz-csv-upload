import ClientUI from "./components/ClientUI";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ViewCsv from "./components/ViewCsv";
import UploadForm from "./components/UploadForm";
import LoginPage from "./components/LoginPage";
import Error from "./components/Error";
import EditCustomer from './components/EditCustomer';

function App() {
  return (
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
    // <div>
    //   <ClientUI/>
    // </div>
  );
}

export default App;
