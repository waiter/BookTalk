import FetchUtil from './fetch';

const baseUrl = 'http://localhost:8080/index.php/booktalk'

const net = {
  register: function(data) {
    return FetchUtil.postWithoutToken(`${baseUrl}/register`, data);
  },
  login: function(data) {
    return FetchUtil.postWithoutToken(`${baseUrl}/login`, data);
  }
};

export default net;
