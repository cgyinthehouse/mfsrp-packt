type props = {
  field: string
  value: string
  onChange: (e: string) => void
}
export default function PostFilter({ field, value, onChange }: props) {
  return (
    <div>
      <label htmlFor={`filter-${field}`}>{field}: </label>
      <input
        type='text'
        name={`filter-${field}`}
        id={`filter-${field}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
