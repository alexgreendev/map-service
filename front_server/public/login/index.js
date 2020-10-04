const form = document.getElementById("form");
const submit = document.getElementById("submit");

submit.addEventListener('click', (e) => {
	e.preventDefault();

	const name = document.getElementById("username").value;
	const password = document.getElementById("password").value;

	postData('/api/v1/login/', { name, password })
	  .then(data => {
		const user = data.user;
		localStorage.setItem("user", JSON.stringify(user));
		localStorage.setItem("token", data.token);
		location.href = "/";
	  })
	  .catch(error => alert(JSON.stringify(error)));
});

function postData(url = '', data = {}) {
    return fetch(url, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify(data),
    })
    .then(response => response.json());
}
