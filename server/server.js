const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const port = process.env.PORT || 3002;

const formidable = require('express-formidable');                       // 5
const cloudinary = require('cloudinary');

const app = express();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true })

const async = require('async');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})

// Models

require('./models/brand.js');
require('./models/payment.js');
require('./models/product.js');
require('./models/site.js');
require('./models/user.js');
require('./models/wood.js');
const Brand = mongoose.model('Brand');
const Payment = mongoose.model('Payment');
const Product = mongoose.model('Product');
const Site = mongoose.model('Site');
const User = mongoose.model('User');
const Wood = mongoose.model('Wood');

// Middleware

const {auth} = require('./middleware/auth.js');
const {admin} = require('./middleware/admin.js');

// Brand

app.post('/api/product/brand', auth, admin, (req,res) => {
    const brand = new Brand(req.body);
    brand.save((err, newBrand) => {
        if (err) return res.json({success:false, err});
        res.status(200).json({
            success:true, newBrand
        })
    })
})

app.get('/api/product/brands', (req,res) => {
    Brand.find({}, (err, brands) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(brands);
    })
})

// Products

app.post('/api/product/shop', (req,res) => {
    let {filters, order='desc', sortBy='_id', limit=100, skip} = req.body;
    skip = parseInt(skip);
    let findArgs = {};
    for (let key in filters) {
        if (filters[key].length > 0) {
            if (key === 'price') {
                const [$gte, $lte] = filters[key];
                findArgs[key] = { $gte, $lte }
            } else {
                findArgs[key] = filters[key]
            }
        }
    }

    findArgs['publish'] = true;

    Product
        .find(findArgs)
        .populate('brand')
        .populate('wood')
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, articles) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({
                size: articles.length,
                articles
            })
        })
})

app.post('/api/product/product', auth, admin, (req,res) => {
    const product = new Product(req.body);
    product.save((err, product) => {
        if (err) return res.json({success:false, err});
        res.status(200).json({
            success:true, product
        })
    })
});

//  /products?sortBy=sold&order=desc&limit=4
//  /products?sortBy=createdAt&order=desc&limit=4
app.get('/api/product/products', (req,res) => {
    let {order='asc', sortBy='_id', limit=100} = req.query;
    Product
        .find()
        .populate('brand')
        .populate('wood')
        .sort([[sortBy, order]])
        .limit(parseInt(limit, 10))
        .exec((err, products) => {
            if (err) return res.status(400).send(err);
            return res.status(200).send(products)
        })
})


// /api/product/products_by_id?id=foo,bar,qux&type=array (or single, or nothing)
app.get('/api/product/products_by_id/', (req,res) => {
    let {type, id:items} = req.query;
    if (type === 'array') {
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(i => mongoose.Types.ObjectId(i))
    }
    Product
        .find({'_id': {$in:items}})
        .populate('brand')
        .populate('wood')
        .exec((err, products) => {
            if (err) return res.status(400).send(err);
            return res.status(200).send(products)
        })
})

// Wood

app.post('/api/product/wood', auth, admin, (req,res) => {
    const wood = new Wood(req.body);
    wood.save((err, wood) => {
        if (err) return res.json({success:false, err});
        res.status(200).json({
            success:true, wood
        })
    })
});

app.get('/api/product/woods', (req,res) => {
    Wood.find({}, (err, woods) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(woods);
    })
})

// Users

app.get('/api/users/auth', auth, (req,res) => {
    const {user:{cart, email, history, lastname, name, role}} = req;
    res.status(200).json({
        cart, email, history,
        isAdmin: role === 0 ? false : true,
        isAuth: true,
        lastname, name, role
    })
})

app.get('/api/users/logout', auth, (req,res) => {
    User.findOneAndUpdate(
        {_id:req.user._id},
        {token:''},
        (err, doc) => {
            if (err) return res.json({success:false, err});
            return res.status(200).send({success:true})
        }
    )
})

app.post('/api/users/register',(req,res)=>{
    const user = new User(req.body);
    user.save((error, doc) => {
        if (error) return res.json({success:false, error})
        res.status(200).json({success: true})
    })
    res.status(200);
})

app.post('/api/users/login',(req,res)=> {
    const {email, password} = req.body;
    User
        .findOne({email}, (err, user) => {
            if (!user) return res.json({
                loginSuccess: false,
                message: 'Auth failed1'
            })
            user.comparePassword(password, (err, isMatch) => {
                if (!isMatch) return res.json({
                    loginSuccess: false,
                    message: 'Auth failed2'
                });
                user.generateToken((err, user) => {
                    if (err) return res.status(400).send(err);
                    res
                        .cookie('waves_auth', user.token)
                        .status(200)
                        .json({loginSuccess:true})
                })
            });
        })
})

