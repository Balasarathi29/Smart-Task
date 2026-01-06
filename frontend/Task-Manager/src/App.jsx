import React from 'react'
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Dashboard from './pages/Admin/Dashboard'
import ManageTask from './pages/Admin/ManageTask'
import ManageUsers from './pages/Admin/ManageUsers'
import CreateTask from './pages/Admin/CreateTask'
import UserDashboard from './pages/User/UserDashboard'
import MyTask from './pages/User/MyTask'
import ViewTaskDetails from './pages/User/ViewTaskDetails'
import PrivateRoute from './routes/PrivateRoute'
const App = () => {
  return (
    <div>

      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path = "/signup" element={<Signup />} />


          {/* Admin Routes*/}
          <Route element = {<PrivateRoute allowedRoles = {['admin']} />}>
            <Route path='admin/dashboard' element = {<Dashboard />} />
            <Route path='admin/task' element = {<ManageTask />} />
            <Route path='admin/users' element = {<ManageUsers />} />
            <Route path='admin/create-task' element = {<CreateTask />} />
          </Route>

          {/* User Routes*/}
          <Route element = {<PrivateRoute allowedRoles = {['user']} />}>
            <Route path='user/dashboard' element = {<UserDashboard />} />
            <Route path='user/tasks' element = {<MyTask />} />
            <Route path='user/view-task' element = {<ViewTaskDetails />} />
          </Route>
        </Routes>
      </Router>
    
    </div>
  )
}

export default App