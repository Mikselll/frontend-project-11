const getFeeds = (document) => {
  const title = document.querySelector('title').textContent;
  const description = document.querySelector('description').textContent;
  return { title, description };
};

const getPosts = (document) => {
  const items = document.querySelectorAll('item');

  const posts = Array.from(items).map((item) => {
    const post = {
      title: item.querySelector('title').textContent,
      link: item.querySelector('link').textContent,
      description: item.querySelector('description').textContent,
    };
    return post;
  });
  return posts;
};

const parsing = (responce) => {
  const parser = new DOMParser();
  const parsedDocument = parser.parseFromString(responce.data.contents, 'text/xml');
  const error = parsedDocument.querySelector('parsererror');
  if (error) {
    const err = new Error();
    err.isParsingError = true;
    throw err;
  }
  return {
    feed: getFeeds(parsedDocument),
    posts: getPosts(parsedDocument),
  };
};

export default parsing;
