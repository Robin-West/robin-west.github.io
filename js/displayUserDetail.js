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
  if (JSON.stringify(data).startsWith("Error")){
    document.getElementById("error").textContent = JSON.stringify(data);
    return;
  }
  document.getElementById("userId").innerText = data.userId;
  if (data.lastName == null) {} else
    document.getElementById("name").innerText = data.lastName + ", " + data.firstName;
  if (data.email == null) {} else
    document.getElementById("email").innerText = data.email;
  if (data.location == null) {} else
    document.getElementById("location").innerText = data.location;
  if (data.site == null) {} else
    document.getElementById("site").innerText = data.site;
  if (data.departments == null) {} else
    document.getElementById("department").innerText = data.departments;
  if (data.contactNumbers == null) {} else
    document.getElementById("contact").innerText = data.contactNumbers[0].phoneNumber;
  if (data.addresses == null) {} else
    document.getElementById("address").innerText = data.addresses[0].address;

}

function sendEmail()
{
    //send email and popup/notify as sent
    let tenant = document.getElementById("tenant").innerText;
    let emailAddress = document.getElementById("email").innerText;
    let userId = document.getElementById("userId").innerText;

    const url = "https://stage-api.zebra.com/v2/phoenixDemoApp/api/devices/notifications";
    value = getCookie("token");
    //value = "778437c2-d70f-4aca-b27b-0f4ef08109cb";
  
    fetch(url, {
        method : "POST",
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': value
        },
        body:  '{\"scope\": \"NOTIFICATION\",\"tenantId\" : \"api_demo_app_keycloak\",\"userIds\" : [\"'+userId+'\"],\"notificationTypes\" : [\"EMAIL\"],\"applicationScope\":\"demo\",\"notificationMessage\" : \"Phoenix Test message\",\"subject\" : \"Test Phoenix Demo app Subject\",\"fcmOptions\" : {\"timeToLive\" : 2400000, \"isNotification\" : true,\"priority\" : \"NORMAL\"}}' ,
    });
    alert("Email sent to "+emailAddress+", "+tenant+"!"); 

}