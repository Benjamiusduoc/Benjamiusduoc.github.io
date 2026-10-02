function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>© {currentYear} Benjamin Salgado. Todos los derechos reservados.</p>
      <div className="social">
        <a href="https://github.com/benjamiusduoc" target="_blank">GitHub</a>
        <a href="https://linkedin.com/in/benjamin-salgado" target="_blank">LinkedIn</a>
        <a href="mailto:benjamius123@gmail.com">Email</a>
      </div>
    </footer>
  );
}

export default Footer;