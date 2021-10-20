const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const { Schema } = mongoose;


const generalSchema = new Schema ({
    name: {
        type: Schema.Types.String,
        default: '',
        required: true,
        minlength:2,
        maxlength:200,
        unique: true           // проверяет на наличие такой же инфо в БД, что б не дублировать
    },
    auth: {
        login: { type: Schema.Types.String, required: true },
        hashPwd: { type: Schema.Types.String,  required: true }   // техническое поле
    }
});

// create hash for password
const hashingPwd = (pwd) => {
    //this.val = val;
    const data = new TextEncoder().encode(pwd);
    const result = crypto.createHash('sha256').update(data).digest('hex');
    return result;
}; 

// create virtual field       создание виртуального поля
generalSchema.virtual('auth.pwd')          // auth.pwd берем из контролера поле клиентского pwd
    .set(function (val) {                 //если поле пытается записать
        const hash = hashingPwd(val);      //хешируем пароль и записываем в поле pwd
        this.auth.hashPwd = hash;
    })
    // .get(() => {                            // получаем инфо виртуального поля
    //     throw new Error('use method checkPwd for check password! Don`t read this field');
    //     return 'wrong password';
    // })

generalSchema.methods.checkPwd = function (pwd) {
    const hash = hashingPwd(pwd);                  // хешируем пароль введенный клиентом
    // console.log('user hash', hash);
    // console.log('hash from pwd in db', this.auth.hashPwd);
    // console.log('this', this);
    const check = hash === this.auth.hashPwd;      // равен ли хеш хешу введенного клиентом пароля
    return check;
}


//const model = mongoose.model('article', generalSchema);
const modelname = path.basename(__filename, '.js');   // название модели совпадает с названием файла модели.
// получаем имя файла без расширения .js
const model = mongoose.model(modelname, generalSchema); // создаем модель
module.exports = model;