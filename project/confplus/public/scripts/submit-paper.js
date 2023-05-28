async function submitPaper() {
  window.event.preventDefault()
  if (!isPresenterSelected()) {
    alert("Please select a presenter")
    return
  }
  const form = document.forms[0]
  const authorFirstNames = form.querySelectorAll("input[name='firstName']")
  const authorLastNames = form.querySelectorAll("input[name='lastName']")
  const authorsEmails = form.querySelectorAll("input[name='email']")
  const authorsAffiliations = form.querySelectorAll("input[name='affiliation']")
  const authorsIsPresenter = form.querySelectorAll("input[name='isPresenter']")
  const authors = []
  authorFirstNames.forEach((authorFirstName, idx) => {
    authors.push({
      firstName: authorFirstName.value,
      lastName: authorLastNames[idx].value,
      email: authorsEmails[idx].value,
      affiliation: authorsAffiliations[idx].value,
      isPresenter: authorsIsPresenter[idx].checked,
    })
  })

  const paperURL = await uploadPDF()
  const paper = {
    title: document.querySelector("#title").value,
    abstract: document.querySelector("#abstract").value,
    authors: authors,
    paperURL: paperURL,
  }

  const newPaper = await addPaper(paper)
  alert(`Paper submitted successfully!. Your paper Id is ${newPaper.id}`)
  window.location.href = "/index.html"
}

async function addPaper(paper) {
  const response = await fetch("api/papers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paper),
  })
  return response.json()
}

async function uploadPDF() {
  //const paperForm = document.querySelector("#submitPaperForm")
  const fileInput = document.querySelector("#paperPDF")

  //const formData = new FormData(paperForm)
  const formData = new FormData()
  formData.append("file", fileInput.files[0])

  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    if (response.ok) {
      console.log("Upload successful")
      const data = await response.json()
      fileInput.value = ""
      return data.paperURL
    } else {
      throw new Error("Upload failed")
    }
  } catch (error) {
    console.error(error)
  }
}

function onAddAuthor() {
  const template = `<div class="authorCard card">
    <div>
      <label>
        First name:
        <input type="text" name="firstName" required />
      </label>
    </div>
    <div>
      <label
        >Last name:
        <input type="text" name="lastName" required />
      </label>
    </div>
    <div>
      <label
        >E-mail:
        <input type="email" name="email" required />
      </label>
    </div>
    <div>
      <label
        >Affiliation
        <input type="text" name="affiliation" required />
      </label>
    </div>
    <div>
    <label>
      <input type="checkbox" name="isPresenter" onChange="onIsPresenterChange()" />
      Presenting Author
      </label>
    </div>
    <button type="button" class="button" onclick="onRemoveAuthor()">
      -
    </button>
  </div>
  </div>`

  const authorsList = document.querySelector("#authorsList")
  const div = document.createElement("div")
  div.classList.add("authorCard")
  div.classList.add("card")
  div.innerHTML = template
  authorsList.appendChild(div)
}

function onRemoveAuthor() {
  window.event.target.parentElement.remove()
}

function onIsPresenterChange() {
  const isPresenter = window.event.target.checked
  const isPresenterInputs = document.querySelectorAll(
    "input[name='isPresenter']"
  )
  isPresenterInputs.forEach((input) => {
    input.checked = false
  })
  window.event.target.checked = isPresenter
}

function isPresenterSelected() {
  const isPresenterInputs = document.querySelectorAll(
    "input[name='isPresenter']"
  )
  let isPresenterSelected = false
  isPresenterInputs.forEach((input) => {
    if (input.checked) {
      isPresenterSelected = true
    }
  })
  return isPresenterSelected
}
