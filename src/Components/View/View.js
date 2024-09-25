import React, { useContext, useState, useEffect } from 'react';
import './View.css';

import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';

function View() {
  const [userDetails, setUserDetails] = useState(null);
  const { postDetails } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    console.log("postDetails:", postDetails);
    if (postDetails && postDetails.userId) {
      const { userId } = postDetails;
      firebase.firestore().collection('users').where('id', '==', userId).get().then((res) => {
        res.forEach(doc => {
          console.log("User Details:", doc.data());
          setUserDetails(doc.data());
        });
      }).catch((error) => {
        console.error("Error fetching user details:", error);
      });
    }
  }, [postDetails, firebase]);

  if (!postDetails) {
    console.log("Post details not found!");
    return <div>Loading...</div>;
  }

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url || '../../../Images/placeholder.jpg'}
          alt="Product"
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price || 'N/A'}</p>
          <h2>{postDetails.name || 'Product Name'}</h2>
          <p>Description :{postDetails.des || 'Description'}</p>
          <p>category :{postDetails.category || 'Category'}</p>
 
          <span>Date : {new Date(postDetails.createdAt).toDateString() || 'Date'}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>Name : {userDetails ? userDetails.username : 'No name'}</p>
          <p>Phone : {userDetails ? userDetails.phone : 'No phone'}</p>
        </div>
      </div>
    </div>
  );
}

export default View;
