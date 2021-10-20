const path = require('path');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const generalSchema = new Schema ({
    name: {
        type: Schema.Types.String,
        required: true,
        minlength:2,
        maxlength:200,
        unique: true           // проверяет на наличие такой же инфо в БД, что б не дублировать
    },
});

//const model = mongoose.model('article', generalSchema);
const modelname = path.basename(__filename, '.js');   // название модели совпадает с названием файла модели.
// получаем имя файла без расширения .js
const model = mongoose.model(modelname, generalSchema); // создаем модель
module.exports = model;
