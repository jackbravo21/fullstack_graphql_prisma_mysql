import {Routes, Route} from 'react-router-dom';

import ProtectedRoute from '../pages/protectedroute';
import Initial from "../pages/initial";
import Home from "../pages/home";
import Login from "../pages/loginpage";
import Logout from "../pages/logout";
import Register from "../pages/register";
import Users from "../pages/users";
import AddUser from "../pages/registeruser";
import EditUser from "../pages/edituser";
import DeleteUser from "../pages/deleteuser";
import Courses from "../pages/courses";
import AddCourse from "../pages/registercourse";
import EditCourse from "../pages/editcourse";
import DeleteCourse from "../pages/deletecourse";
import NotFound from "../pages/notfound";
import ForgotPassword from "../pages/forgotpasswd";

           
//<Route path="/home" element={ <ProtectedRoute><Home /></ProtectedRoute>} />

/*
                <Route path="/" element={ <Initial /> } />
                <Route path="/home" element={ <ProtectedRoute><Home /></ProtectedRoute> } />
                <Route path="/login" element={ <Login /> } />
                <Route path="/logout" element={ <Logout /> } />
                <Route path="/register" element={ <Register /> } />
                <Route path="/forgotpasswd" element={ <ForgotPassword /> } />
                <Route path="/products" element={ <Products />} />
                <Route path="/plates" element={ <Plates />} />
                <Route path="/users" element={ <ProtectedRoute><Users /></ProtectedRoute>} />
                <Route path="/addproduct" element={ <ProtectedRoute><AddProducts /></ProtectedRoute> } />
                <Route path="/adduser" element={ <ProtectedRoute><AddUsers /></ProtectedRoute> } />
                <Route path="/edituser" element={ <ProtectedRoute><EditUser /></ProtectedRoute> } />
                <Route path="/deleteuser" element={ <ProtectedRoute><DeleteUser /></ProtectedRoute> } />
                <Route path="/editproduct" element={ <ProtectedRoute><EditProduct /></ProtectedRoute> } />
                <Route path="/deleteproduct" element={ <ProtectedRoute><DeleteProduct /></ProtectedRoute> } />
*/

function RoutesApp()
{
    return(
       
            <Routes>

                <Route path="/" element={ <Initial /> } />
                <Route path="/home" element={ <Home /> } />
                <Route path="/login" element={ <Login /> } />
                <Route path="/logout" element={ <Logout /> } />
                <Route path="/users" element={ <ProtectedRoute><Users /></ProtectedRoute>} />
                <Route path="/register" element={ <Register /> } />
                <Route path="/adduser" element={ <ProtectedRoute><AddUser /></ProtectedRoute> } />
                <Route path="/edituser" element={ <ProtectedRoute><EditUser /></ProtectedRoute> } />
                <Route path="/deleteuser" element={ <ProtectedRoute><DeleteUser /></ProtectedRoute> } />
                <Route path="/forgotpasswd" element={ <ForgotPassword /> } />
                <Route path="/courses" element={ <Courses />} />
                <Route path="/addcourse" element={ <ProtectedRoute><AddCourse /></ProtectedRoute> } />
                <Route path="/editcourse" element={ <EditCourse /> } />
                <Route path="/deletecourse" element={ <DeleteCourse /> } />
                <Route path="*" element={ <NotFound /> } />                

            </Routes>
        
    );
}

export default RoutesApp;