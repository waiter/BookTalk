import md5 from 'md5';

function makeCK(data, token, salt) {
  const keys = Object.keys(data || {});
  keys.sort();
  let v = salt;
  keys.forEach(key => v += `${key}&&${data[key]}`);
  v += token;
  v = md5(v);
  const arr = v.split('');
  const saltArr = salt.split('');
  arr[3] = saltArr[0];
  arr[19] = saltArr[1];
  arr[12] = saltArr[2];
  arr[23] = saltArr[3];
  return arr.join('');
}

const net = {
  salt: '8uz6',
  token: '',
  fetchGet: function(url, data) {
    const ck = makeCK(data, net.token, net.salt);
    fetch(url, {
      ...data,
      ck,
    })
    .then(res => res.json())
    .then(json => console.log(json));
  },
  fetchPost: function(url, data) {
    const ck = makeCK(data, net.token, net.salt);
    console.log(ck);
    fetch(`${url}?ck=${ck}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => console.log(json));
  },
  postWithoutToken: async function(url, data) {
    const ck = makeCK(data, '', net.salt);
    const response = await fetch(`${url}?ck=${ck}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    console.log(response);
    const re = await response.json();
    console.log(re);
    return re;
  }
}

export default net;
