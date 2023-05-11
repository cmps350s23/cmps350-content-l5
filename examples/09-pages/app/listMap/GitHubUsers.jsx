// Server side rendered component
export default async function GitHubUsers() {
  async function fetchData() {
    const url = "https://api.github.com/users"
    const response = await fetch(url)
    return await response.json()
  }
  const users = await fetchData()
  //console.log(users)
  
  return (
    <>
      <h3>GitHub users</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <a href={user.html_url} target="_blank">
              {user.login}
            </a>
            <br />
            <img src={user.avatar_url} className="avatarImage" />
          </li>
        ))}
      </ul>
    </>
  )
}
