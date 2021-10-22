const authEl = document.querySelector('.auth');
const registrEl = document.querySelector('.signup');
const registrFormShow = document.querySelector('.signUpFormBtn');


// check auth of user
const authFormEl = document.forms.auth;
authFormEl.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const { data } = await axios.post('/authorisation/login', formData);

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

    if(data.status === 'dublicate_email'){
        registrEl.innerHTML = `<h3>Email is already declarated</h3>`
    } else if(data.status === 'ok'){
        localStorage.setItem('userAccessKey', data.accessToken);
        window.location.href = '/';
    };

});
