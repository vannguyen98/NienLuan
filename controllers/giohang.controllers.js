const { ProductModel,ProductImageModel } = require('../models');
const { Cart } = require('../models/Cart');

module.exports.getGioHang = (req, res) => {
  res.render('gio-hang');
}

module.exports.themHangVaoGio = async (req, res) => {
  try {
    const { productId } = req.params;
    //create cart instance
    const cart = new Cart(req.session.cart ? req.session.cart : {});

    const product = await ProductModel.findOne({
      where: {
        productId,
        isDeleted: false
      }, include: [ProductImageModel]
    });


    if (!product) {
      throw { "msg": "Không tìm thấy sản phẩm" };
    }
    //if wrong exist, put it into cart
    cart.add(product, productId);

    //reassign to session
    req.session.cart = cart;
    
    res.json({
      cart: cart.generateCart(),
      totalPrice: cart.totalPrice,
      totalQuantity: cart.totalQuantity
    });

  } catch (error) {
    console.log(error);
  }
}

module.exports.getTatCaSanPhamTrongGioHang = (req, res) => {
  try {
    const cart = new Cart(req.session.cart || {});

    console.log(cart.generateCart());

    res.render('gio-hang', {
      cart: cart.generateCart(),
      totalPrice: cart.totalPrice,
      totalQuantity: cart.totalQuantity
    })

  } catch (error) {
    console.log(error);
  }
}

module.exports.capNhatGioHang = (req,res) =>{
  try {
    const { productId } = req.params;
    const { quantity } = req.query;
    const cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.updateCartItem(productId, quantity);

    req.session.cart = cart;

    res.json({
      cart: cart.generateCart(),
      totalPrice: cart.totalPrice,
      totalQuantity: cart.totalQuantity
    });

  } catch (error) {
    console.log(error);

    res.json({
      'error': error
    })
  }
}


module.exports.giamSoLuongHangTrongGio = async (req, res) => {
  try {
    const { productId } = req.params;
    //create cart instance
    const cart = new Cart(req.session.cart ? req.session.cart : {});

    const product = await ProductModel.findOne({
      where: {
        productId,
        isDeleted: false
      }, include: [ProductImageModel]
    });


    if (!product) {
      throw { "msg": "Không tìm thấy sản phẩm" };
    }
    //if wrong exist, put it into cart
    cart.remove(productId);

    cart.removeEmptyItem();
    
    //reassign to session
    req.session.cart = cart;
    
    res.json({
      cart: cart.generateCart(),
      totalPrice: cart.totalPrice,
      totalQuantity: cart.totalQuantity
    });

  } catch (error) {
    console.log(error);
  }
}