// import './App.css';
import 'antd/dist/antd.css';
import DanhSachSanPham from './admin/page/san-pham/components/DanhSachSanPham';
import AdminLayout from './admin/layout/AdminLayout';
import { Route, Routes } from "react-router-dom";
import FormTaoSanPham from './admin/page/san-pham/components/FormTaoSanPham';
import FormChinhSuaSanPham from './admin/page/san-pham/components/FormChinhSuaSanPham';
import ChiTietSanPham from './admin/page/san-pham/components/ChiTietSanPham';
import ClientLayout from './client/page/layout/ClientLayout';

function App() {
  return (
    <Routes>
      <Route path="client">
        <Route path='danh-sach-san-pham' element={<ClientLayout></ClientLayout>} />
      </Route>
      <Route path="admin">
        <Route path='san-pham' >
          <Route index element={<AdminLayout><DanhSachSanPham /></AdminLayout>} />
          <Route path='danh-sach-san-pham' element={(<AdminLayout><DanhSachSanPham /></AdminLayout>)} />
          <Route path='tao-san-pham' element={<AdminLayout><FormTaoSanPham /></AdminLayout>} />
          <Route path='chinh-sua-san-pham/:id' element={<AdminLayout><FormChinhSuaSanPham /></AdminLayout>} />
          <Route path='chi-tiet-san-pham/:id' element={<AdminLayout><ChiTietSanPham /></AdminLayout>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
