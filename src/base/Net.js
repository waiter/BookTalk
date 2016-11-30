import FetchUtil from './fetch';

const baseUrl = 'http://localhost:8080/index.php/booktalk';
const searchUrl = 'https://api.douban.com/v2/book/search';

function makeData(res, success) {
  if (res.state == 1) {
    if (success) {
      success();
    }
    return res.msg;
  } else {
    throw res.msg;
  }
}

const net = {
  userId: -1,
  register: async function(data) {
    const re = await FetchUtil.postWithoutToken(`${baseUrl}/register`, data);
    return makeData(re);
  },
  login: async function(data) {
    const re = await FetchUtil.postWithoutToken(`${baseUrl}/login`, data);
    return makeData(re, () => {
      FetchUtil.token = re.msg.token;
      net.userId = re.msg.id;
    });
  },
  searchBook: async function(title) {
    if (title && title.length > 0) {
      const sea = await fetch(`${searchUrl}?q=${title}&count=10`).then(res => res.json());
      if (sea) {
        if (sea.total >= 0) {
          return sea.books.map(book => {
            const images = book.images || {};
            return {
              title: book.title,
              author: book.author.join('，'),
              isbn: book.isbn13,
              image: images.large || book.image
            };
          });
        } else {
          throw '休息一会吧，搜书失败了';
        }
      }
    } else {
      throw '想好要搜什么，再搜';
    }
  },
  throwBook: async function(book, word) {
    
  }
};

export default net;
