let isLocked = false

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
  const extension = window.location.host.split('.').pop() || 'com';
  return `https://www.google.${extension}/maps/search/${address}`;
}

const selector = "#lu_map";
const selector1 = "img[src^='/maps/vt/']";
const selector2 = "[jsname='tRarif'][jsaction='click:ivJHQ']";
const selector3 = "[jsname='Fus96e'][jsaction='NbD2ab']";

function imgToButton(elm) {
  if (isLocked) return;
  isLocked = true;
  elm.classList.add('dynamic-map-img-link');
  if (elm instanceof HTMLImageElement) {
    // clean/new way to transform img to link
    const imgEl = elm;
    const aElement = document.createElement('a');
    aElement.href = getAddressURL();
    aElement.innerHTML = imgEl.parentElement.innerHTML;

    imgEl.replaceWith(aElement);
  } else if (elm.closest("a")) {
    elm.closest("a").href = getAddressURL();
  } else {
    const imgEl = elm.querySelector('#pimg_1');
    const aElement = document.createElement('a');
    aElement.href = getAddressURL();
    aElement.innerHTML = imgEl.parentElement.innerHTML;

    imgEl.replaceWith(aElement);
  }
}

waitForElm(selector).then(imgToButton);
waitForElm(selector1).then(imgToButton);

function addGoogleMapButton(elm) {
  if (isLocked) return;
  isLocked = true;
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
}

waitForElm(selector2).then(addGoogleMapButton);
waitForElm(selector3).then(addGoogleMapButton);
