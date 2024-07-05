import { useState } from 'react'



function App() {
const [image, setImage] = useState(null)

const uploadImage = (e) => {
  const formData = new FormData()
  formData.append("file", e.target.files[0])
setImage(e.target.files[0])
} 

  return (
    <div className='app'>
      <label htmlFor="file">Upload an image</label>
     <input onChange={uploadImage} id="file" accept="image/*" type="file" hidden/>
    </div>
  )
}

export default App
