export default function PostFilter({ field }: { field: string }) {
  return (
    <div>
      <label htmlFor={`filter-${field}`}>{field}: </label>
      <input type='text' name={`filter-${field}`} id={`filter-${field}`} />
    </div>
  )
}
