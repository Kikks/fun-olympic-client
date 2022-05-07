import axios from 'axios';
import { backendURL } from '../../utils/constants';

const openModal = (broadcastId) => {
  document.querySelector('#modal').className =
    'fixed top-0 left-0 flex h-screen w-screen items-center justify-center bg-black/20';
};

const closeModal = () => {
  document.querySelector('#modal').className = 'hidden';
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
                <td class="flex w-[50vw] p-4 md:w-[60vw] lg:w-[70vw]">
                  <span class="self-center">${broadcast.name}</span>
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

const addBroadcast = () => {
  document.querySelector('#add').disabled = true;
  axios
    .post(
      `${backendURL}/broadcast`,
      {
        name: document.querySelector('#broadcast').value,
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

getBroadcasts();

window.closeModal = closeModal;
window.openModal = openModal;
window.deleteBroadcast = deleteBroadcast;
window.addBroadcast = addBroadcast;
