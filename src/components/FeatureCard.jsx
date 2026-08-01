import { useNavigate } from "react-router-dom"

function FeatureCard({ emoji, title, subtitle, route }) {
  const navigate = useNavigate()

  return (
    <div style={card} onClick={() => navigate(route)}>
      <div style={{ fontSize: "34px" }}>{emoji}</div>

      <div>
        <h3>{title}</h3>
        <p style={{ color: "#666", fontSize: "14px", marginTop: "4px" }}>
          {subtitle}
        </p>
      </div>
    </div>
  )
}

const card = {
  background: "white",
  borderRadius: "18px",
  padding: "20px",
  display: "flex",
  gap: "18px",
  alignItems: "center",
  marginBottom: "16px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  cursor: "pointer"
}

export default FeatureCard