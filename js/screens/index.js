import axios from 'axios';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
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
            <td class="min-w-[250px] p-4 md:w-[25vw]">
              <span class="self-center">${broadcast?.name || ''}</span>
            </td>
            <td class="min-w-[250px] p-4 md:w-[25vw]">
              <span class="self-center">${
                broadcast?.airingTime
                  ? moment(broadcast?.airingTime).format('DD/MM/YYYY, hh:mmA')
                  : ''
              }</span>
            </td>
            <td class="min-w-[150px] p-4 md:w-[25vw] capitalize">
              <span class="self-center capitalize">${
                broadcast?.category?.name || ''
              }</span>
            </td>
            <td class="min-w-[150px] p-4 md:w-[25vw] text-center">
              <a href="${
                broadcast?.link
              }" target="_blank" class="self-center w-full"><i class="material-icons">visibility</i></a>
            </td>
            <td class="min-w-[150px] p-4 md:w-[25vw]">
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

const getCategories = () => {
  axios
    .get(`${backendURL}/category`)
    .then(({ data }) => {
      return (document.querySelector('#categoryFilter').innerHTML = `
      <option value="">All</option>
        ${data.categories
          .map(
            (category) => `
              <option value="${category._id}">${category.name}</option>
        `
          )
          .join('')}
      `);
    })
    .catch((error) => {
      console.log(error);
      console.log(error?.response?.data);
    });
};

const filterBroadcasts = () => {
  const categoryId = document.querySelector('#categoryFilter').value;
  const viewingList = document.querySelector('#viewingListFilter').value;

  axios
    .get(`${backendURL}/broadcast?categoryId=${categoryId}`)
    .then(({ data }) => {
      if (viewingList === 'viewing') {
        renderTableBody({
          broadcasts: data.broadcasts.filter((item) =>
            user.broadcasts.includes(item._id)
          ),
        });
      } else if (viewingList === 'not-viewing') {
        renderTableBody({
          broadcasts: data.broadcasts.filter(
            (item) => !user.broadcasts.includes(item._id)
          ),
        });
      } else {
        renderTableBody(data);
      }
    })
    .catch((error) => {
      console.log(error);
      console.log(error?.response?.data);
    });
};

getCategories();
getBroadCasts();
window.addGame = addGame;
window.removeGame = removeGame;
window.filterBroadcasts = filterBroadcasts;
