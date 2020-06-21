const AddressModel = require('./AddressModel');
const CategoryModel = require('./CategoryModel');
const CustomerAccountModel = require('./CustomerAccountModel');
const CustomerModel = require('./CustomerModel');
const OrderDetailModel = require('./OrderDetailModel');
const OrderModel = require('./OrderModel');
const ProductImageModel = require('./ProductImageModel');
const ProductModel = require('./ProductModel');
const UserAccountModel = require('./UserAccountModel');

CategoryModel.hasMany(ProductModel, {
  foreignKey: {
    fieldName: 'categoryId'
  }
});
ProductModel.belongsTo(CategoryModel, {
  foreignKey: {
    fieldName: 'categoryId'
  }
});

ProductModel.hasMany(ProductImageModel, {
  foreignKey: {
    fieldName: 'productId'
  }
});
ProductImageModel.belongsTo(ProductModel, {
  foreignKey: {
    fieldName: 'productId'
  }
});
CustomerAccountModel.hasOne(CustomerModel, {
  foreignKey: {
    fieldName: 'email'
  }
});
CustomerModel.belongsTo(CustomerAccountModel, {
  foreignKey: {
    fieldName: 'email'
  }
});

module.exports = {
  AddressModel,
  CategoryModel,
  CustomerModel,
  CustomerAccountModel,
  OrderDetailModel,
  OrderModel,
  ProductImageModel,
  ProductModel,
  UserAccountModel
}