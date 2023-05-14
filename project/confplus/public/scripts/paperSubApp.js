import { api } from "./API-services.js";

let paperForm = document.querySelector("#submitPaperForm");
let authorsList = document.querySelector("#authorsList");
let fileInput = document.querySelector("#paperPDF");

paperForm.addEventListener("submit", submitPaper);

window.addAuthorFormFields = addAuthorFormFields;
window.removeAuthorFormFields = removeAuthorFormFields;

function addAuthorFormFields() {
  authorsList.innerHTML += `<div class="authorCard card">
  <div>
      <label for="firstName">First name:</label>
      <input type="text" placeholder="Enter the author's first name" id="firstName" name="firstName" class="textinput" required>
  </div>
  <div>
      <label for="lanme">Last name:</label>
      <input type="text" placeholder="Enter the author's last name" id="lastName" name="lastName" class="textinput" required>
      
  </div>
  <div>
      <label for="authoremail">E-mail:</label>
      <input type="email" placeholder="Enter the author's email" id="authoremail" name="authoremail" class="textinput" required>
      
  </div>
  <div>
      <label for="affiliation">Affiliation</label>
      <input type="text" placeholder="Enter organization's name" id="affiliation" name="affiliation" class="textinput" required>
      
  </div>
</div>`;
}

function removeAuthorFormFields() {
  if (authorsList.childElementCount > 1)
    authorsList.removeChild(authorsList.lastChild);
}

async function submitPaper(e) {
  // alert("Trying to submit paper");
  e.preventDefault();
  // alert("is this working");
  const authorsfirstNames = document.querySelectorAll(
    "input[name='firstName']"
  );
  const authorslastNames = document.querySelectorAll("input[name='lastName']");
  const authorsEmails = document.querySelectorAll("input[name='authoremail']");
  const authorsAffiliations = document.querySelectorAll(
    "input[name='affiliation']"
  );
  const authors = [];
  for (let i = 0; i < authorsfirstNames.length; i++) {
    authors.push({
      firstName: authorsfirstNames[i].value,
      lastName: authorslastNames[i].value,
      email: authorsEmails[i].value,
      affiliation: authorsAffiliations[i].value,
    });
  }
  const paperURL = await uploadPDF();
  const paper = {
    title: document.querySelector("#title").value,
    abstract: document.querySelector("#abstract").value,
    authors: authors,
    paperURL: paperURL,
  };

  await api.addPaper(paper);
  alert("Paper submitted successfully!");
}

async function uploadPDF() {
  const formData = new FormData(paperForm);
  //const formData = new FormData()
  formData.append("file", fileInput.files[0]);

  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log("Upload successful");
      const data = await response.json();
      fileInput.value = "";
      return data.paperURL;
    } else {
      throw new Error("Upload failed");
    }
  } catch (error) {
    console.error(error);
  }
}
