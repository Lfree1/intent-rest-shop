import axios from 'axios';

const url = 'http://localhost:3000/';

class Service {
    // get total from api
    static getTotal() {
        let totalUrl = url + 'cart/total';
        return new Promise(async (resolve, reject)  => {
            try {
                const res = await axios.get(totalUrl);
                const data = res.data;
                resolve(data);
            } catch (err) {
                reject(err);
            }
        })
    }

    // create cart
    static createCart() {
        let createUrl = url + 'cart/new';
        return axios.post(createUrl);
    }

    // add item to cart by prod id
    static addItem(prodId) {
        let addUrl = url + 'cart/add';
        return axios.post(addUrl, { prodId: prodId });
    }
}

export default Service