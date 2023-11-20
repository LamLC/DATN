const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const body = document.getElementById('body');

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
    body.style.background = " linear-gradient(to right,rgb(151, 29, 29), rgb(233, 233, 228))";
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
    body.style.background = " linear-gradient(to right, rgb(233, 233, 228),  #4087f1)";
});