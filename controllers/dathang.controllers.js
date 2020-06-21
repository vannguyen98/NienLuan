const { OrderModel, AddressModel, OrderDetailModel, ProductModel } = require("../models");
const uniqd = require('uniqid');
const { Cart } = require("../models/Cart");

module.exports.taoDonDatHang = async (req, res) => {
  try {
    let cart = new Cart(req.session.cart);
    cart = cart.generateCart()
    if (req.session.cart.length === 0) {
      res.json({ msg: "Giỏ hàng rỗng" });
    }
    const { customerId } = req.session.customer;
    const { diachi, tennguoinhan, sodienthoai } = req.body;
    const addressId = uniqd();
    const orderId = uniqd();

    const address = await AddressModel.create({
      addressId,
      address: diachi,
      name: tennguoinhan,
      phonenumber: sodienthoai,
      customerId
    });
    if (!address) {
      res.json({ msg: "Đặt hàng thất bại" });
    }
    const order = await OrderModel.create({
      orderId,
      isDeleted: false,
      dateOrder: new Date(),
      orderStatus: 0,
      customerId,
      addressId
    })
    if (!order) {
      res.json({ msg: "Đặt hàng thất bại" });
    }

    const preOrderDetail = [];
    for (let i = 0; i < cart.length; i++) {
      preOrderDetail.push({
        orderDetailId: uniqd(),
        quantity: cart[i].quantity,
        discount: cart[i].product.discount,
        unitPrice: cart[i].product.unitPrice,
        productId: cart[i].product.productId,
        orderId
      });
    }

    console.log(preOrderDetail);

    const orderDetail = await OrderDetailModel.bulkCreate(preOrderDetail);
    if (!orderDetail) {
      res.json({ msg: "Đặt hàng thất bại" });
    }

    res.json({ msg: "Tạo đơn hàng thành công" })
  } catch (error) {
    console.log(error)
  }
}

module.exports.quanLiDonHang = async (req, res) => {
  try {
    const orders = await OrderModel.findAll({
      include: [OrderDetailModel]
    });
    if (!orders) {
      res.json({ msg: "Không tìm thấy đơn hàng nào!" });
    }

    res.render('quan-li-don-hang', {
      orders
    })
  } catch (error) {

  }
}
module.exports.chiTietDonHang = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await OrderModel.findOne({
      where: {
        orderId
      }
    })
    const orderDetails = await OrderDetailModel.findAll({
      where: {
        orderId
      },
      include: [ProductModel]
    });
    if (!order) {
      res.json({ msg: "Không tìm thấy đơn hàng nào!" });
    }

    console.log(orderDetails[0])

    res.render('chi-tiet-don-hang', {
      order, orderDetails
    })
  } catch (error) {
    console.log(error)
  }
}