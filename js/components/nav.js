import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { backendURL } from '../utils/constants';

const user = jwtDecode(localStorage.getItem('token'));

let menuOpen = false;

const toggleMenu = () => {
  menuOpen = !menuOpen;

  if (menuOpen) {
    document.querySelector('#mobile-menu').className = 'block md:hidden';
    document.querySelector('#menu-icon').innerHTML = `
      <svg
          class="block h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
  `;
  } else {
    document.querySelector('#mobile-menu').className = 'hidden md:hidden';
    document.querySelector('#menu-icon').innerHTML = `
      <svg
          class="block h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
  `;
  }
};

const logout = (role) => {
  if (role === 'admin') {
    window.location.href = '/admin/login.html';
    localStorage.removeItem('token');
  } else {
    axios
      .post(
        `${backendURL}/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then(() => {
        localStorage.removeItem('token');

        window.location.href = '/login.html';
      })
      .catch((error) => {
        console.log(error?.response?.data);
      });
  }
};

window.logout = logout;
window.toggleMenu = toggleMenu;
