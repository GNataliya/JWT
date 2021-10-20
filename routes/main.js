const express = require('express');
const axios = require('axios');
const multer = require('multer');
const upload = multer();
const router = express.Router();

const products = require('../controllers/product.js');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('main', {title: 'products' });
});

// create product card for products 
const card = (arr) => {
  const createCard = arr.reduce((acc, item) => {
      acc += `<div class="goods-card" val="${item.id}">
                <div class="img" src="/product/:id">
                  <a href="/product/:id">
                  <img src="${item.image}" alt="${item.name}" >
                </div> 
                <div class="name">
                  <a href="/product/:id">${item.name}</a>
                </div>
                <div class="price">$ ${item.price}</div>
              </div>`
      return acc;
  }, '');
  return createCard;
};

// отдаем все книги из БД на фронт
router.post('/products',  async (req, res) => { 
  const getData = await products.findAllGoods();
  //console.log('back', getData)
  //const findCategory = await createProduct.getCategory(selectCategory);
  //const categoryId = getData.category.map(val=>val._id);
  //console.log('id', products.getIdfromArr(getData))
  res.json(card(getData));
});



module.exports = router;
