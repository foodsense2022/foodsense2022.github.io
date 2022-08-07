/*export default  function loginService(username, password) {
    // POST request using fetch with async/await
    const myPost = {
        username: username,
        password: password
    }

    const options = {
        method: 'POST',
        body: JSON.stringify(myPost),
        headers: {
          'Content-Type': 'application/json'
        }
    }
       
    return fetch('http://localhost:3333/login', options).then(res => res.json());
}*/

import API from '../API/api';

export default async function loginService(credentials) {
    return await API.post('/login', credentials);
    // return fetch('http://localhost:3333/login', {
    //     mode: 'cors',
    //     method: 'POST', 
    //     headers: {
    //     'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(credentials)
    // })
    // .then(data => data.json())
}