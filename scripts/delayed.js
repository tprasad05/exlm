// eslint-disable-next-line import/no-cycle
import { loadCSS, sampleRUM } from './lib-franklin.js';
// eslint-disable-next-line import/no-cycle
import loadGainsight from './gainsight/gainsight.js';
import loadQualtrics from './qualtrics.js';
// add more delayed functionality here

// Core Web Vitals RUM collection
sampleRUM('cwv');

/**
 * Loads prism for syntax highlighting
 * @param {Document} document
 */
function loadPrism(document) {
  const highlightable = document.querySelector(
    'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
  );
  if (!highlightable) return; // exit, no need to load prism if nothing to highlight

  // see: https://prismjs.com/docs/Prism.html#.manual
  window.Prism = window.Prism || {};
  window.Prism.manual = true;
  import('./prism.js')
    .then(() => {
      // see: https://prismjs.com/plugins/autoloader/
      window.Prism.plugins.autoloader.languages_path = '/scripts/prism-grammars/';
      // run prism in async mode; uses webworker.
      window.Prism.highlightAll(true);
    })
    // eslint-disable-next-line no-console
    .catch((err) => console.error(err));
}

loadCSS(`${window.hlx.codeBasePath}/styles/print/print.css`);

loadPrism(document);
loadGainsight();
loadQualtrics();
