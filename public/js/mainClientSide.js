const productsCell = document.querySelector('.products'); 
const linkSignIn = document.querySelector('.linkSignIn');

const checkUserAccess = async () => {
    
    const accessToken = await localStorage.getItem('userAccessKey');
    
    const { data } = await axios.post('/authorisation/checkUserToken', accessToken );
    
    if(data.status === 'unauthorisate'){
        window.location.href = '/authorisation'
    } else if (data.status === 'ok'){
        linkSignIn.innerHTML = `<h3>${data.payload.name}</h3>`;
    };
    
};
checkUserAccess();


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



