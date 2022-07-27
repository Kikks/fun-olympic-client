import axios from 'axios';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import { backendURL } from '../utils/constants';
import { generateLink } from '../utils/generateLink';

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

const renderBroadcastList = (data) => {
  document.querySelector('#broadcast-list').innerHTML = `
        ${data.broadcasts
          .map(
            (broadcast) => `
              <div
                class="flex flex-col gap-2 overflow-hidden rounded-lg bg-white shadow-md"
              >
                <div class="aspect-video w-full">
                  ${
                    moment().isBefore(moment(broadcast?.airingTime))
                      ? `
                        <div class="w-full h-full text-white bg-gray-700 flex items-center justify-center text-center flex-col">
                          <h3 class="text-2xl">Broadast not yet live.</h3>
                          <span class="text-sm">This broadcast will be live in ${moment(
                            broadcast?.airingTime
                          ).fromNow()}</span>
                        </div>
                      `
                      : `
                        <iframe
                        width="100%"
                        height="100%"
                        src="${generateLink(broadcast?.link)}"
                      >
                      </iframe>
                  `
                  }
                  
                </div>

                <div class="flex flex-col p-5 pt-2">
                  <h2 class="text-lg font-bold lg:text-xl">
                    ${broadcast?.name}
                  </h2>
                  <span class="text-sm text-gray-400">
                    ${moment(broadcast?.airingTime).format('DD, MMMM, YYYY')}
                  </span>
                </div>
              </div>
        `
          )
          .join(' ')}
      `;
};

const getBroadCasts = () => {
  axios
    .get(`${backendURL}/broadcast`)
    .then(({ data }) => {
      renderBroadcastList(data);
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
      return (document.querySelector('#categories').innerHTML = `
        <div class="flex cursor-pointer items-center gap-2" onclick="filterBroadcasts('')">
          <img src="./assets/all-sports.png" class="h-7 w-7" />

          <span class="text-sm">All sports</span>
        </div>

        ${data.categories
          .map(
            (category) => `
            <div class="flex cursor-pointer items-center gap-2" onclick="filterBroadcasts('${category?._id}')">
              <figure class="flex justify-center h-7 w-7">
                <img src="${category.image}" class="h-7 w-auto" />
              </figure>

              <span class="text-sm">${category.name}</span>
            </div>
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

const filterBroadcasts = (categoryId) => {
  axios
    .get(`${backendURL}/broadcast?categoryId=${categoryId}`)
    .then(({ data }) => {
      renderBroadcastList(data);
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
