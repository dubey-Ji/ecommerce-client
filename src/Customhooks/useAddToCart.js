import axios from "axios";

const useAddToCart = () => {
  // return useContext(CartContext);
  const addToCart = async (productId, quantity) => {
    // console.log('addToCart', productId)
    try {
      //   const response = await axios.request({
      //     method: "POST",
      //     url: `http://localhost:8000/api/cart`,
      //     headers: {
      //       Authorization: `Bearer ${localStorage.getItem("token")}`,
      //     },
      //     data: { productId, quantity },
      //   });
      console.log("addToCart", productId, quantity);
      //   console.log("response", response.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  return addToCart;
};

export default useAddToCart;
