import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import MyBlogs from './components/MyBlogs'
import { AuthProvider } from './ContextAPI/AuthContext'

function App() {

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/myBlogs" element={<MyBlogs />} />
          <Route path="/blogs/new" element={<CreateBlog />} />
        </Routes >
      </AuthProvider>
    </>
  )
}

export default App
