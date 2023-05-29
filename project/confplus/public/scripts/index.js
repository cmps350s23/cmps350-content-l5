// Todo: Add dynamic menu to every page
// for Next.js you will do it once in the layout.js
setLoginMenu()

function setLoginMenu() {
  const user = localStorage.user ? JSON.parse(localStorage.user) : null
  const authMenu = user
    ? `<span>
        ${
          user.role == "reviewer"
            ? '<a href="/review-paper.html">Review Paper</a>'
            : ""
        }
        ${
          user.role == "author"
            ? '<a href="/submit-paper.html">Submit Paper</a>'
            : ""
        }
        ${
          user.role == "organizer"
            ? '<a href="/edit-schedule.html">Edit Schedule</a>'
            : ""
        }
          <span>Welcome ${user.firstName} ${user.lastName}</span>
          <a href="#" onClick="onSignOut()">
            (Sign Out)
          </a>
        </span>
        `
    : '<a href="/login.html">Login</a>'
  document.querySelector("#auth-menu").innerHTML = authMenu
}

function onSignOut() {
  localStorage.removeItem("user")
  setLoginMenu()
  window.location.href = "/index.html"
}
