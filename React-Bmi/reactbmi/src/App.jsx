import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Logout from './components/logout';
import ViewBMIRecords from './components/view_bmi_records';
import ViewBMIUsers from './components/view_bmi_users';
import Dashboard from './components/Dashboard';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/view-bmi-records" element={<ViewBMIRecords />} />
        <Route path="/view-bmi-users" element={<ViewBMIUsers />} />
      </Routes>
    </Router>
  );
}

export default App;
