export const generateLink = (link) => {
  const splitLink = link.split('watch?v=');

  if (splitLink[0] === 'https://www.youtube.com/') {
    return `https://www.youtube.com/embed/${splitLink[1]}`;
  } else {
    return link;
  }
};
