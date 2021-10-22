const authEl = document.querySelector('.auth');
const registrEl = document.querySelector('.signup');
const registrFormShow = document.querySelector('.signUpFormBtn');
// const linkSignIn = document.querySelector('.linkSignIn');

// const checkUserAccess = async () => {
//     const accessToken = await localStorage.getItem('userAccessKey');
//     // const token = JSON.parse(accessToken);
//     console.log('get from localStore', accessToken)
//     const { data } = await axios.post('/authorisation/checkUserToken', accessToken );
//     console.log('19 - checkUser', data);
//     // if(data.status === 'unauthorisate'){
//     //     registrEl.classList.remove('hidden');  
//     //     authEl.classList.add('.hidden');
//     // } else if (data.status === 'ok'){
//     //     // linkSignIn.classList.add('hidden');
//     //     window.location.href = '/'
//     //     // linkSignIn.innerHTML = `<h2>${data.userName}</h2>`;
//     //     // console.log('after status', data)
//     // }
// }
// checkUserAccess();


// const getUserInfo = () => {
//     const dataJson = localStorage.getItem('user');
//     const dataUser = JSON.parse(dataJson); 
//     return dataUser;
// };

// check auth of user
const authFormEl = document.forms.auth;
authFormEl.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const { data } = await axios.post('/authorisation/login', formData);
    console.log('front login:', data);

    if(data.status === 'fail authorisation'){
        authEl.innerHTML = `<h3>Uncorrect login or password</h3>`
    } else if(data.status === 'ok'){
        localStorage.setItem('userAccessKey', data.accessToken);
        window.location.href = '/'
    };

});

// show form for create user profile and hidden other form
registrFormShow.addEventListener('click', (ev) => {
    authEl.classList.add('hidden');
    registrEl.classList.remove('hidden');
    registrFormShow.classList.add('hidden');
});

// send user info for create frofile in db
const signUpEl = document.forms.signup;
signUpEl.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const { data } = await axios.post('/authorisation/signup', formData);
    console.log('front signup:', data);

    if(data.status === 'dublicate_email'){
        registrEl.innerHTML = `<h3>Email is already declarated</h3>`
    } 
    else if(data.status === 'ok'){
        localStorage.setItem('userAccessKey', data.accessToken);
        window.location.href = '/';
    };

});