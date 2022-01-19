const baseURL = process.env.REACT_APP_API_URL;
async function api(path, method = "GET", payload) {
  const options = {
    headers: { "Content-Type": "application/json" },
    method: method,
    body: JSON.stringify(payload),
  };
  return await errorHandler(fetch(baseURL + path, options));
}

async function errorHandler(promise) {
  return promise
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((err) => {
          const errors = { errors: err, status: res.status };
          return errors;
        });
      }
    })
    .then((json) => {
      if ("errors" in json) {
          console.log('error', json)
        return {
          errors: json.errors,
          status: json.status,
          data: null,
        };
      } else {
        return {
          data: json,
          errors: null,
        };
      }
    });
}

function storeTokens(tokenPair) {
    localStorage.setItem("accessToken", tokenPair.access);
    localStorage.setItem("refreshToken", tokenPair.refresh);
    console.log(
      localStorage.getItem("accessToken"),
      localStorage.getItem("refreshToken")
    );
  }
  async function refreshToken() {
    const rToken = localStorage.getItem("refreshToken");
    const response = await api("api/token/refresh/", "POST", {
      refresh: rToken,
    });
    if (!response.errors) {
      const tokenPair = { ...response.data, refresh: rToken };
      storeTokens(tokenPair);
    }
  }
 export async function apiLogin(path, payload){
     console.log(payload)
    const response = await api(path, 'POST', payload)
    const tokenPair = response.data
    storeTokens(tokenPair)
    return response
  }

  export async function apiCRUD(path, method='GET', payload){
      //check storage for access token. 
        //if access token then try to make corresponding request
            //if req fails bc expired access token, 
                //then check for refresh token and 
                    //if present try to refresh token
                        // if successful refresh, then retry from top
                    //else throw token error, handle redirect elsewhere
            //if fails for other reason return error, handle elsewhere
            //else (res successful) return response
        //else throw token error, handle redirect elsewhere
  }

export default api;

