export function Welcome( {appName, year, children} ) {
    return <>
        <h1>{appName}</h1>
        <p>Welcome to {appName}! - {year}</p>
        {children}
    </>
}