// раннер отвечающий за коннект к БД
const mongoose = require('mongoose');
const db = require('../../storages/db');            

// тянем настройки из конфига
// const url = 'mongodb://localhost:27017/myFirstDB';
// const options = {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     };
const { url, options } = require('../../config').db;     // подключаем конфиг бд

// сам раннер
const init = () => new Promise((resolve, reject) => {
    // если произойдет ошибка коннекта, она вызовет исключение и сработает reject
    mongoose.connect(url, options);      // связь с бд

    db.on('error', (err) => {
    // здесь ловятся ошибки возникающие в прецессе работы бд
    console.log('DB err:', err);
    });

    db.once('open', () => {
    // двигает дальше процесс раннинга. 
    // у могуса есть кеш запросов
    // Порядок не важен, но воизбежание странных ситуаций он настроен так же как и другие раннеры
    console.log('Coinnected to DB');
    resolve();
    });

    // const db = mongoose.connection;

    db.once('close', () => {
        // уведомления для логов
        console.log('Close connected to DB');
    });

    //console.log('ok');
});



module.exports = init;




// // простая версия подключения к бд, не совсем корректно по архитектуре приложения
// const mongoose = require('mongoose');
// const url = 'mongodb://localhost:27017/myFirstDB';
// const options = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// };

// mongoose.connect(url, options);
// const db = mongoose.connection;

// db.on('error', (err) => {
//     console.log('DB err:', err);
// });

// db.once('open', () => {
//     console.log('Coinnected to DB');
// });

// db.once('close', () => {
//     console.log('Close connected to DB');
// });

// console.log('ok');
