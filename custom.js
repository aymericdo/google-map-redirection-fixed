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
  
  const search = document.querySelector("#APjFqb")?.textContent
  const address = search.split(' ').join('+');
  const newUrl = `https://www.google.fr/maps/search/${address}`

  if (elm.closest("a")) {
    elm.closest("a").href = newUrl
  } else {
    const imgEl = elm.querySelector('#pimg_1');
    const aElement = document.createElement('a');
    aElement.href = newUrl;
    aElement.innerHTML = imgEl.parentElement.innerHTML;

    imgEl.replaceWith(aElement);
  }
});

