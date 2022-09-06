/* https://www.w3schools.com/js/js_cookies.asp */
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
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

const refreshToken = async () => {
    value = getCookie("token");
    const response = await fetch('https://test-api1.zebra.com/v2/phoenixDemoApp/identity/token/refresh', {
      method: 'POST',
      body: '{\"token\": \"'+value+'\"}' ,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let resp = await response;
    if (resp.ok){
        const myJson = resp.json(); //extract JSON from the http response
        // setCookie("token",myJson, 1);
        setCookie("token",myJson.token, 1);
    }
    else
        deleteCookie("token");
    return;
  }

async function logout() {
    value = getCookie("token");
    const response = await fetch('https://test-api1.zebra.com/v2/phoenixDemoApp/identity/token/logout', {
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

  async function verify() {
    value = getCookie("token");
    let verified = false;
    const response = await fetch('https://test-api1.zebra.com/v2/phoenixDemoApp/identity/oauth/token/verify', {
      method: 'POST',
      body: '{\"access_token\": \"'+value+'\"}' ,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    await response;
    if (response.ok){
        verified = true;
    }
    else {
        deleteCookie("token");
    }
    return verified;
  }