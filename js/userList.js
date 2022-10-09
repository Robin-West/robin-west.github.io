function getUsers(callback) {
  const url = "https://stage-api.zebra.com/v2/phoenixDemoApp/api/users/?pageSize=30&tenantId=" + tenant;

  value = "Bearer " + getCookie("token");
    //debug local
  //value = "Bearer 2abb0f51-db98-4473-b0a0-e44f93f35442"

  fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'accept': 'application/json',
      'authorization': value
    }
  })
  .then((response) => {
      if (!response.ok) {
          throw new Error(response.status + " " + response.statusText)
      }
      return response.json();
  })
  .then(data => {
    callback(data);
  })
  .catch(function(error) {
      callback("Error: " + error);
  });
}

function showUsers(data)
{
  if (JSON.stringify(data).startsWith("Error"))
    document.getElementById("error").textContent = JSON.stringify(data);

  let userTable = document.getElementById("userTable");
  for (let i = 0; i < data.users.length; i++) {
    let row = document.createElement("tr");
  
    row.id = data.users[i].userId;
    let td1 = document.createElement("td");
    td1.innerText = data.users[i].userId;

    row.appendChild(td1);
    let td2 = document.createElement("td");
    td2.innerText = data.users[i].firstName;
    if (td2.innerText == 'undefined') td2.innerText = ' ';
    row.appendChild(td2);
    let td3 = document.createElement("td");
    td3.innerText = data.users[i].lastName;
    if (td3.innerText == 'undefined') td3.innerText = ' ';
    row.appendChild(td3);
    let td4 = document.createElement("td");
    td4.innerText = data.users[i].email;
    if (td4.innerText == 'undefined') td4.innerText = ' ';
    row.appendChild(td4);

    //TODO: this executes immediately with the first user in the list
    //it is meant to be a row onclick event executable in the browser
    row.onclick = goToDetail(data.users[i].userId);

    if (data.users[i].userStatus == "OFFLINE")
      row.classList.add("table-warning");
    else row.classList.add("table-success");
    userTable.appendChild(row);
  }
  userTable.appendChild(row);
}

function goToDetail(id){
  window.location='./UserDetail.html?userId=' + id;
}