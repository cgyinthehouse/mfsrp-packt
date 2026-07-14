type props = {
  fields: string[]
  value: string
  onChange: (v: string) => void
  orderValue: string
  onOrderChange: (v: string) => void
}
export default function PostSorting({
  fields = [],
  value,
  onChange,
  orderValue,
  onOrderChange,
}: props) {
  return (
    <div>
      <label htmlFor='sortBy'>Sort By: </label>
      <select
        id='sortBy'
        name='sortBy'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {fields.map((field) => (
          <option key={field} value={field}>
            {field}
          </option>
        ))}
      </select>
      {'/'}
      <label htmlFor='sortOrder'>Sort Order: </label>
      <select
        name='sortOrder'
        id='sortOrder'
        value={orderValue}
        onChange={(e) => onOrderChange(e.target.value)}
      >
        <option value='ascending'>ascending</option>
        <option value='descending'>descending</option>
      </select>
    </div>
  )
}
