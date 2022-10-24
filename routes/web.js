const homeController = require('../app/http/controllers/homeController');
const authController = require('../app/http/controllers/authController');
const cartController = require('../app/http/controllers/customers/cartController');
const orderController = require('../app/http/controllers/customers/orderController');
// Admin
const adminOrderController = require('../app/http/controllers/admin/adminOrderController');
const adminStatusController = require('../app/http/controllers/admin/adminStatusController');
// Middlewares
const guest = require('../app/http/middlewares/guest');
const auth = require('../app/http/middlewares/auth');
const admin = require('../app/http/middlewares/admin');

function initRoutes(app){

    app.get('/',homeController().index);
    
    app.get('/login',guest,authController().login);

    app.post('/login',authController().postLogin);
    
    app.get('/register',guest,authController().register);
    
    app.post('/register',authController().postRegister);

    app.post('/logout',authController().logout);

    app.get('/cart',cartController().index);

    app.post('/update-cart',cartController().update);

    // Customer Routes
    app.post('/orders',auth,orderController().store);
    app.get('/customer/orders',auth,orderController().index);
    app.get('/customer/orders/:id',auth,orderController().show);
    

    // Admin Routes
    app.get('/admin/orders',admin,adminOrderController().index);
    app.post('/admin/order/status',admin,adminStatusController().update);

}

module.exports = initRoutes;