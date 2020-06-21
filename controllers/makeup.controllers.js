const { ProductModel } = require('../models');

module.exports.getHome = async (req, res) => {
    const products = await ProductModel.findAll();
    res.render('index', { navActive: 'home', products });
}
module.exports.getFaceMakeup = (req, res) => {
    res.render('face-makeup', { navActive: 'face-makeup' });
}
module.exports.getEyeMakeup = (req, res) => {
    res.render('eye-makeup', { navActive: 'eye-makeup' });
}
module.exports.getLipMakeup = (req, res) => {
    res.render('lip-makeup', { navActive: 'lip-makeup' });
}
module.exports.getTipBeauty = (req, res) => {
    res.render('tip-beauty', { navActive: 'tip-beauty' });
}
module.exports.getContact = (req, res) => {
    res.render('contact', { navActive: 'contact' });
}
module.exports.getTipBeautySingle = (req, res) => {
    res.render('tip-beauty-single', { navActive: 'tip-beauty-single' });
}