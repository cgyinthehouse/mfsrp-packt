type props = { fields: string[] }
export default function PostSorting({ fields = [] }: props) {
  return (
    <div>
      <label htmlFor='sortBy'>Sort By: </label>
      <select id='sortBy' name='sortBy'>
        {fields.map((field) => (
          <option key={field} value={field}>
            {field}
          </option>
        ))}
      </select>
      {'/'}
      <label htmlFor='sortOrder'>Sort Order: </label>
      <select name='sortOrder' id='sortOrder'>
        <option value='ascending'>ascending</option>
        <option value='descending'>descending</option>
      </select>
    </div>
  )
}
