import jwtDecode from 'jwt-decode';

const token = localStorage.getItem('token');

if (!token) {
  window.location.href = '/admin/login/';
}

const decodedToken = jwtDecode(token);

if (!decodedToken?.exp) {
  window.location.href = '/admin/login/';
}

if (decodedToken.exp * 1000 < Date.now()) {
  localStorage.removeItem('token');
  window.location.href = '/admin/login/';
}

if (!decodedToken?.admin) {
  window.location.href = '/';
}
