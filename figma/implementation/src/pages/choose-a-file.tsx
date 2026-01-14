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
    if (!file) return
    // In-app navigation or upload would go here
    alert(`Selected file: ${file.name} (${formatBytes(file.size)})`)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <div className="text-xs font-medium text-blue-600 mb-2">Step 1 • Upload</div>
                <h1 className="text-3xl font-semibold leading-tight">Choose a file</h1>
                <p className="mt-2 text-sm text-gray-600">Upload the dataset you want to share. We support common tabular formats like CSV, Excel, JSON and Parquet.</p>
              </div>
              <div className="w-40 hidden sm:flex justify-end">
                <div className="text-right text-sm text-gray-500">Need help?</div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  className={`rounded-xl p-8 border-2 transition ${dragOver ? 'border-blue-400 bg-blue-50' : 'border-dashed border-gray-200 bg-white'}`}>
                  <div className="flex flex-col items-center justify-center text-center">
                    <svg className="w-14 h-14 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16V8a4 4 0 014-4h2a4 4 0 014 4v8m-5-3l-3 3m0 0l-3-3m3 3V4"></path></svg>
                    <div className="text-lg font-medium">Drag & drop a file here</div>
                    <div className="text-sm text-gray-500 mt-2">or</div>

                    <div className="mt-4 flex items-center gap-3">
                      <button type="button" onClick={openFileDialog} className="px-4 py-2 bg-white border rounded shadow-sm hover:bg-gray-50">Browse files</button>
                      <button type="button" onClick={() => {}} className="px-4 py-2 text-sm text-blue-600">Choose from workspace</button>
                    </div>
                  </div>

                  <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    className="hidden"
                    onChange={(e) => handleSelect(e.target.files)}
                  />
                </div>

                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <div>Supported: CSV, XLSX, JSON, Parquet</div>
                  <div>Max 100MB</div>
                </div>

                {file && (
                  <div className="mt-6 p-4 border rounded-lg flex items-center justify-between bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded flex items-center justify-center border">
                        <svg className="w-6 h-6 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path></svg>
                      </div>
                      <div>
                        <div className="font-medium">{file.name}</div>
                        <div className="text-sm text-gray-500">{formatBytes(file.size)}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={clearFile} className="text-sm text-red-600">Remove</button>
                    </div>
                  </div>
                )}
              </div>

              <aside className="md:col-span-1">
                <div className="rounded-lg border p-4 bg-white">
                  <div className="text-sm font-medium text-gray-700">File details</div>
                  <div className="mt-3 text-sm text-gray-500">Accepted formats</div>
                  <ul className="mt-2 text-sm text-gray-600 space-y-1">
                    <li>CSV</li>
                    <li>XLSX / XLS</li>
                    <li>JSON</li>
                    <li>Parquet</li>
                  </ul>
                  <div className="mt-4 text-sm text-gray-500">Tip: Remove sensitive columns before uploading.</div>
                </div>
              </aside>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button className="px-4 py-2 rounded bg-white border" onClick={() => { setFile(null) }}>Cancel</button>
              <button className={`px-4 py-2 rounded text-white ${file ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'}`} onClick={onContinue} disabled={!file}>Continue</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
