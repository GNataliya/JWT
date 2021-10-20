const inform =  document.querySelector('.inform');
const informCategory =  document.querySelector('.informCategory');             // div с сообщениями пользователю

const selectCategory = document.querySelector('.selectCategory');

// get all categories with rendered card from backend
const categoryList = async () => {
    const { data } = await axios.post('/acp/categoryList');
    selectCategory.insertAdjacentHTML('beforeend', data);
};
categoryList();

// product create form 
const productEl = document.forms.addProduct;
productEl.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const image = formData.get('image')
    console.log(image)
    const { data } = await axios.post('/acp/product', formData);
    console.log('front', data)
    inform.classList.remove('hidden');  
});

// category create form 
const categoryEl = document.forms.addCategory;
categoryEl.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const { data } = await axios.post('/acp/category', formData);
    //console.log(data)
    informCategory.classList.remove('hidden');  
});