app.post('/api/users/uploadimage', auth, admin, formidable(), (req,res) => {
        const {path} = req.files.file;
        const cb = (result) => {
            res.status(200).send({
                public_id: result.public_id,
                url: result.url
            })
        }
        const config = {
            public_id: `${Date.now()}`,
            resource_type: 'auto'
        }
        cloudinary.uploader.upload(path, cb, config)
    })

app.get('/api/users/removeimage', auth, admin, (req,res) => {
        let image_id = req.query.public_id;
        const cb = (err, result) => {
            if (err) return res.json({success:false, err});
            res.status(200).send('ok');
        }
        cloudinary.uploader.destroy(image_id, cb)
    })

app.post('/api/users/addToCart', auth, (req,res) => {
        const {_id} = req.user;
        const {productId} = req.query;
        User.findOne({_id})
            .then(user => {
                let dupe = false;
                user.cart.forEach(item => {
                    if (item.id == productId) dupe = true;
                })
                if (dupe) {
                    User.findOneAndUpdate(
                        {_id, "cart.id": mongoose.Types.ObjectId(productId)},
                        {$inc: { 'cart.$.quantity': 1 }},
                        {new: true},
                        (err, doc) => {
                            if (err) return res.json({success:false, err});
                            res.status(200).json(doc.cart);
                        }
                    )
                } else {
                    const cart = {id: mongoose.Types.ObjectId(productId), quantity: 1, date: Date.now()}
                    User.findOneAndUpdate(
                        {_id},
                        {$push: {cart}},
                        {new: true},
                        (err, doc) => {
                            if (err) return res.json({success:false, err});
                            res.status(200).json(doc.cart);
                        }
                    )
                }
            })
            .catch(e => console.log(e))

    })

app.get('/api/users/removeFromCart', auth, (req,res) => {
    const {_id} = req.user;
    const productID = mongoose.Types.ObjectId(req.query.id)
    User.findOneAndUpdate(
        {_id},
        {'$pull': { 'cart': {'id': productID} }},
        {new: true},
        (err, doc) => {
            let {cart} = doc;
            let arr = cart.map(item => mongoose.Types.ObjectId(item.id))
            Product
                .find({'_id': { $in: arr }})
                .populate('brand')
                .populate('wood')
                .exec((err, cartDetails) => {
                    return res.status(200).json({
                        cartDetails, cart
                    })
                })
        }
    )
})

app.post('/api/users/successBuy', auth, (req,res) => {
    let history = [];
    let transactionData = {};
    req.body.cartDetails.forEach(item => {
        const {brand, name, _id:id, price, quantity} = item;
        history.push({
            dateOfPurchase: Date.now(),
            name, brand: brand.name, id, price, quantity,
            paymentId: req.body.paymentData.paymentID
        })
    })
    const {_id:id, name, lastname, email} = req.user;
    transactionData.user = {id, name, lastname, email};
    transactionData.data = req.body.paymentData;
    transactionData.products = history;
    User
        .findOneAndUpdate(
            {_id: req.user._id},
            {$push: {history}, $set: {cart:[]}},
            {new: true},
            (err, user) => {
                if (err) return res.json({success: false, err})

                const payment = new Payment(transactionData);
                payment.save((err, doc) => {
                    if (err) return res.json({success: false, err})
                    let products = [];
                    doc.products.forEach((prod) => {
                        const {id, quantity} = prod;
                        products.push({id, quantity})
                    })
                    async.eachSeries(products, (item, callback) => {
                            console.log('------------------------------------------');
                            console.log('inside async.eachSeries');
                            console.log('item ',item);
                            console.log('------------------------------------------');
                            Product.update(
                                {_id: item.id},
                                {$inc:{'sold': item.quantity}},
                                {new: false},
                                callback
                            )
                        },
                        (err) => {
                            if (err) return res.json({success: false, err})
                            res.status(200).json({
                                success: true,
                                cart: user.cart,
                                cartDetails: []
                            })
                        }
                    )

                })
            }
        )
})

app.post('/api/users/update_profile', auth, (req,res) => {
    User
        .findOneAndUpdate(
            {_id: req.user._id},
            {'$set': req.body},
            {new: true},
            (err, doc) => {
                if (err) return res.json({success: false, err});
                return res.status(200).send({success: true});

            }
        );
})

//////////////////////// Site ///////////////////////

app.get('/api/site/site_data', (req,res) => {
    Site.find(
        {},
        (err, doc) => {
            if (err) return res.status(400).send(err);
            return res.status(200).send(doc[0].siteInfo);
        }
    );
})

app.post('/api/site/site_data', auth, admin, (req,res) => {
    Site.findOneAndUpdate(
        {name: 'Site'},
        {"$set": {siteInfo: req.body}},
        {new: true},
        (err, doc) => {
            if (err) return res.json({success: false, err});
            return res.status(200).send({success:true, siteInfo: doc.siteInfo});
        }
    )
})


app.listen(port, ()=>{
    console.log('running on port ' + port);
})


// 5 -  get images from incoming request