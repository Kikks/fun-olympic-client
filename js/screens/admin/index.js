import axios from 'axios';
import moment from 'moment';
import { backendURL } from '../../utils/constants';

const getLoginStats = () => {
  axios
    .get(`${backendURL}/admin/login-stats/${moment().format('DD-MM-YYYY')}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(({ data }) => {
      document.querySelector('#no-of-logins').innerHTML =
        data?.loginStat?.numberOfLogins || 0;
    })
    .catch((error) => {
      console.log(error);
      console.log(error?.response?.data);
    });
};

const countUsers = () => {
  axios
    .get(`${backendURL}/user/count`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(({ data }) => {
      document.querySelector('#no-of-users').innerHTML = data?.count || 0;
    })
    .catch((error) => {
      console.log(error);
      console.log(error?.response?.data);
    });
};

const countBroadcasts = () => {
  axios
    .get(`${backendURL}/broadcast/count`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(({ data }) => {
      document.querySelector('#no-of-broadcasts').innerHTML = data?.count || 0;
    })
    .catch((error) => {
      console.log(error);
      console.log(error?.response?.data);
    });
};

const countCategoris = () => {
  axios
    .get(`${backendURL}/category/count`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(({ data }) => {
      document.querySelector('#no-of-categories').innerHTML = data?.count || 0;
    })
    .catch((error) => {
      console.log(error);
      console.log(error?.response?.data);
    });
};

getLoginStats();
countUsers();
countBroadcasts();
countCategoris();
