import React, { useRef, useState, DragEvent } from 'react'

function formatBytes(bytes: number) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export default function ChooseAFile(): JSX.Element {
  const [file, setFile] = useState<File | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const accept = '.csv,application/json,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.xlsx,.xls,.parquet'

  const handleSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return
    setFile(files[0])
  }

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(false)
    handleSelect(e.dataTransfer.files)
  }

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(true)
  }

  const onDragLeave = () => setDragOver(false)

  const openFileDialog = () => inputRef.current?.click()

  const clearFile = () => setFile(null)

  const onContinue = () => {
    // Placeholder: in real app you'd upload or navigate
    if (!file) return
    alert(`Selected file: ${file.name} (${formatBytes(file.size)})`)
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="bg-white rounded-2xl shadow p-8">
        <h1 className="text-2xl font-semibold mb-1">Choose a file</h1>
        <p className="text-sm text-gray-600 mb-6">Upload the dataset you want to share. We support common tabular formats.</p>

        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          className={`border-2 ${dragOver ? 'border-blue-400 bg-blue-50' : 'border-dashed border-gray-300'} rounded-lg p-8 flex flex-col items-center justify-center text-center transition`}>
          <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16V8a4 4 0 014-4h2a4 4 0 014 4v8m-5-3l-3 3m0 0l-3-3m3 3V4"></path></svg>
          <div className="mb-3">
            <span className="text-lg font-medium">Drag & drop a file here</span>
            <div className="text-sm text-gray-500 mt-1">or</div>
          </div>

          <div className="flex items-center gap-3">
            <button type="button" onClick={openFileDialog} className="px-4 py-2 bg-white border rounded shadow-sm hover:bg-gray-50">Browse files</button>
            <button type="button" onClick={() => {}} className="px-4 py-2 text-sm text-gray-500">Choose from workspace</button>
          </div>

          <input
            ref={inputRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={(e) => handleSelect(e.target.files)}
          />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">Supported: CSV, XLSX, JSON, Parquet</div>
          <div className="text-sm text-gray-400">Max 100MB</div>
        </div>

        {file && (
          <div className="mt-6 p-4 border rounded-lg flex items-center justify-between">
            <div>
              <div className="font-medium">{file.name}</div>
              <div className="text-sm text-gray-500">{formatBytes(file.size)}</div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={clearFile} className="text-sm text-red-600">Remove</button>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button className="px-4 py-2 rounded bg-white border" onClick={() => { setFile(null) }}>Cancel</button>
          <button className={`px-4 py-2 rounded text-white ${file ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'}`} onClick={onContinue} disabled={!file}>Continue</button>
        </div>
      </div>
    </div>
  )
}
