import { useState } from 'react'
import './App.css'

function App() {
  const [text, setText] = useState('')
  const [items, setItems] = useState([])
  const [search, setSearch] = useState('')
  const [hideDone, setHideDone] = useState(false)
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState('')

  const addItem = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    setItems([...items, { id: Date.now(), text: text.trim(), done: false }])
    setText('')
  }

  const toggleDone = (id) =>
    setItems(items.map(i => (i.id === id ? { ...i, done: !i.done } : i)))

  const startEdit = (item) => {
    setEditId(item.id)
    setEditText(item.text)
  }

  const saveEdit = () => {
    if (editText.trim()) {
      setItems(items.map(i => (i.id === editId ? { ...i, text: editText.trim() } : i)))
    }
    setEditId(null)
    setEditText('')
  }

  const deleteCompleted = () => setItems(items.filter(i => !i.done))
  const completeAll = () => setItems(items.map(i => ({ ...i, done: true })))

  const visibleItems = items.filter(
    i =>
      i.text.toLowerCase().includes(search.toLowerCase()) &&
      !(hideDone && i.done)
  )

  return (
    <div className="app">
      <h2>ToDoList</h2>

      <form onSubmit={addItem}>
        <div>
          <input
            onChange={(e) => setText(e.target.value)}
            value={text}
            type="text"
            placeholder="Add Task"
          />
          <button type="submit">Add</button>
        </div>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      <div className="list">
        <ul>
          {visibleItems.map(item => (
            <li key={item.id}>
              {editId === item.id ? (
                <input
                  className="editErea"
                  type="text"
                  value={editText}
                  autoFocus
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                />
              ) : (
                <p className={item.done ? 'done' : 'undone'}>{item.text}</p>
              )}

              <div className="list-option">
                {editId !== item.id && (
                  <button onClick={() => toggleDone(item.id)}>
                    {item.done ? 'undone' : 'done'}
                  </button>
                )}
                <button onClick={() => (editId === item.id ? saveEdit() : startEdit(item))}>
                  {editId === item.id ? 'Save' : 'edit'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="options">
        <div className="checkbox">
          <p>Hide The Completed</p>
          <input
            type="checkbox"
            checked={hideDone}
            onChange={(e) => setHideDone(e.target.checked)}
          />
        </div>
        <button className="btn" onClick={deleteCompleted}>Delete The Completed</button>
        <button className="btn" onClick={completeAll}>Make All Completed</button>
      </div>
    </div>
  )
}

export default App