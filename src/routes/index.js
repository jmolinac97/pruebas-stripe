const {Router} = require('express');

const router = Router();

const stripe = require('stripe')('sk_test_51HGcMEGyck6Sn2Jf581WMAU2D7eciuaO2evqyiydXRXQnkHBabpKa2fyVvHh7wTlSA1n1kcUZ97zZIgD8jyeLGuy00n4W4s7iS');

router.get('/', (req, res)=>{
    res.render('index');
});

router.post('/checkout', async (req, res)=>{
    const customer = await stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    });
    const charge = await stripe.charges.create({
        amount: '3000',
        currency: 'usd',
        customer: customer.id,
        description: 'Video Editing Software'
    });
    const lista = await stripe.customers.list({
        limit:3,
    });
    console.log(charge.id);
    console.log(lista);
    
    //Mostrar vista de éxito
    res.render('download');
});

module.exports = router;