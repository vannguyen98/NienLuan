function Cart(oldCart) {
  this.items = oldCart.items || {};
  this.totalPrice = oldCart.totalPrice || 0;
  this.totalQuantity = oldCart.totalQuantity || 0;

  this.add = function (product, productId) {
    let storedItem = this.items[productId];

    if (!storedItem) {
      storedItem = this.items[productId] = { product: product.dataValues, quantity: 0, totalPriceOfItem: 0 };
    }

    storedItem.quantity++;
    //store price after discount
    storedItem.totalPriceOfItem += storedItem.product.unitPrice - storedItem.product.unitPrice * storedItem.product.discount / 100;
    console.log(Math.round(storedItem.totalPriceOfItem * 1000) / 1000);

    //rounded
    storedItem.totalPriceOfItem = Math.round(storedItem.totalPriceOfItem * 1000) / 1000;

    this.totalQuantity++;
    this.totalPrice += storedItem.product.unitPrice - Math.round((storedItem.product.unitPrice * storedItem.product.discount / 100) * 1000) / 1000;
    //rounded
    console.log(Math.round(this.totalPrice * 1000) / 1000);

    this.totalPrice = Math.round(this.totalPrice * 1000) / 1000;

  }

  this.remove = function (productId) {
    let storedItem = this.items[productId];
    console.log('stored items: ', storedItem);

    if (!storedItem) {
      return;
    }

    storedItem.quantity--;
    storedItem.totalPriceOfItem -= storedItem.product.unitPrice - storedItem.product.unitPrice * storedItem.product.discount / 100;
    //rounded
    storedItem.totalPriceOfItem = Math.round(storedItem.totalPriceOfItem * 1000) / 1000;
    this.totalQuantity--;
    this.totalPrice -= storedItem.product.unitPrice - storedItem.product.unitPrice * storedItem.product.discount / 100;
    //rounded
    this.totalPrice = Math.round(this.totalPrice * 1000) / 1000;
  }

  this.updateCartItem = function (productId, quantity) {
    let storedItem = this.items[productId];
    console.log('stored items: ', productId, quantity);
    quantity = parseInt(quantity)
    if (!storedItem || quantity < 0) {
      return;
    }
    this.totalQuantity += quantity - storedItem.quantity;
    this.totalPrice += (storedItem.product.unitPrice - storedItem.product.unitPrice * storedItem.product.discount / 100) * quantity - storedItem.totalPriceOfItem;
    //rounded
    this.totalPrice = Math.round(this.totalPrice * 1000) / 1000;

    storedItem.quantity = quantity;
    storedItem.totalPriceOfItem = (storedItem.product.unitPrice - storedItem.product.unitPrice * storedItem.product.discount / 100) * quantity;
    //rounded
    storedItem.totalPriceOfItem = Math.round(storedItem.totalPriceOfItem * 1000) / 1000;
  }

  this.removeEmptyItem = function () {
    for (const key in this.items) {

      if (this.items[key].quantity == 0) {
        delete this.items[key]
      }
    }
  }

  this.generateCart = function () {
    let arr = [];
    for (const key in this.items) {
      arr.push(this.items[key])
    }

    return arr;
  }
}

module.exports.Cart = Cart;