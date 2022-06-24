import axios from 'axios'; 
 

const base_url = "https://docker81177-sportlink.hidora.com"

export const apiRequest = (method, uri, body, header) => {
  const url = `${base_url}${uri}`;
  const httpMethod = method.toUpperCase();

  const requestOptions = {
    method: method
  };

  if (httpMethod === 'POST' || httpMethod === 'PUT' || httpMethod === 'PATCH') {
    requestOptions.body = JSON.stringify(body);
  }
  return fetch(url, requestOptions);
};


 
export const apiRequestAxio = (method, uri, body) => {
  const httpMethod = method.toUpperCase(); 
  document.body.classList.add('loading-indicator');
  const requestOptions = {
    url: `${base_url}${uri}`,
    method: method.toUpperCase(),
    headers:{ "Content-Type": "application/json" }
  };

  if (httpMethod === 'POST' || httpMethod === 'PUT' || httpMethod === 'PATCH') {
    requestOptions.data = JSON.stringify(body);
  }

  let response = axios(requestOptions);

  response.then(result => { 
    document.body.classList.remove('loading-indicator');
    if (!result) {
      response = new Promise((resolve, reject) => {
        resolve({ data: [] });
      });
    }
  })
  return response
};

