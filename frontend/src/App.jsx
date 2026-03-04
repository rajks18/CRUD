import { useState, useEffect } from 'react'

function App() {
  const [items, setItems] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [editName, setEditName] = useState('')
  const [editDescription, setEditDescription] = useState('')

  // Fetch items from API
  const fetchItems = async () => {
    try {
      const response = await fetch('/api/items')
      if (!response.ok) throw new Error('Failed to fetch items')
      const data = await response.json()
      setItems(data)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  // Add new item
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) return

    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description })
      })
      if (!response.ok) throw new Error('Failed to add item')
      
      setName('')
      setDescription('')
      fetchItems()
    } catch (err) {
      setError(err.message)
    }
  }

  // Delete item
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/items/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Failed to delete item')
      fetchItems()
    } catch (err) {
      setError(err.message)
    }
  }

  // Start editing
  const startEdit = (item) => {
    setEditingId(item._id)
    setEditName(item.name)
    setEditDescription(item.description || '')
  }

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null)
    setEditName('')
    setEditDescription('')
  }

  // Update item
  const handleUpdate = async (id) => {
    if (!editName.trim()) return
    try {
      const response = await fetch(`/api/items/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editName, description: editDescription })
      })
      if (!response.ok) throw new Error('Failed to update item')
      setEditingId(null)
      fetchItems()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          MERN Stack Application
        </h1>

        {/* Add Item Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter item name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter description"
              rows="3"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Item
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Items List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Items ({items.length})</h2>
          
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No items yet. Add one above!</div>
          ) : (
            items.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-md p-4"
              >
                {editingId === item._id ? (
                  <div>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                      placeholder="Item name"
                    />
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                      placeholder="Description"
                      rows="2"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(item._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-gray-600 mt-1">{item.description || 'No description'}</p>
                      <p className="text-gray-400 text-sm mt-2">
                        Created: {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => startEdit(item)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default App
