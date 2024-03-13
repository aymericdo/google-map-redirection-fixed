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

  const button = `
    <span>Maps</span>
    <span class="UH8bI z1asCe" style="height:20px;line-height:20px;width:20px">
      <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></svg>
    </span>`;
  aElement.classList.add('new-open-maps-btn');
  aElement.href = getAddressURL();
  aElement.innerHTML = button;

  elm.parentElement.appendChild(aElement);
});

