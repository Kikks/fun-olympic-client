import jwtDecode from 'jwt-decode';

const token = localStorage.getItem('token');

if (!token) {
  window.location.href = '/login.html';
}

const decodedToken = jwtDecode(token);

if (!decodedToken?.exp) {
  window.location.href = '/login.html';
}

if (decodedToken.exp * 1000 < Date.now()) {
  localStorage.removeItem('token');
  window.location.href = '/login.html';
}

if (decodedToken?.admin) {
  window.location.href = '/admin/index.html';
}
