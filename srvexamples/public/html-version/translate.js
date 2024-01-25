const init = () => {
  // initialize the listener for the search button and trigger the search, when clicked
  console.log('initializing the event listeners')
  document.getElementById("en2deButton").addEventListener('click', translateToDe)
  document.getElementById("de2enButton").addEventListener('click', translateToEn)
}

const translateToDe = async () => {
  const enTextArea = document.getElementById('enTextArea')
  const result  = await translate('/api/en2de', enTextArea.value)
  const deTextArea = document.getElementById('deTextArea')
  deTextArea.value = result.translation
}

const translateToEn = async () => {
  const deTextArea = document.getElementById('deTextArea')
  const result  = await translate('/api/de2en', deTextArea.value)
  const enTextArea = document.getElementById('enTextArea')
  enTextArea.value = result.translation
}

const translate = async (path, originalText) => {
  const payload = { source: originalText }
  const response = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
  const json = await response.json()
  return json
}