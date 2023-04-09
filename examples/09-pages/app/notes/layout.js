export default function NotesLayout ({ children }) {
    return (
      <>
        {/* <h1>This is post layout</h1> */}
        <h1>This is a common Notes Layout</h1>
        <marquee>
          <h1>My notes</h1>
        </marquee>
        {children}
      </>
    )
}
