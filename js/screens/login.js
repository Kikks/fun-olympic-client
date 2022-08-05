import axios from 'axios';
import moment from 'moment';
import { backendURL } from '../utils/constants';

document.getElementById('login-form').onsubmit = (event) => {
  event.preventDefault();
  console.log('Here');

  document.querySelector('#submit').disabled = true;
  axios
    .post(`${backendURL}/user/login`, {
      email: document.querySelector('#email').value,
      password: document.querySelector('#password').value,
      date: moment().format('DD-MM-YYYY'),
    })
    .then(({ data }) => {
      localStorage.setItem('token', data.token);
      document.querySelector('#submit').disabled = false;
      window.location.href = '/';
    })
    .catch((error) => {
      document.querySelector('#submit').disabled = false;
      console.log(error?.response?.data);

      if (error?.response?.data) {
        document.querySelector('#errors').innerHTML = `
          <div
            class="mt-10 flex w-full flex-col gap-3 rounded-md bg-red-100 p-2 lg:p-3"
          >
            <h3 class="text-red-500 font-bold">Errors:</h3>

            <ul class="ml-5 list-disc">
              ${Object.values(error.response.data)
                .map(
                  (error) => `
                <li class="text-sm text-red-500">${error}</li>
              `
                )
                .join(' ')}
            </ul>
          </div>
        `;
      }
    });
};
