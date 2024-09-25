import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Create = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const history = useNavigate();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [des, setdes] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const date = new Date();

  const validateForm = () => {
    if (!name.trim()) {
      toast.error('Name is required and should not be empty or contain only spaces.');
      return false;
    }
    if (!category.trim()) {
      toast.error('Category is required and should not be empty or contain only spaces.');
      return false;
    }
    if (!price.trim() || isNaN(price) || price <= 0) {
      toast.error('Price is required and should be a positive number.');
      return false;
    }
    if (!image) {
      toast.error('Image is required.');
      return false;
    }
    return true;
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setImage(selectedFile);
    } else {
      toast.error('Please select a valid image file.');
      e.target.value = ''; // Reset the file input
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      firebase
        .storage()
        .ref(`/images/${image.name}`)
        .put(image)
        .then(({ ref }) => ref.getDownloadURL())
        .then((url) => {
          firebase.firestore().collection('products').add({
            name,
            category,
            price,
            des,
            url,
            userId: user.uid,
            createdAt: date.toDateString(),
          });
          toast.success('Product added successfully!', {
            onClose: () => history('/'),
          });
        })
        .catch((error) => {
          toast.error(`Error uploading image: ${error.message}`);
        });
    }
  };

  return (
    <Fragment>
      <Header />
      <ToastContainer />
      <div className="centerDiv">
        <form>
          <label htmlFor="name">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="Name"
          />
          <br />
          <label htmlFor="category">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="Category"
          />
          <br />
          <input
            className="input"
            type="text"
            id="des"
            value={des}
            onChange={(e) => setdes(e.target.value)}
            name="Category"
          />
          <br />
          <label htmlFor="price">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            name="Price"
          />
          <br />
        </form>
        <br />
        <img
          alt="Preview"
          width="200px"
          height="200px"
          src={image ? URL.createObjectURL(image) : ''}
        />
        <br />
        <input
          type="file"
          onChange={handleImageChange}
        />
        <br />
        <button onClick={handleSubmit} className="uploadBtn">
          Upload and Submit
        </button>
      </div>
    </Fragment>
  );
};

export default Create;
