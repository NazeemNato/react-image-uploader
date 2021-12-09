import { useState } from 'react'
import axios from 'axios'

function App() {
  const [selectedImage, setSelectedImage] = useState<File>()
  const onSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList  = e.target.files
    if(!fileList ) return
    setSelectedImage(fileList[0])
  }
  // console.log(selectedImage)
  const uploadImage = async () => {
    // check if file is selected
    if(!selectedImage) return
    // check if file is an image
    if(selectedImage.type.indexOf('image') === -1) {
      alert('Please select an image file')
      return
    }
    // image validation
    const img = new Image()
    let objectUrl = window.URL.createObjectURL(selectedImage);
    img.src = objectUrl
    img.onload = async () => {
      // checking image width and height is less than 350px
      if(img.width < 350 || img.height < 350) {
        alert('Please select an image greater than 350px')
        return
      }
      // checking image size greater than 500kb
      if(selectedImage.size > 500000) {
        alert('Please select an image less than 500kb')
        return
      }
      // upload image
      // create object of FormaData
      const formData = new FormData()
      formData.append('rebuneImage', selectedImage)
      const response = await axios.post('http://localhost:5090/api/upload', formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(response.data["filenames"])
      alert('Image uploaded successfully')
      // happy coding :)
    }
  }
  return (
    <div className='content'>
      <input type="file" onChange={onSelectImage} accept=".png,.jpeg,.jpg" />
      <button onClick={uploadImage}>Upload</button>
    </div>
  )
}

export default App
