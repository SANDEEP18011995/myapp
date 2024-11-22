import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import ToDoList from './components/ToDoList/ToDoList';
import { AuthProvider, useAuth } from './context/AuthContext';

const App = () => {
  const { currentUser } = useAuth();

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/todo"
            element={currentUser ? <ToDoList /> : <Login />}
          />
          {/* Add fallback routes */}
          <Route path="/" element={currentUser ? <ToDoList /> : <Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
