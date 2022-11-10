let data = "http://localhost:5001/useres"

  fetch(data)
  .then((respons) => respons.json())
  .then((result) => rendereData(result));

function rendereData(array = []) {
  array.forEach((e) => {
    let newUser = createElement(
      "tr",
      "bg-light",
      `
      <td>${e.id}</td>
		 <td>${e.user_name}</td>
		 <td>${e.score}</td>
		 <td>
			<button class="btn btn-primary" data-edit=${e.id}>Edit</button>
		 </td>
		 <td>
			<button class="btn btn-danger data-delet="${e.id}">Delet</button>
		 </td>
        `
    );

    $("tbody").append(newUser);
  });
}

function addData() {
  let userNameValue = $(".userName").value.trim();
  let retingValue = $(".userReting").value.trim();

  const user = {
    user_name: userNameValue,
    score: retingValue
  };
  if (userNameValue.length === 0 || retingValue.length === 0) {
    alert("ILTIMOS TO'LDIRING");
  } else {
    fetch(data, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    })
      .then((respons) => respons.json())
      .then((result) => rendereData(result));
  }
}

$("#form").addEventListener("submit", (e) => {
  e.preventDefault();
  addData();
});
