import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { backendURL } from '../utils/constants';

let user = jwtDecode(localStorage.getItem('token'));

const addGame = (id) => {
  axios
    .put(
      `${backendURL}/user/broadcast/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
    .then(({ data }) => {
      user = jwtDecode(data.token);
      localStorage.setItem('token', data.token);
      getBroadCasts();
    })
    .catch((error) => {
      console.log(error);
      console.log(error?.response?.data);
    });
};

const removeGame = (id) => {
  axios
    .delete(`${backendURL}/user/broadcast/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(({ data }) => {
      user = jwtDecode(data.token);
      localStorage.setItem('token', data.token);
      getBroadCasts();
    })
    .catch((error) => {
      console.log(error?.response?.data);
    });
};

const renderTableBody = (data) => {
  document.querySelector('#tbody').innerHTML = `
        ${data.broadcasts
          .map(
            (broadcast) => `
          <tr>
            <td class="flex w-[50vw] p-4 md:w-[60vw] lg:w-[70vw]">
              <span class="self-center">${broadcast?.name || ''}</span>
            </td>
            <td class="px-4 py-1">
              <div class="flex w-full justify-center">
                ${
                  user?.broadcasts && user.broadcasts.includes(broadcast._id)
                    ? `
                  <button
                    type="button"
                    onclick="removeGame('${broadcast._id}')"
                    class="flex items-center justify-center rounded-md bg-red-500 p-2 text-xs text-white md:text-sm"
                  >
                    Remove Game
                  </button>
                `
                    : `
                  <button
                    type="button"
                    onclick="addGame('${broadcast._id}')"
                    class="flex items-center justify-center rounded-md bg-green-500 p-2 text-xs text-white md:text-sm"
                  >
                    Add Game
                  </button>  
                  `
                }
              </div>
            </td>
          </tr>
        `
          )
          .join(' ')}
      `;
};

const getBroadCasts = () => {
  axios
    .get(`${backendURL}/broadcast`)
    .then(({ data }) => {
      renderTableBody(data);
    })
    .catch((error) => {
      console.log(error);
      console.log(error?.response?.data);
    });
};

getBroadCasts();
window.addGame = addGame;
window.removeGame = removeGame;
