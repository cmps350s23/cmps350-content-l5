import { api } from "./API-services.js";

const loginForm = document.querySelector("#loginForm");
loginForm.addEventListener("submit", login);

async function login(e) {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const user = await api.getUserByEmail(email);
  if (!user) {
    //user not found
    setErrorMessage("&#x26A0; No user with that email exists");
    return;
  }
  if (user.password !== password) {
    //incorrect password
    setErrorMessage("&#x26A0; Incorrect password");
    return;
  } else {
    //successful login
    api.setLoggedInUser(email);
    //redirect to appropriate page
    switch (user.role) {
      case "author":
        window.location.href = "/submit-paper.html";
        break;
      case "reviewer":
        window.location.href = "/review-paper.html";
        break;
      case "organizer":
        window.location.href = "/schedule-editor.html";
        break;

      default:
        setErrorMessage("&#x26A0; User role not recognized");
        break;
    }
  }
}

function setErrorMessage(message) {
  const errorMessage = document.querySelector("#error");
  toggleErrorMessage();
  errorMessage.innerHTML = message;
}

function toggleErrorMessage() {
  const errorMessage = document.querySelector("#error");
  errorMessage.classList.toggle("hidden");
}
