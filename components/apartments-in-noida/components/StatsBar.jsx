const stats = [
  { value: '33', label: 'Acres — Township' },
  { value: '1.6L', label: 'sq.ft Cascades Club' },
  { value: '433', label: 'Apartments Delivered' },
  { value: '150+', label: 'Families at Waterfall' },
]

const F_JOST = 'var(--font-jost), Montserrat, sans-serif'
const F_SANS = 'var(--font-sans), Open Sans, sans-serif'

const StatsBar = () => (
  <div style={{
    background: '#0d0d0d',
    padding: '18px 24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '0',
  }}>
    {stats.map((s, i) => (
      <div key={i} style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '6px 28px',
        }}
          data-aos="fade-up"
          data-aos-delay={i * 100}
        >
          <span style={{
            fontFamily: F_JOST,
            fontSize: '40px',
            fontWeight: '700',
            color: '#fff',
            lineHeight: 1,
          }}>{s.value}</span>
          <span style={{
            fontFamily: F_SANS,
            fontSize: '13px',
            color: 'rgba(255,255,255,0.75)',
            lineHeight: 1.3,
            maxWidth: '100px',
          }}>{s.label}</span>
        </div>
        {i < stats.length - 1 && (
          <div style={{
            width: '1px',
            height: '40px',
            background: 'rgba(255,255,255,0.2)',
            flexShrink: 0,
          }} />
        )}
      </div>
    ))}
  </div>
)

export default StatsBar
