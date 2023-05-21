const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="yellow center">
      <p>Web Dev - QU ©️ {year} </p>
    </footer>
  );
};

export default Footer;
