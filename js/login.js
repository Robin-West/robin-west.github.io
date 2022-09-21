/* https://www.w3schools.com/js/js_cookies.asp */
function setCookie(cname, cvalue, exhours) {
    const d = new Date();
    d.setTime(d.getTime() + (exhours*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";Secure;path=/";
  }

/* https://www.w3schools.com/js/js_cookies.asp */
function getCookie(cname) {
    let name = cname + "=";
    let value = "";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        //remove token if expired
        const d = new Date();
        const cd = new Date(ca[2]);
        if (d > cd){
            value = "";
            deleteCookie(cname);
        }
        else
            value = c.substring(name.length, c.length);
      }
    }
    return value;
  }

function deleteCookie(cname)
{
    document.cookie = cname + "; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function login() {
//   window.location.replace("https://uat-ssppcorep.pp.zebra.com/api/identity/token/api_demo_app?redirectUri=" + window.location.href);
    window.location.replace("https://uat-ssppcorep.pp.zebra.com/identity/login/api_demo_app_keycloak?redirectUri=" + window.location.href);
}

function refreshToken(callback) {
  const url = "https://stage-api.zebra.com/v2/phoenixDemoApp/identity/token/refresh";
  value = getCookie("token");

  fetch(url, {
      method : "POST",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: '{\"token\": \"'+value+'\"}' ,
  })
  .then((response) => {
      if (!response.ok) {
          throw new Error(response.error)
      }
      return response.json();
  })
  .then(data => {
    setCookie("token",data.token, 1);
    callback();
  })
  .catch(function(error) {
      deleteCookie("token");
      callback();
  });
}

async function logout() {
    value = getCookie("token");
    const response = await fetch('https://stage-api.zebra.com/v2/phoenixDemoApp/identity/token/logout', {
      method: 'POST',
      body: '{\"token\": \"'+value+'\"}' ,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    await response;
    deleteCookie("token");
    return;
  }

async function refresh(){
  await refreshToken(viewToken);
  setTimeout(refresh, (refreshtime*60*1000));
}
