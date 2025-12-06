export default function FormNavbar({ title }) {
  return (
    <nav className="form-navbar">
      <div className="form-navbar__left">
        <img src="/logo-unir.png" alt="UNIR Logo" className="form-navbar__logo" />
        <span className="form-navbar__title">{title}</span>
      </div>

      <div className="form-navbar__right">
        <a href="/inventario" className="form-navbar__link">Inventario</a>
        <a href="/ventas" className="form-navbar__link">Ventas</a>
        <a href="/dashboard" className="form-navbar__link">Dashboard</a>
      </div>
    </nav>
  );
}
