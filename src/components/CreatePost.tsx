export default function CreatePost() {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <label htmlFor='create-title'>Title: </label>
        <input id='create-title' name='create-title' type='text' />
      </div>
      <br />
      <div>
        <label htmlFor='create-author'>Author:</label>
        <input name='create-author' type='text' />
      </div>
      <br />
      <textarea />
      <br />
      <br />
      <input type='submit' value='Create' />
    </form>
  )
}
