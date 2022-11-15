import React from "react";
import { useSelector } from "react-redux";
import { Route, redirect, Navigate } from "react-router-dom";
import AdminLayout from "../../admin/layout/AdminLayout";
import ClientLayout from "../../client/page/layout/ClientLayout";

const ProtectedRoute = ({ children }) => {
  const { isAdmin, isLogin, isUser } = useSelector(
    (state) => state.reducerAuth
  );
  if (!isLogin) return <Navigate to="/" />;
  if (isAdmin) return <AdminLayout>{children}</AdminLayout>;
  if (isUser) return <ClientLayout>{children}</ClientLayout>;
};

export default ProtectedRoute;
