const bcrypt = require('bcryptjs');
const uniqid = require('uniqid');
const { CustomerAccountModel, CustomerModel } = require('../models');

module.exports.hienThiDangKy = (req, res) => {
  res.render('dang-ky');
}

module.exports.hienThiDangNhap = (req, res) => {
  res.render('dang-nhap');
}

module.exports.dangKy = async (req, res) => {
  try {
    const { email, matkhau } = req.body;
    console.log(req.body)
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(matkhau, salt, async function (err, hash) {
        const customerAccount = await CustomerAccountModel.create({
          email,
          password: hash
        });

        if (!customerAccount) {
          throw { msg: "Tạo thất bại" }
        }

        const customer = await CustomerModel.create({
          email,
          customerId: uniqid()
        });

        if (!customer) {
          throw { msg: "Tạo thất bại" }
        }
        res.json(customerAccount)
      });
    });
  } catch (error) {
    res.json(error)
  }
}

module.exports.dangNhap = async (req, res) => {
  try {
    const { email, matkhau } = req.body;

    const customerAccount = await CustomerAccountModel.findOne({
      where: {
        email
      }
    });

    const customer = await CustomerModel.findOne({
      where: {
        email
      }
    })

    bcrypt.compare(matkhau, customerAccount.password, function (err, response) {
      if (response) {
        req.session.customer = customer;
        res.send("Đăng nhập thành công")
      } else {
        res.send("Đăng nhập thất bại! Tài khoản hoặc mật khẩu không đúng!")
      }
    });
  } catch (error) {
    res.json(error)
  }
}