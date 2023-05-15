import NextAuth from "next-auth/next"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

const emailPasswordCredentialsConfig = {
  // The name to display on the sign in form (e.g. "Sign in with...")
  name: "Credentials",
  // `credentials` is used to generate a form on the sign in page.
  // You can specify which fields should be submitted, by adding keys
  // to the `credentials` object. e.g. email, password
  // You can pass any HTML attribute to the <input> tag through the object.
  credentials: {
    email: {
      label: "Email",
      type: "text",
      defaultValue: "jd@jwt.com",
    },
    password: {
      label: "Password",
      type: "password",
      defaultValue: "pass123",
    },
  },
  /* The function that next-auth calls to authenticate the user
     it takes the credentials submitted and returns a user object or null
  */
  async authorize(credentials, req) {
    console.log("NextAuth config authorize - credentials", credentials)
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users/login`, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: { "Content-Type": "application/json" },
    })

    const user = await res.json()
    console.log("NextAuth config authorize - user", user)

    // If no error then return the user data otherwise return nulll
    if (res.ok && user) {
      return user
    }
    return null
  },
}

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider(emailPasswordCredentialsConfig),
  ],
  /*   pages: {
    signIn: "/signin",
  }, */
  /*
    Callbacks are asynchronous functions you can use to control what happens 
    when an action is performed.

  */
  callbacks: {
    /*
      The jwt callback is called whenever a JSON Web Token is created 
      (i.e. at sign in) or whenever a session is accessed 
      in the client. 
      Requests to /api/auth/signin, /api/auth/session 
      and calls to getSession(), getServerSession(), useSession() 
      will invoke this function.

      The returned value will be encrypted, and it is stored in a cookie.
      It allows you to add additional properties to the token.
      Otherwise the token will only contain name and email
    */
    async jwt({ token, account, profile }) {
      // Add token and the user object to the JWT
      // Otherwise the jwt will only contain name and email}
      console.log("** NextAuth - jwt token:", token)
      console.log("** NextAuth - jwt account:", account)
      console.log("** NextAuth - jwt profile:", profile)
      // Persist user id to the token right after signin
      if (account) {
        //token.accessToken = account.access_token
        token.id = profile?.id
        //Persist to the token right after signin
        //If not available then assign user as the role
        token.role = profile?.role || "User"
      }
      return token
    },

    /*
    The session callback is called whenever a session is accessed using:
    e.g. getSession(), useSession(), /api/auth/session
    By default, only a subset of the token is returned for increased security. 
    If you want to make the additional data you added to the token 
    (like user info) via the jwt() callback, you have to explicitly forward 
    it here to make it available to the client.
    */
    async session({ session, token }) {
      console.log("** NextAuth - session token:", token)
      console.log("** NextAuth - session session:", session)
      // Add access_token to the session for use in the client

      // Send properties to the client, like an access_token
      // and user id from a provider if id not available use sub
      //session.accessToken = token.accessToken
      session.user.id = token?.id || token?.sub
      session.user.role = token?.role || "User"
      //session.user = token
      return session
    },
  },
}

const handler = NextAuth(authOptions)
// After configuring the next-auth handler, you can export it
// GET and POST handlers for the /api/auth/[...nextauth] route
export { handler as GET, handler as POST }
