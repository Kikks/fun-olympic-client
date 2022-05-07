import moment from 'moment';

document.querySelector('#date').innerHTML = moment().format('ddd, DD MMM YYYY');
document.querySelector('#time').innerHTML = moment().format('hh:mm A');
