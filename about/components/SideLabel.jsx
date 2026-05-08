export default function SideLabel({ text }) {
  return (
    <div className="side-label" aria-hidden="true">
      <span>{text}</span>
    </div>
  )
}
