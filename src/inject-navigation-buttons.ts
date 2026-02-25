import { scrollObserver } from "./scroll-observer";
import { createBtn } from "./createBtn";
import { hasChatStateChanged } from "./hasChatStateChanged";

export function injectNavigationButtons() {
  const chatArray = document.querySelectorAll<HTMLElement>("article[data-turn-id]");
  if (chatArray.length === 0) return;

  const firstArticle = chatArray[0];
  const msgContainer =
    firstArticle.closest("[role='presentation']")?.firstElementChild ||
    firstArticle.parentElement;
  if (!msgContainer) return;

  let btnContainer = msgContainer.querySelector("#navigate-btn-container");
  if (!btnContainer) {
    btnContainer = document.createElement("div");
    btnContainer.id = "navigate-btn-container";
    msgContainer.append(btnContainer);
  }

  const existingButtons = btnContainer.querySelectorAll("button");

  // rerender if state changed...
  if (!hasChatStateChanged(existingButtons, chatArray)) return;

  btnContainer.innerHTML = "";

  chatArray.forEach((chat) => {
    scrollObserver.observe(chat);
    const btn = createBtn(chat)
    btnContainer.appendChild(btn);
  });
}
