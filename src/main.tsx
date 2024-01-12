import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Adding a .map function to iterate throu a Map like as it was an array
declare global {
  interface Map<K, V> {
    map<K, V, R>(this: Map<K, V>, callbackfn: (value: V, key: K, map: globalThis.Map<K, V>) => R, thisArg?: any): R[]
  }
}

Map.prototype.map = function <K, V, R>(
  this: Map<K, V>,
  callbackfn: (value: V, key: K, map: globalThis.Map<K, V>) => R
): R[] {
  const arr: R[] = []
  this.forEach((value, key, map) => {
    arr.push(callbackfn(value, key, map))
  })
  return arr
}
