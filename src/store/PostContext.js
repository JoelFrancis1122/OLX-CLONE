import { createContext, useState } from 'react';

// Create a context with a default value of null
export const PostContext = createContext(null);

// Define the provider component
function PostProvider({ children }) {
  const [postDetails, setPostDetails] = useState(null);

  return (
    <PostContext.Provider value={{ postDetails, setPostDetails }}>
      {children}
    </PostContext.Provider>
  );
}

// Export the provider component as the default export
export default PostProvider;
