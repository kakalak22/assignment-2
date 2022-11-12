import './App.css';
import 'antd/dist/antd.css';
import DanhSachSanPham from './admin/page/san-pham/components/DanhSachSanPham';
import AdminLayout from './admin/layout/AdminLayout';
import { Route, Routes } from "react-router-dom";
import FormTaoSanPham from './admin/page/san-pham/components/FormTaoSanPham';
import FormChinhSuaSanPham from './admin/page/san-pham/components/FormChinhSuaSanPham';

function App() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="admin">
          <Route path='san-pham'>
            <Route index element={<DanhSachSanPham />} />
            <Route path='danh-sach-san-pham' element={<DanhSachSanPham />} />
            <Route path='tao-san-pham' element={<FormTaoSanPham />} />
            <Route path='chinh-sua-san-pham/:id' element={<FormChinhSuaSanPham />} />
          </Route>
        </Route>
      </Routes>
    </AdminLayout>
  );
}

export default App;
