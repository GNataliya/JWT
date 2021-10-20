const express = require('express');
const axios = require('axios');
const multer = require('multer');
const upload = multer();
const router = express.Router();

const Ajv = require("ajv");
const ajv = new Ajv();
// const bookValidation = require('../routes/jsonSchemas/bookValid.js');

const createProduct = require('../controllers/product.js');
const { uploadsSingle } = require('../controllers/uploadImg.js');

// showing page for create a product in db  
router.get('/', (req, res) => {
    res.render('acp/product');                     // стр books.ejs потому что на одной стр создаю 3 формы, если разные то ссылаемся на нужную страницу
});

// create product card for select list 
const card = (arr) => {
    const createList = arr.reduce((acc, item) => {
        acc += `<option val="${item.id}">${item.name}</option>`
        return acc;
    }, '');
    return createList
};

// get categories list from db 
router.post('/categoryList',  async (req, res) => {
    const getCategories = await createProduct.findCategories();
    res.json(card(getCategories));
});

// router for ajax  for create product
router.post('/product', uploadsSingle, async (req, res) => { 
    const { name, selectCategory, price } = req.body;
    const { filename } = req.file;
    const image = `/imgs/${filename}`;

     // const validate = ajv.compile(bookValidation.bookSchema);
    // const valid = validate(name);

    // if (!valid) {
    //     res.json({
    //         status: 'invalid data',
    //         payload: {
    //             error: validate.errors
    //         }
    //     });
    //     return;
    // };
    
    const findCategory = await createProduct.getCategory(selectCategory);
    const category = findCategory.map(val=>val._id);

    const result = await createProduct.addProduct(name, category, price, image);
    console.log('result', result)
    if (result.status === 'dublicate_name'){
        res.json({ status: 'dublicate_name' })
        return;
    } 
    //console.log(result.payload.id)
    res.json({ status: 'ok', payload: { id: result.payload.id } })
});

// Router for ajax for create category
router.post('/category', upload.none(), async (req, res) => { 
     //console.log(req.body)
     const { name } = req.body;
     //console.log(name)
    //  const validate = ajv.compile(authorValidation.authorSchema);
    //  const valid = validate(name);
 
    //  if (!valid) {
    //      res.json({
    //          status: 'invalid data',
    //          payload: {
    //              error: validate.errors
    //          }
    //      });
    //     return;
    //  };

     const result = await createProduct.addCategory(name);
     //console.log('2', result)               
     if (result.status === 'dublicate_name'){
         res.json({ status: 'dublicate_name' })
         return;
     }  
     res.json({ status: 'ok', payload: { id: result.payload.id } })
});



module.exports = router;
