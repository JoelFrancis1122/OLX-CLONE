import React, { useEffect, useState, useContext } from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';
import { useNavigate } from 'react-router-dom';
function Posts() {
  const { firebase } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const { setPostDetails } = useContext(PostContext);
  const history = useNavigate();

  useEffect(() => {
    firebase.firestore().collection('products').get().then((snapshot) => {
      const allPost = snapshot.docs.map((product) => ({
        ...product.data(),
        id: product.id,
      }));
      setProducts(allPost);
    });
  }, [firebase]);

  const joel = (product) => {
    setPostDetails(product);
    history('/view');
  };

  // Define categories and shuffle for demonstration
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  // Example logic for different categories
  const shuffledProducts = shuffleArray(products);
  const quickMenuProducts = shuffledProducts.slice(0, 7); // Adjust slice as needed
  const popularProducts = shuffledProducts.slice(7, 13); // Adjust slice as needed
  const newArrivalsProducts = shuffledProducts.slice(10, 15); // Adjust slice as needed
const event=(e)=>{
  console.log(e)
}
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span onClick={event}>View more</span>
        </div>
        <div className="cards">
          {quickMenuProducts.map((product) => (
            <div
              key={product.id}
              className="card"
              onClick={() => joel(product)}
            >
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="moreView">
        <div className="heading">
          <span>Popular</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {popularProducts.map((product) => (
            <div
              key={product.id}
              className="card"
              onClick={() => joel(product)}
            >
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="moreView">
        <div className="heading">
          <span>New Arrivals</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {newArrivalsProducts.map((product) => (
            <div
              key={product.id}
              className="card"
              onClick={() => joel(product)}
            >
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
