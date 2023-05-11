function ProfilePic(props) {
  const url =
    "http://www.qu.edu.qa/static_file/qu/colleges/engineering/departments/cse/images";
  const imgStyle = {
    maxWidth: "90px",
    height: "100px",
  };

  return <img style={imgStyle} src={`${url}/${props.picName}`} />;
}

function ProfileLink({ username }) {
  const url = "http://qufaculty.qu.edu.qa";
  return (
    <a target="_blank" href={`${url}/${username}`}>
      {username}
    </a>
  );
}

export default function Avatar(props) {
  return (
    <div>
      <ProfilePic picName={props.picName} />
      <br />
      <ProfileLink username={props.username} />
      <br />
    </div>
  );
}
