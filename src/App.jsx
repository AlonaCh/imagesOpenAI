
import { useState } from 'react';

function App() {
  const [image, setImage] = useState(null);
  const [value, setValue] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

const surpriseOptions = [
  'What is the main object in the image?',
  'What is the color of the object in the image?',
  'What is the size of the object in the image?',
]

  const surprise = () => {
const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];//randomly select an option
setValue(randomValue);
}

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

  const analyzeImage = async () => {

  }

  const clear = () => {
    setImage(null);
    setValue('');
    setResponse('');
  }

  return (
    <div className='app'>
    <section className='search-section'>
      <div className='img-container'>
    {image && <img src={URL.createObjectURL(image)} alt="Uploaded" />}
      </div>
      <p className='information'>
        <span>
          <lable htmlFor='files'>Upload an image</lable>
      <input onChange={uploadImage} id='files' accept='image/*' type='file' />
        </span>
      </p>
      <p>
        What do you want to ask about the image?
        <button className='surpriseBtn' onClick={surprise} disabled={response}>Surprise me</button>
      </p>
      <div className='input'>
        <input
        value={value}
        placeholder='What is in the image'
        onChange={e => setValue(e.target.value)}/>
        {(!response && !error) && <button onClick={analyzeImage}>Ask me</button>}
        {(response || error) && <button onClick={clear}>Clear</button>}
      </div>
      {error && <p>{error}</p>}
      {response && <p>{response}</p>}
    </section>
  
     

    </div>
  );
}

export default App;
