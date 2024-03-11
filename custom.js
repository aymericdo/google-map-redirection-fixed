function waitForElm(selector) {
  return new Promise(resolve => {
      if (document.querySelector(selector)) {
          return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver(mutations => {
          if (document.querySelector(selector)) {
              resolve(document.querySelector(selector));
              observer.disconnect();
          }
      });

      observer.observe(document.body, {
          childList: true,
          subtree: true
      });
  });
}

const selector = "#lu_map"

waitForElm(selector).then((elm) => {
  elm.style.cursor = 'pointer';

  const search = elm.title.split(': carte')[0];
  const address = search.split(' ').join('+');
  const newUrl = `https://www.google.fr/maps/search/${address}`

  if (elm) {
    elm.closest("a").href = newUrl
  }
});

