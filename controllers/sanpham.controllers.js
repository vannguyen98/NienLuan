const { ProductModel, CategoryModel, ProductImageModel } = require('../models');
const uniqid = require('uniqid');

module.exports.themSanPham = async (req, res) => {
  const categories = await CategoryModel.findAll();
  res.render('them-san-pham', {
    categories
  });
}

module.exports.quanLiSanPham = async (req, res) => {
  const products = await ProductModel.findAll();
  res.render('quan-li-san-pham',{
    products
  });
}
module.exports.taoSanPham = async (req, res) => {
  console.log(req.file);
  if (!req.file) {
    console.log("No file received");
    // return res.send({
    //   success: false
    // });

  } else {
    console.log('file received');
    // return res.send({
    //   success: true
    // })
  }
// tao san pham 
  const { ten, gia, nhasanxuat, loai, khuyenmai, mota } = req.body;

  const category = await CategoryModel.findOne({
    where: {
      name: loai
    },
    attributes: ['categoryId']
  });

  const productId = uniqid();

  const product = await ProductModel.create({
    productId,//tự tao ra id kg trùng
    name: ten,
    unitPrice: gia,
    producer: nhasanxuat,
    categoryId: category.categoryId,
    discount: khuyenmai,
    description: mota
  });

  let pathname = req.file.path.split('\\').join('/');

  const productImage = await ProductImageModel.create({
    productImageId: uniqid(),
    productId,//tự tao ra id kg trùng
    imageUrl: pathname
  })
/// kiểm tra san pham coi trung hay lỗi kg 
  if (!product) {
    res.render('error', { message: 'Có lỗi khi tạo sản phẩm' });
  }

  res.send('Tạo sản phẩm thành công');
}