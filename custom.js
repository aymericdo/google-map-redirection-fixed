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

function getAddressURL() {
  const search = document.querySelector("#APjFqb")?.textContent;
  const address = search.split(' ').join('+');
  return `https://www.google.fr/maps/search/${address}`;
}

const selector = "#lu_map";
const selector2 = "[jsname='tRarif'][jsaction='click:ivJHQ']";


waitForElm(selector).then((elm) => {
  elm.style.cursor = 'pointer';
  
  if (elm.closest("a")) {
    elm.closest("a").href = getAddressURL();
  } else {
    const imgEl = elm.querySelector('#pimg_1');
    const aElement = document.createElement('a');
    aElement.href = getAddressURL();
    aElement.innerHTML = imgEl.parentElement.innerHTML;

    imgEl.replaceWith(aElement);
  }
});

waitForElm(selector2).then((elm) => {
  const aElement = document.createElement('a');

  aElement.classList.add('new-open-maps-btn');
  aElement.href = getAddressURL();
  aElement.innerHTML = 'Open in Maps';

  elm.parentElement.appendChild(aElement);
});

