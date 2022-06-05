import './style.css'
import ReadText from 'text-from-image'

const $form = document.querySelector('form')
const $file = document.getElementById('fileLoader')
const $img = document.getElementById('imageToRead')

$form.addEventListener('submit', e => {
  e.preventDefault()
  const img = $file.files[0]
  img ? imgToTxt(img) : alert('No se subió el archivo')
})

$file.addEventListener('change', e => {
  const file = e.target.files[0]
  $img.src = URL.createObjectURL(file)
  $img.onload = function () {
    URL.revokeObjectURL($img.src) // free memory
  }
}
)

const strToIntArr = (strArr) => {
  const numberArr = strArr.map(str => parseFloat(str.replace('.', '').replace(',', '.')))
  const filterNumberArr = numberArr.filter(num => !isNaN(num))
  return filterNumberArr
}

const sumArr = (arr) => {
  return strToIntArr(arr).reduce((acc, curr) => acc + curr).toFixed(2)
}
const imgToTxt = async (img) => {
  try {
    const text = await ReadText(img)
    const textArr = text.split('\n')
    alert(`El total de la suma es: ${sumArr(textArr)}`)
    location.reload()
  } catch (error) {
    alert('No se pudo leer el archivo')
  }
}
