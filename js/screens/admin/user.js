import axios from 'axios';
import moment from 'moment';
import { backendURL } from '../../utils/constants';

let user = null;

const setUser = (userId) => {
  user = userId;
  document.querySelector('#modal').className =
    'fixed top-0 left-0 flex h-screen w-screen items-center justify-center bg-black/20';
};

const closeModal = () => {
  user = null;
  document.querySelector('#modal').className = 'hidden';
};

const deleteUser = (id) => {
  axios
    .delete(`${backendURL}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(() => {
      getUsers();
    })
    .catch((error) => {
      console.log(error?.response?.data);
    });
};

const renderTableBody = (data) => {
  document.querySelector('#tbody').innerHTML = `
        ${data.users
          .map(
            (user) => `
            <tr>
              <td class="w-[20vw] min-w-[200px] p-4 md:w-[25vw]">
                ${user.firstName || ''} ${user.lastName || ''}
              </td>
               <td class="w-[20vw] min-w-[200px] p-4 md:w-[25vw]">
                ${user.email || ''}
              </td>
              <td class="w-[20vw] min-w-[170px] p-4 md:w-[25vw]">
                ${
                  user?.lastLogin
                    ? moment(user?.lastLogin).format('DD-MM-YYYY, hh:mmA')
                    : '-'
                }
              </td>
              <td class="w-[20vw] min-w-[170px] p-4 md:w-[25vw]">
                ${
                  user?.lastLogout
                    ? moment(user?.lastLogout).format('DD-MM-YYYY, hh:mmA')
                    : '-'
                }
              </td>
              <td class="px-4 py-1">
                <div class="flex w-full justify-center gap-2 min-w-[250px]">
                  <button
                    onclick="setUser('${user._id}')"
                    type="button"
                    class="flex items-center justify-center rounded-md bg-indigo-600 p-2 text-xs text-white md:text-sm"
                  >
                    Reset Password
                  </button>

                  <button
                    onclick="deleteUser('${user._id}')"
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

const getUsers = () => {
  axios
    .get(`${backendURL}/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(({ data }) => {
      renderTableBody(data);
    })
    .catch((error) => {
      console.log(error);
      console.log(error?.response?.data);
    });
};

const resetPassword = () => {
  document.querySelector('#reset').disabled = true;
  axios
    .patch(
      `${backendURL}/user/${user}`,
      {
        password: document.querySelector('#password').value,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
    .then(() => {
      document.querySelector('#reset').disabled = false;
      document.querySelector('#password').value = '';
      document.querySelector('#errors').innerHTML = '';
      closeModal();
    })
    .catch((error) => {
      document.querySelector('#reset').disabled = false;

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

getUsers();
window.setUser = setUser;
window.closeModal = closeModal;
window.deleteUser = deleteUser;
window.resetPassword = resetPassword;
