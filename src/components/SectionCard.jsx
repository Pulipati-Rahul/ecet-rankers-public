function SectionCard({ title, subtitle, children, action }) {
  return (
    <section className="section-card">
      <div className="section-card__header">
        <div>
          <p className="kicker">{subtitle}</p>
          <h2>{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}

export default SectionCard
