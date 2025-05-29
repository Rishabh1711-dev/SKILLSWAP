
document.addEventListener('DOMContentLoaded', function () {
const form = document.querySelector('form');
const getStartedLink = document.querySelector('.get-started');
if (form) {
form.addEventListener('submit', function (e) {
e.preventDefault();
        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;

        if (username === '1711' && password === '1711') {
            alert("SUCCESSFUL");
            window.location.assign("skillswap.html");
        } else {
            alert("Wrong credentials hint -- 1711 --");
        }
    });
}
});

