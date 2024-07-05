
import { useState } from 'react';

function App() {
  const [image, setImage] = useState(null);

  const uploadImage = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    setImage(e.target.files[0]);
    e.target.value = null;

    try {
      const options = {
        method: 'POST',
        body: formData,
      };
      const response = await fetch('http://localhost:8080/upload', options);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='app'>
      {image && <img src={URL.createObjectURL(image)} alt="Uploaded" />}
      <lable htmlFor='files'>Upload an image</lable>
      <input onChange={uploadImage} id='files' accept='image/*' type='file' />

    </div>
  );
}

export default App;
