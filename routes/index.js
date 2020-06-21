var express = require('express');
var router = express.Router();

var multer = require('multer')

const upload = require('../config/multer.config');


const { getHome,
  getFaceMakeup,
  getEyeMakeup,
  getLipMakeup,
  getTipBeauty,
  getContact,
  getTipBeautySingle } = require('../controllers/makeup.controllers');

const { themSanPham, taoSanPham, quanLiSanPham } = require('../controllers/sanpham.controllers');

const { getTatCaSanPhamTrongGioHang, themHangVaoGio, giamSoLuongHangTrongGio } = require('../controllers/giohang.controllers');

const { dangKy, hienThiDangKy, dangNhap, hienThiDangNhap } = require('../controllers/xacthuc.controllers');
const { taoDonDatHang } = require('../controllers/dathang.controllers');

/* GET home page. */
router.get('/', getHome);

router.get('/face-makeup', getFaceMakeup);
router.get('/eye-makeup', getEyeMakeup);
router.get('/lip-makeup', getLipMakeup);
router.get('/tip-beauty', getTipBeauty);
router.get('/tip-beauty-single', getTipBeautySingle);
router.get('/contact', getContact);
router.get('/admin-them-san-pham', themSanPham);
router.get('/admin-quan-li-san-pham', quanLiSanPham);
router.post('/admin-them-san-pham', upload.single('hinh'), taoSanPham);
router.get('/gio-hang', getTatCaSanPhamTrongGioHang);
router.get('/them-vao-gio-hang/:productId', themHangVaoGio);
router.get('/tang-so-luong-gio-hang/:productId', themHangVaoGio);
router.get('/giam-so-luong-gio-hang/:productId', giamSoLuongHangTrongGio);

router.get('/dang-ky', hienThiDangKy)
router.post('/dang-ky', dangKy)
router.get('/dang-nhap', hienThiDangNhap)
router.post('/dang-nhap', dangNhap)

router.post('/dat-hang', taoDonDatHang)
module.exports = router;
