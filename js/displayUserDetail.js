function getUser(userId, callback) {
  const url = "https://stage-api.zebra.com/v2/phoenixDemoApp/api/users/"+userId;

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

function showUserDetail(data)
{
  if (JSON.stringify(data).startsWith("Error"))
    document.getElementById("userDetail").textContent = JSON.stringify(data);

    document.getElementById("userDetail").textContent = JSON.stringify(data);
}
