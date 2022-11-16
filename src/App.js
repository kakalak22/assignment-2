// import './App.css';
import 'antd/dist/antd.css';
import DanhSachSanPham from './admin/page/san-pham/components/DanhSachSanPham';
import AdminLayout from './admin/layout/AdminLayout';
import { Route, Routes, useNavigate } from "react-router-dom";
import FormTaoSanPham from './admin/page/san-pham/components/FormTaoSanPham';
import FormChinhSuaSanPham from './admin/page/san-pham/components/FormChinhSuaSanPham';
import ChiTietSanPham from './admin/page/san-pham/components/ChiTietSanPham';
import ClientLayout from './client/page/layout/ClientLayout';
import DanhSachSanPhamClient from './client/page/san-pham/components/DanhSachSanPhamClient';
import ChiTietSanPhamClient from './client/page/san-pham/components/ChiTietSanPhamClient';
import Login from './auth/components/Login';
import ProtectedRoute from './common/components/ProtectedRoute';
import { useSelector } from 'react-redux';
import NotFound from './common/components/NotFound';
import { useEffect, useState } from 'react';
import Loading from './common/components/Loading';

function App() {
  const navigate = useNavigate();
  const { isAdmin, isUser, isLogin } = useSelector(state => state.reducerAuth);



  return (
    <Routes>
      <Route path='/'>
        <Route index element={<Login />} />
        <Route path='login' element={<Login />} />

        {isUser &&
          <Route path="client">
            <Route index element={<ProtectedRoute><DanhSachSanPhamClient /></ProtectedRoute>} />
            <Route path='danh-sach-san-pham' element={<ProtectedRoute><DanhSachSanPhamClient /></ProtectedRoute>} />
            <Route path='san-pham/:id' element={<ProtectedRoute><ChiTietSanPhamClient /></ProtectedRoute>} />
          </Route>}
        {isAdmin && <Route path="admin">
          <Route path='san-pham' >
            <Route index element={<ProtectedRoute><DanhSachSanPham /></ProtectedRoute>} />
            <Route path='danh-sach-san-pham' element={(<ProtectedRoute><DanhSachSanPham /></ProtectedRoute>)} />
            <Route path='tao-san-pham' element={<ProtectedRoute><FormTaoSanPham title="Tạo sản phẩm" /></ProtectedRoute>} />
            <Route path='chinh-sua-san-pham/:id' element={<ProtectedRoute><FormChinhSuaSanPham /></ProtectedRoute>} />
            <Route path='chi-tiet-san-pham/:id' element={<ProtectedRoute><ChiTietSanPham /></ProtectedRoute>} />
            <Route path='preview' element={<ProtectedRoute><ClientLayout><DanhSachSanPhamClient /></ClientLayout></ProtectedRoute>} />
          </Route>
        </Route>}
        <Route path="*" element={<NotFound />} />

      </Route>
    </Routes>
  );
}

export default App;
