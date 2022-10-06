function getUsers(callback) {
  const url = "https://stage-api.zebra.com/v2/phoenixDemoApp/api/users/?pageSize=30&tenantId=" + tenant;

  value = "Bearer " + getCookie("token");
    //debug local
  //value = "Bearer 60d23122-1927-4263-bdb6-0526754bd812"

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
    document.getElementById("table").textContent = JSON.stringify(data);

  let userTable = document.getElementById("userTable");
  for (let i = 0; i < data.users.length; i++) {
    let row = document.createElement("tr");
  
    row.id = data.users[i].userId;
    let td1 = document.createElement("td");
    td1.innerText = data.users[i].userId;

    row.appendChild(td1);
    let td2 = document.createElement("td");
    td2.innerText = data.users[i].firstName;
    if (td2.innerText == 'undefined') td2.innerText = '&nbsp;';
    row.appendChild(td2);
    let td3 = document.createElement("td");
    td3.innerText = data.users[i].lastName;
    if (td3.innerText == 'undefined') td3.innerText = '&nbsp;';
    row.appendChild(td3);
    let td4 = document.createElement("td");
    td4.innerText = data.users[i].email;
    if (td4.innerText == 'undefined') td4.innerText = '&nbsp;';
    row.appendChild(td4);

    row.onclick(function(){window.location="./UserDetail.html?userId=" + data.users[i].userId + ""});
    //row.onclick(window.location="./UserDetail.html?userId=" + data.users[i].userId + "");
    //let td5 = document.createElement("td");
    //td5.innerText = "View Detail";
    //td5.row.appendChild(td5);
    if (data.users[i].userStatus == "OFFLINE")
      row.classList.add("table-warning");
    else row.classList.add("table-success");
    userTable.appendChild(row);
  }
  userTable.appendChild(row);
  //document.getElementById("table").textContent = JSON.stringify(data);
}
