import * as Actions from "../actionsTypeSanpham";

const initialSate = {
    // sanPham: { id: "", name: "", image: "", price: null, tax: null },
    danhSachSanPham: [
        // {
        //     id: 1,
        //     ten: "A",
        //     moTa: "lorem",
        //     linkHinhAnh: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png",
        //     donGia: 10,
        //     soLuongSanPham: 2,
        //     hienThi: true
        // },
    ]
}

export default (state = initialSate, action) => {
    switch (action.type) {

        case Actions.SAN_PHAM_SAVE: {
            const { data = {} } = action;
            const { newDanhSachSanPham } = data;
            return {
                ...state,
                danhSachSanPham: newDanhSachSanPham,
            }
        }

        default:
            return state;
    }
}