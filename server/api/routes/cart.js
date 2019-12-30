const express = require('express');
const router = express.Router();

// create const arr for prod data as provided
// assumptions: products array not to be modified and always accessible
const products = [{
        "id": "A",
        "description": "Apple",
        "unit_price": 2.0,
        "volume_discounts": [{
            "number": 4,
            "price": 7.0
        }]
    }, {
        "id": "B",
        "description": "Banana",
        "unit_price": 12.0,
        "volume_discounts": []
    }, {
        "id": "C",
        "description": "Cranberry",
        "unit_price": 1.25,
        "volume_discounts": [{
            "number": 6,
            "price": 6.0
        }]
    }, {
        "id": "D",
        "description": "Durian",
        "unit_price": 0.15,
        "volume_discounts": []
    }];

// declare cart here to take advantage of scope
let cart = {};

// create new cart
router.post('/new', (req, res, next) => {
    // set cart as empty arr effectively creating new cart
    cart = {};
    res.status(200).json({
        message: 'Success: new cart created'
    });
});

// to be modified to add item by Id to cart
router.post('/add', (req, res, next) => {
    //const prodId = req.params.prodId;
    const toBeAddedProdId = req.body.prodId;

    let prodIdx = products.findIndex((item) => item.id === toBeAddedProdId );
    if( prodIdx === -1 ){
        res.status(404).json({
            message: `Error: product with id ${toBeAddedProdId} does not exist`
        });
    } else { 
        if( toBeAddedProdId in cart ){
            // if key exists increment count
            cart[toBeAddedProdId].count++;
        } else {
            // else add item's prodIdx to cart with count as 1 and prodId as key
            // done so to make for easy/fast indexing of products array 
            // assumes products is always accessible and never modified
            cart[toBeAddedProdId] = { prodIdx: prodIdx, count: 1 };
        }
        res.status(200).json({
            message: `Success: item added to cart by product id ${toBeAddedProdId}`,
            addedProd: cart[toBeAddedProdId]
        });
    }
});

// get total from cart
router.get('/total', (req, res, next) => {

    let total = 0;
    for( let id in cart ){
        let prod = products[cart[id].prodIdx];
        let cartCount = cart[id].count;
        if( !Array.isArray(prod.volume_discounts) || !prod.volume_discounts.length ){
            total += prod.unit_price * cartCount;
        } else {
            if( cartCount % prod.volume_discounts[0].number !== 0 ){
                total += Math.floor( cartCount / prod.volume_discounts[0].number ) * prod.volume_discounts[0].price; // will be zero if cartCount not > required num 
                total += cartCount % prod.volume_discounts[0].number * prod.unit_price;
            } else { // Math.floor shouldn't be neccesary here based on assumptions but prob a good idea to have anyway
                total += Math.floor( cartCount / prod.volume_discounts[0].number ) * prod.volume_discounts[0].price;
            }
        }
    }
    // set 2 decimals for formatting, convert to string add $
    total = '$' + total.toFixed(2);
    res.status(200).json({
        message: `Success: total for cart is ${total}`,
        total: total,
    });
});

// not specified by reqs but simple get returns cart even if undefined
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'get to /cart',
        cart: cart
    });
});

// not specified by reqsfor now clears cart, fairly duplicative of /new endpoint
router.delete('/', (req, res, next) => {
    cart = {};
    res.status(200).json({
        message: 'Success: cart cleared'
    });
});

module.exports = router;