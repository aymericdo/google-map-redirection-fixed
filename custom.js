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

function getSearchQuery() {
  // The URL and the form field name are part of Google's public search
  // contract, unlike generated ids/classes such as #APjFqb.
  const urlQuery = new URLSearchParams(window.location.search).get('q');
  if (urlQuery?.trim()) {
    return urlQuery.trim();
  }

  const queryField = document.querySelector(
    'form[action="/search"] [name="q"], input[name="q"], textarea[name="q"]'
  );
  if (queryField instanceof HTMLInputElement || queryField instanceof HTMLTextAreaElement) {
    if (queryField.value.trim()) {
      return queryField.value.trim();
    }
  }

  const visibleSearchField = document.querySelector(
    'textarea[role="combobox"], input[role="combobox"], textarea[aria-label*="Search" i], input[aria-label*="Search" i]'
  );
  if (visibleSearchField instanceof HTMLInputElement || visibleSearchField instanceof HTMLTextAreaElement) {
    return visibleSearchField.value.trim();
  }

  return '';
}

function getAddressURL() {
  const address = encodeURIComponent(getSearchQuery());
  const googleHost = window.location.hostname.startsWith('www.google.')
    ? window.location.hostname
    : 'www.google.com';
  return `https://${googleHost}/maps/search/${address}`;
}

const mapSelector = '#lu_map, img[src*="/maps/vt/"]';

const selector21 = "[jsname='tRarif'][jsaction='click:ivJHQ']";
const selector22 = "[jsname='Fus96e'][jsaction='NbD2ab']";

function imgToButton(elm) {
  const mapElement = elm instanceof HTMLImageElement
    ? elm
    : elm.querySelector('img[src*="/maps/vt/"]') || elm;
  const visualElement = mapElement.closest('#lu_map') || elm;

  visualElement.classList.add('dynamic-map-img-link');
  if (visualElement !== mapElement) {
    mapElement.classList.remove('dynamic-map-img-link');
  }

  let link = mapElement.closest('a');
  if (!link) {
    link = document.createElement('a');
    mapElement.replaceWith(link);
    link.appendChild(mapElement);
  }

  link.href = getAddressURL();

  // Google can update the query without reloading the results page.
  if (!link.dataset.mapsRedirectionBound) {
    link.dataset.mapsRedirectionBound = 'true';
    link.addEventListener('click', () => {
      link.href = getAddressURL();
    }, true);
  }
}

function updateMapLinks(root = document) {
  if (root instanceof Element && root.matches(mapSelector)) {
    imgToButton(root);
  }
  root.querySelectorAll?.(mapSelector).forEach(imgToButton);
}

updateMapLinks();

const mapObserver = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      if (node instanceof Element) {
        updateMapLinks(node);
      }
    });
  });
});

mapObserver.observe(document.body, {
  childList: true,
  subtree: true
});

function addGoogleMapButton(elm) {
  const container = elm.parentElement;
  if (!container || container.querySelector(':scope > .new-open-maps-btn')) {
    return;
  }

  const aElement = document.createElement('a');

  const button = `
    <span>Maps</span>
    <span class="UH8bI z1asCe" style="height:20px;line-height:20px;width:20px">
      <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></svg>
    </span>`;
  aElement.classList.add('new-open-maps-btn');
  aElement.href = getAddressURL();
  aElement.innerHTML = button;

  aElement.addEventListener('click', () => {
    aElement.href = getAddressURL();
  });

  container.appendChild(aElement);
}

waitForElm(selector21).then(addGoogleMapButton);
waitForElm(selector22).then(addGoogleMapButton);
