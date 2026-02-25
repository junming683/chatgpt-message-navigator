import { injectNavigationButtons } from "./inject-navigation-buttons";
import "./styles.css"

const runInjection = () => {
  injectNavigationButtons();
};

runInjection();

const observer = new MutationObserver(runInjection);

const startObserving = () => {
  const main = document.querySelector("main");
  if (!main) {
    window.setTimeout(startObserving, 250);
    return;
  }

  observer.observe(main, {
    childList: true,
    subtree: true,
  });
};

startObserving();
