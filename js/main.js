const data = "http://localhost:5500/useres";

// renderUser
const RenderUser = (user) => {
  let userFragment = document.createDocumentFragment();
  user.forEach((e) => {
    let newUser = createElement(
      "tr",
      "bg-light",
      `
        <td>${e.id}</td>
      	<td>${e.user_name}</td>
      	<td>${e.score}</td>
      	<td>
      	<button class="btn btn-primary edid-btn" data-mdb-toggle="modal" data-mdb-target="#exampleModal" data-edit=${e.id}>Edit</button>
      	</td>
      	<td>
      	<button class="btn btn-danger del-btn" data-delet="${e.id}">Delet</button>
      	</td>
      `
    );
    userFragment.appendChild(newUser);
  });
  $("tbody").appendChild(userFragment);
};

const getUser = async () => {
  try {
    const respons = await fetch(data);
    const result = await respons.json();

    RenderUser(result);
  } catch (err) {
    console.log(err);
  }
};

getUser();

$("#form").addEventListener("submit", (e) => {
  addUser();
});

// renderUser end

// addUser

const addUser = async () => {
  const userValue = $("#form1").value.trim();
  const retingValue = $("#form2").value.trim();

  const person = {
    user_name: userValue,
    score: retingValue,
  };

  if (userValue.length === 0 || retingValue.length === 0) {
    alert("malumot To'ldiring");
  } else {
    const respond = await fetch(data, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    const result = await respond.json();
    getUser(result);
  }
};

// addUser end

// deletUse

$("tbody").addEventListener("click", (e) => {
  if (e.target.classList.contains("del-btn")) {
    let deletId = e.target.getAttribute("data-delet");
    delUser(deletId);
  }
});

const delUser = (userId) => {
  fetch(`http://localhost:5500/useres/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
};

// deletUse end

$("tbody").addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-primary")) {
    let id = e.target.getAttribute("data-edit");
    localStorage.setItem("editUser", id);

    fetch(`http://localhost:5500/useres/${id}`)
      .then((res) => res.json())
      .then((result) => setValue(result))
      .catch((err) => console.log(err));
  }
});

const updateUser = () => {
  let id = localStorage.getItem("editUser");

  let newUser = $("#typeText").value.trim();
  let newScore = $("#typeNumber").value.trim();

  fetch(`http://localhost:5500/useres${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_name: newUser,
      score: newScore,
    }),
  });
};

$(".changesData").addEventListener("submit", () => {
  updateUser();
});

function setValue(data) {
  $("#typeText").value = data.user_name;
  $("#typeNumber").value = data.score;
}
