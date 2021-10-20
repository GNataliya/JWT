// благодаря єтому файлу работают конфиги. Не нужно его менять чтоб изменить конфиги.
// const nconf = require('nconf');
const path = require('path');
const fs = require('fs');
const deepFreeze = require('deep-freeze');

// найдем все файлы в папке конфигов, кроме этого (кроме index.js)
const configFiles = fs.readdirSync(__dirname).filter((file) => {
    if (path.extname(file) !== '.js' || path.basename(file) === 'index.js') {
        return false;
    }

    return true;
});

// создадим переменную в которую запишем все конфиги из файлов
const config = {};
// построим полній путь к файлу и добавим в конфиг
configFiles.forEach((filename) => {
    // построим полный путь 
    const configName = path.basename(filename, '.js');
    const filepath = path.resolve(__dirname, filename);
    const store = require(filepath);

//добавим конфиг
config[configName] = store;
});

//фризим конфиги чтобы никто случайно их не поломал в процессе работы приложения
deepFreeze(config);

//шарим
module.exports = config;
