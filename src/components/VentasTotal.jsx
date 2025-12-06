import "../styles/ventas.css";

export default function VentasTotal({ total }) {
  return (
    <div className="ventas__total-simple">
      <strong>Total:</strong> ${total}

    </div>

    
  );
}