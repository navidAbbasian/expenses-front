import { Route, Routes } from 'react-router-dom';
import Banks from '../pages/Banks';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Tags from '../pages/Tags';
import Transactions from '../pages/Transactions';
import LogoOnlyLayout from './../components/layouts/LogoOnlyLayout';
import DashboardLayout from './../components/layouts/dashboard/index';
import PrivateRoute from './PrivateRoute';

export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<LogoOnlyLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <DashboardLayout />
                    </PrivateRoute>
                }
            >
                <Route path="banks" element={<Banks />} />
                <Route path="tags" element={<Tags />} />
                <Route path="transactions" element={<Transactions />} />
            </Route>
        </Routes>
    );
};

export default Router;
