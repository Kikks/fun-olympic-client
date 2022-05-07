import axios from 'axios';
import { backendURL } from '../../utils/constants';

const login = () => {
  document.querySelector('#submit').disabled = true;
  axios
    .post(`${backendURL}/admin/login`, {
      email: document.querySelector('#email').value,
      password: document.querySelector('#password').value,
    })
    .then(({ data }) => {
      localStorage.setItem('token', data.token);
      document.querySelector('#submit').disabled = false;
      window.location.href = '/admin';
    })
    .catch((error) => {
      document.querySelector('#submit').disabled = false;
      console.log(error?.response?.data);

      if (error?.response?.data) {
        document.querySelector('#errors').innerHTML = `
          <div
            class="mt-10 flex w-full flex-col gap-5 rounded-md bg-red-200 p-5 lg:p-10"
          >
            <h3 class="text-xl text-red-500">Errors</h3>

            <ul class="ml-5 list-disc">
              ${Object.values(error.response.data).map(
                (error) => `
                <li>${error}</li>
              `
              )}
            </ul>
          </div>
        `;
      }
    });
};

window.login = login;
