const frisby = require('frisby');

it(`should test creation of cart, 
    then addition of products A,B,C,D,A,B,A,A in that order to cart,
    then test for total being equal to $32.40`, function(){
        return frisby.post('http://localhost:3000/cart/new', {})
            .expect('status', 200)
            .then(function(){
                return frisby.post('http://localhost:3000/cart/add', { "prodId": "A" })
                    .expect('status', 200).then(function(){
                        return frisby.post('http://localhost:3000/cart/add', { "prodId": "B" })
                            .expect('status', 200).then(function(){
                                return frisby.post('http://localhost:3000/cart/add', { "prodId": "C" })
                                    .expect('status', 200).then(function(){
                                        return frisby.post('http://localhost:3000/cart/add', { "prodId": "D" })
                                            .expect('status', 200).then(function(){
                                                return frisby.post('http://localhost:3000/cart/add', { "prodId": "A" })
                                                    .expect('status', 200).then(function(){
                                                        return frisby.post('http://localhost:3000/cart/add', { "prodId": "B" })
                                                            .expect('status', 200).then(function(){
                                                                return frisby.post('http://localhost:3000/cart/add', { "prodId": "A" })
                                                                    .expect('status', 200).then(function(){
                                                                        return frisby.post('http://localhost:3000/cart/add', { "prodId": "A" })
                                                                            .expect('status', 200).then(function(){
                                                                                return frisby.get('http://localhost:3000/cart/total')
                                                                                    .expect('status', 200)
                                                                                    .expect('json', 'message', "Success: total for cart is $32.40")
                                                                                    .expect('json', 'total', '$32.40')
                                                                            })
                                                                    })
                                                            })
                                                    })
                                            })
                                    })
                            })
                    })
            })
    });

 it(`should test creation of cart, 
    then addition of products C,C,C,C,C,C,C in that order to cart,
    then test for total being equal to $7.25`, function(){
        return frisby.post('http://localhost:3000/cart/new')
            .expect('status', 200)
            .then(function(){
                return frisby.post('http://localhost:3000/cart/add', { "prodId": "C" })
                    .expect('status', 200).then(function(){
                        return frisby.post('http://localhost:3000/cart/add', { "prodId": "C" })
                            .expect('status', 200).then(function(){
                                return frisby.post('http://localhost:3000/cart/add', { "prodId": "C" })
                                    .expect('status', 200).then(function(){
                                        return frisby.post('http://localhost:3000/cart/add', { "prodId": "C" })
                                            .expect('status', 200).then(function(){
                                                return frisby.post('http://localhost:3000/cart/add', { "prodId": "C" })
                                                    .expect('status', 200).then(function(){
                                                        return frisby.post('http://localhost:3000/cart/add', { "prodId": "C" })
                                                            .expect('status', 200).then(function(){
                                                                return frisby.post('http://localhost:3000/cart/add', { "prodId": "C" })
                                                                    .expect('status', 200).then(function(){
                                                                        return frisby.get('http://localhost:3000/cart/total')
                                                                            .expect('status', 200)
                                                                            //.expect('json', '*', {"message":"Success: total for cart is 7.25","total":7.25})
                                                                            .expect('json', 'message', "Success: total for cart is $7.25")
                                                                            .expect('json', 'total', '$7.25')
                                                                    })
                                                                    
                                                            })
                                                    })
                                            })
                                    })
                            })
                    })
            })
    });

 it(`should test creation of cart, 
    then addition of products A,B,C,D in that order to cart,
    then test for total being equal to $15.40`, function(){
        return frisby.post('http://localhost:3000/cart/new')
            .expect('status', 200)
            .then(function(){
                return frisby.post('http://localhost:3000/cart/add', { "prodId": "A" })
                    .expect('status', 200).then(function(){
                        return frisby.post('http://localhost:3000/cart/add', { "prodId": "B" })
                            .expect('status', 200).then(function(){
                                return frisby.post('http://localhost:3000/cart/add', { "prodId": "C" })
                                    .expect('status', 200).then(function(){
                                        return frisby.post('http://localhost:3000/cart/add', { "prodId": "D" })
                                            .expect('status', 200).then(function(){
                                                return frisby.get('http://localhost:3000/cart/total')
                                                    .expect('status', 200)
                                                    //.expect('json', '*', {"message":"Success: total for cart is 15.4","total":15.4})
                                                    .expect('json', 'message', "Success: total for cart is $15.40")
                                                    .expect('json', 'total', '$15.40')
                                            })
                                    })
                            })
                    })
            })
    })
