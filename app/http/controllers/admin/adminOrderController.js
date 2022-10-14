const order = require('../../../models/order');

function adminOrderController(){
    return {
        async index(req,res){
            let orders = await order.find({status: {$ne: 'completed'}},null,{sort: {'createdAt': -1}})
            .populate('customerId','-password');
            if(req.xhr)
                return res.json(orders);
            else
                return res.render('admin/orders',{orders: orders});
        }
    }
}

module.exports = adminOrderController;