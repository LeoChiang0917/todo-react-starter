// App.jsx
import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage, LoginPage, SignUpPage, TodoPage } from 'pages';
import { Authprovider } from 'context/AuthContext';
function App() {
  return (
    <div className="app">
      <BrowserRouter>
      <Authprovider>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="todos" element={<TodoPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
        </Authprovider>
      </BrowserRouter>
    </div>
  );
}
export default App;