const fetchScript = (url: string) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')

    script.type = 'text/javascript'
    script.src = url
    script.async = true
    script.onload = resolve
    script.onerror = reject

    document.head.appendChild(script)
  })
}

export default fetchScript
