import axios from 'axios';
import { backendURL } from '../../utils/constants';
import moment from 'moment';

let categories = [];

const openModal = (broadcastId) => {
  document.querySelector('#modal').className =
    'fixed top-0 left-0 flex h-screen w-screen items-center justify-center bg-black/20';
};

const closeModal = () => {
  document.querySelector('#modal').className = 'hidden';
  document.querySelector('#new-category-container').classList.remove('block');
  document.querySelector('#new-category-container').classList.add('hidden');

  document.querySelector('#category').value = categories[0]
    ? categories[0]._id
    : '';
};

const deleteBroadcast = (id) => {
  axios
    .delete(`${backendURL}/broadcast/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(() => {
      getBroadcasts();
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
                <td class="min-w-[250px] w-[50vw] p-4">
                  <span class="self-center">${broadcast?.name || ''}</span>
                </td>
                <td class="w-[20vw] p-4">
                  <span class="self-center capitalize">${
                    broadcast?.category?.name || ''
                  }</span>
                </td>
                <td class="w-[20vw] p-4">
                  <span class="self-center">${
                    broadcast?.airingTime
                      ? moment(broadcast?.airingTime).format(
                          'DD/MM/YYYY, hh:mmA'
                        )
                      : ''
                  }</span>
                </td>
                <td class="px-4 py-1">
                  <div class="flex w-full justify-center">
                    <button
                      onclick="deleteBroadcast('${broadcast._id}')"
                      type="button"
                      class="flex items-center justify-center rounded-md bg-red-500 p-2 text-xs text-white md:text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
        `
          )
          .join(' ')}
      `;
};

const getBroadcasts = () => {
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

const addBroadcast = (categoryId) => {
  axios
    .post(
      `${backendURL}/broadcast`,
      {
        name: document.querySelector('#broadcast').value,
        categoryId,
        airingTime: document.querySelector('#airing-time').value,
        link: document.querySelector('#link').value,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
    .then(() => {
      document.querySelector('#add').disabled = false;
      document.querySelector('#broadcast').value = '';
      document.querySelector('#errors').innerHTML = '';
      getBroadcasts();
      closeModal();
    })
    .catch((error) => {
      document.querySelector('#add').disabled = false;

      if (error?.response?.data) {
        document.querySelector('#errors').innerHTML = `
          <div
            class="mt-10 flex w-full flex-col gap-5 rounded-md bg-red-200 p-5 lg:p-10"
          >
            <h3 class="text-xl text-red-500">Errors</h3>

            <ul class="ml-5 list-disc">
              ${Object.values(error.response.data)
                .map(
                  (error) => `
                <li>${error}</li>
              `
                )
                .join(' ')}
            </ul>
          </div>
        `;
      }
    });
};

const createCategory = (value) => {
  axios
    .post(
      `${backendURL}/category`,
      {
        name: value,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
    .then(({ data }) => {
      addBroadcast(data?.category?._id || '');
    })
    .catch((error) => {
      if (error?.response?.data) {
        document.querySelector('#errors').innerHTML = `
          <div
            class="mt-10 flex w-full flex-col gap-5 rounded-md bg-red-200 p-5 lg:p-10"
          >
            <h3 class="text-xl text-red-500">Errors</h3>

            <ul class="ml-5 list-disc">
              ${Object.values(error.response.data)
                .map(
                  (error_1) => `
                <li>${error_1}</li>
              `
                )
                .join(' ')}
            </ul>
          </div>
        `;
      }
    });
};

const handleSubmit = async () => {
  document.querySelector('#add').disabled = true;

  if (document.querySelector('#category').value === 'other') {
    createCategory(document.querySelector('#new-category').value);
  } else {
    addBroadcast(document.querySelector('#category').value);
  }
};

const getCategories = () => {
  axios
    .get(`${backendURL}/category`)
    .then(({ data }) => {
      categories = data.categories || [];
      return (document.querySelector('#category').innerHTML = `
        ${data.categories
          .map(
            (category) => `
              <option value="${category._id}">${category.name}</option>
        `
          )
          .join('')}
            <option value="other">Other</option>
          `);
    })
    .catch((error) => {
      console.log(error);
      console.log(error?.response?.data);
    });
};

const checkCategory = () => {
  if (document.querySelector('#category').value === 'other') {
    document
      .querySelector('#new-category-container')
      .classList.remove('hidden');
    document.querySelector('#new-category-container').classList.add('block');
  } else {
    document.querySelector('#new-category-container').classList.remove('block');
    document.querySelector('#new-category-container').classList.add('hidden');
  }
};

getBroadcasts();
getCategories();

window.closeModal = closeModal;
window.openModal = openModal;
window.deleteBroadcast = deleteBroadcast;
window.handleSubmit = handleSubmit;
window.checkCategory = checkCategory;
