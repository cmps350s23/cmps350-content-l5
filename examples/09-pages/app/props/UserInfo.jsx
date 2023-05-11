function UserInfo(props) {
    return (
        <div>
            First Name: {props.firstName}
            Last Name: {props.lastName}
        </div>
    )
}

function UserInfo1(props) {
    const {firstName, lastName} = props
    return (
        <div>
            First Name: {firstName}
            Last Name: {lastName}
        </div>
    )
}

// Applying props destructuring
function UserInfo2({ firstName, lastName }) {
    return (
        <div>
            First Name: {firstName}
            Last Name: {lastName}
        </div>
    )
}