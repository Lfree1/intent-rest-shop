const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const cartRoutes = require('./api/routes/cart');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors());
// app.use((res, req, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header(
//         'Access-Control-Allow-Headers', 
//         'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//     );
//     res.header("Access-Control-Expose-Headers", "Access-Control-Allow-Origin");
//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
//         return res.status(200).json({});
//     }
//     next();
// });

app.use('/cart', cartRoutes);

// handle all other routes/errors
app.use((req, res, next) => {
    const err = new Error('Route not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.stats || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

// app.use((req, res, next) => {
//     res.status(200).json({
//         message: '200 response'
//     });
// });

module.exports = app;