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
      console.log(data);
      document.querySelector('#no-of-users').innerHTML =
        data?.loginStat?.numberOfLogins || 0;
    })
    .catch((error) => {
      console.log(error);
      console.log(error?.response?.data);
    });
};

getLoginStats();
