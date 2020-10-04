fetch('/api/v1/users/', {
    method: 'GET',
    cache: 'no-cache',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
    },
    redirect: 'follow'
})
.then(async response => {
	const data = await response.json();
	if (data.success === true) {
	    const users = data.users;
	    localStorage.setItem("users", users);

	    const table = document.querySelector("table>tbody");
	    const tableHead = document.querySelector("table>thead>tr");
	    const removeHead =  document.createElement("th");
		removeHead.setAttribute("class", "text-center");
		removeHead.textContent = "Remove";

		const accessLevel = localStorage.getItem("access_level");

		const editable = accessLevel > 1 ? true : false;
		const removable = accessLevel > 2 ? true : false;

		if (removable) {
			tableHead.appendChild(removeHead)
		}

		addUsersInTable(table, users, accessLevel, true)

		if (editable) {
			createEditHandler();
		}
		if (removable) {
			createRemoveHandler();
			createAddHandler();
		}

		fetch('/api/v1/users/remote/', {
	        method: 'GET',
	        cache: 'no-cache',
	        headers: {
	            'Content-Type': 'application/json',
	            'Authorization': localStorage.getItem("token")
	        },
	        redirect: 'follow'
	    })
	    .then(async response => {
			const data = await response.json();
			console.log(data)
			if (data.success === true) {
				const users = data.users;
				const table = document.querySelector("table>tbody");
				const accessLevel = localStorage.getItem("access_level");

				addUsersInTable(table, users, accessLevel, false)

			}
		})
		.catch(error => console.error(error));
	} else {
		console.error(error);
		// location.href = "/login/";
	}
})
.catch(error => {
	console.error(error);
	// location.href = "/login/";
});

const createRemoveHandler = () => {
	const removeButtons = document.querySelectorAll("button.btn-danger");
	removeButtons.forEach(function(btn) {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			userTD = btn.closest("tr")
			const userName = userTD.getAttribute("id");
			const userID = document.querySelector(`tr[id="${userName}"]>td.userID`).textContent;

		    fetch('/api/v1/users/'+userID, {
		        method: 'DELETE',
		        cache: 'no-cache',
		        headers: {
		            'Content-Type': 'application/json',
		            'Authorization': localStorage.getItem("token")
		        },
		        redirect: 'follow'
		    })
		    .then(async response => {
			    const data = await response.json();
			    if (data.success === true) {
			        const user = data.user;
			        location.href = "/";
			    } else {
					alert("incorrect data");
			    }
			 })
			 .catch(error => console.error(error));
		});
	});
};

const createEditHandler = () => {

	const editName = document.querySelectorAll("td.userName");
	editName.forEach(function(nameEl) {
		nameEl.addEventListener('input', (e) => {
			e.preventDefault();
			userTR = nameEl.closest("tr")
			const userName = userTR.getAttribute("id");
			const userID = document.querySelector(`tr[id="${userName}"]>td.userID`).textContent;
			const newUserName = document.querySelector(`tr[id="${userName}"]>td.userName`).textContent;

			fetch('/api/v1/users/'+userID, {
		        method: 'PATCH',
		        cache: 'no-cache',
		        headers: {
		            'Content-Type': 'application/json',
		            'Authorization': localStorage.getItem("token")
		        },
		        redirect: 'follow',
		        body: JSON.stringify({ name: newUserName, access_level: 4 }),
		    })
            .then(async response => {
                const data = await response.json();
			    if (data.success === true) {
			        const user = data.user;
			    } else {
					alert("incorrect data");
			    }
            })
			.catch(error => console.error(error));
		});
	});
};

const createAddHandler = () => {

	const addUserButton = document.getElementById("addUserButton");
	addUserButton.addEventListener('click', (e) => {
		e.preventDefault();
		userTR = document.getElementById("addUser");
		const name = document.getElementById("addUserName").textContent;
		const access_level = document.getElementById("addUserAccessLevel").textContent;
		const password = document.getElementById("addUserPass").textContent;

	    fetch('/api/v1/users/', {
	        method: 'POST',
	        cache: 'no-cache',
	        headers: {
	            'Content-Type': 'application/json',
	            'Authorization': localStorage.getItem("token")
	        },
	        redirect: 'follow',
	        body: JSON.stringify({ name, access_level, password }),
	    })
	    .then(async response => {
		    const data = await response.json();
		    if (data.success === true) {
		        const user = data.user;
		        location.href = "/";
		    } else {
				alert("incorrect data");
		    }
		})
		.catch(error => console.error(error));
	});
};


