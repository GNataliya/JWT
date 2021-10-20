const productModel = require('../models/product.js');
const categoryModel = require('../models/category.js');

// create product
const addProduct = async (name, category, price, image) => {
        console.log('ctrl', name, category, price, image)
    try {
        const doc = await productModel.create({name, category, price, image});
        console.log('doc', doc)
        const { id } = doc;
        return { status: 'ok', payload: { id } }
    } 
    catch (err) {
        return { status: 'dublicate_name' };
    }
};

// create category in db
const addCategory = async (name) => {
    try {
        const doc = await categoryModel.create({ name });
        //console.log(doc)
        const { id } = doc;
        return { status: 'ok', payload: { id } }
    } catch (err) {
        return { status: 'dublicate_name' };
    }
};

// find all categories' list 
const findCategories = async () => {
    const docs = await categoryModel.find({ })
    //console.log(docs)
    return docs;
};

//find category by name 
const getCategory = async (name) => {
    const docs = await categoryModel.find({ name })
    //console.log(docs)
    return docs;
};

// find all products 
const findAllGoods = async () => {
    const docs = await productModel.find({ })
    .populate('category')
    //.populate('genre');
    return docs;
};

// const getIdfromArr = (arr) => {
//     const docs = arr.map(val => val._id)
//     return docs;
// }

// const getProductById = async (id) => {
//     const doc = await productModel.findOne({ _id: id })
//     //.populate('comments')
//     //.populate('comments.author')
       // return doc;
// }

// найти книгу по параметрам
// const findBook = async (val) => {
//     //const docs = await articleModel.find({ }).select(val);
//     //const docs = await articleModel.find({ }, val );
//     const docs = await productModel.find({ name: val })
//         .populate('category')
//         //.populate('genre');
//     return docs;
// };


module.exports = {
    addProduct,
    addCategory,
    findCategories,
    getCategory,
    findAllGoods,
    // findBook
    //getIdfromArr
};