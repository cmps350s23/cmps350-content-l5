async function login(email, password) {
  const response = await fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
  console.log("login - response", response)
  if (response.status === 200) return response.json()
  else throw new Error("Login failed. Email or password incorrect.")
}

async function onLogin() {
  window.event.preventDefault()
  const email = document.querySelector("#email").value
  const password = document.querySelector("#password").value

  try {
    setErrorMessage("")
    const user = await login(email, password)
    localStorage.user = JSON.stringify(user)
    //redirect to appropriate page
    switch (user.role) {
      case "author":
        window.location.href = "/submit-paper.html"
        break
      case "reviewer":
        window.location.href = "/review-paper.html"
        break
      case "organizer":
        window.location.href = "/schedule-editor.html"
        break

      default:
        setErrorMessage(`User role ${user.role} is invalid`)
        break
    }
  } catch (error) {
    setErrorMessage(error.message)
  }
}

function setErrorMessage(message) {
  const errorMessage = document.querySelector("#error")
  errorMessage.innerHTML = message
  if (message) errorMessage.classList.remove("hidden")
  else errorMessage.classList.add("hidden")
}
