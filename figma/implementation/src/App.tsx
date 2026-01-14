import React from 'react'

function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-sm p-4">
      <h2 className="text-lg font-semibold mb-4">DataShare</h2>
      <nav className="space-y-2">
        <a className="block px-3 py-2 rounded hover:bg-gray-100">Overview</a>
        <a className="block px-3 py-2 rounded hover:bg-gray-100">Datasets</a>
        <a className="block px-3 py-2 rounded hover:bg-gray-100">Settings</a>
      </nav>
    </aside>
  )
}

function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-sm">
      <div className="text-xl font-bold">DataShare</div>
      <div className="text-sm text-gray-600">Welcome back</div>
    </header>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-2xl font-semibold mb-2">Share a new dataset</h3>
              <p className="text-sm text-gray-600 mb-4">Quickly add dataset metadata and permissions.</p>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Dataset name</label>
                  <input className="w-full border rounded px-3 py-2" placeholder="e.g. Customer Purchases" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea className="w-full border rounded px-3 py-2" rows="3" />
                </div>
                <div className="flex items-center justify-end">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded">Share</button>
                </div>
              </form>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-lg shadow p-4">Card A</div>
              <div className="bg-white rounded-lg shadow p-4">Card B</div>
              <div className="bg-white rounded-lg shadow p-4">Card C</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
