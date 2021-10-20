const productsCell = document.querySelector('.products'); 

// const checkUserInSession = async () => {
//     const { data } = await axios.get('/authorisation/profile');
//     console.log(data);
//     if(data.status === 'unauthorisate'){
//         registrEl.classList.remove('hidden');  
//         authEl.classList.add('.hidden');
//     } else if (data.status === 'ok'){
        
//         console.log(data)
//     }
// }
// checkUserInSession();


// get All products from db with created card
const getGoods = async () => {
    const { data } = await axios.post('/products');
    //console.log('front', data);
    return data;
};

// showing all products on the page
const renderGoods = async () => {
    const goods = await getGoods();
    productsCell.insertAdjacentHTML('beforeend', goods);
};
renderGoods();



