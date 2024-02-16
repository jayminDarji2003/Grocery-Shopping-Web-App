import React from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { Link } from "react-router-dom";

const CartPageTest = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  // Total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => (total = total + item.price));
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };
  // Grand Total price
  const GrandTotalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => (total = total + item.price));
      return total;
    } catch (error) {
      console.log(error);
    }
  };

  // removing cart item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <Layout>
    //   <div className="container">
    //     <div className="">
    //       <div className="">
    //         <h1 className="text-center bg-light p-2 mb-1">
    //           {`Hello ${auth?.token && auth?.user?.name}`}
    //         </h1>
    //         <h4 className="text-center">
    //           {cart?.length > 0 ? (
    //             `You Have ${cart?.length} items in your cart ${
    //               auth?.token ? "" : "please login to checkout"
    //             } `
    //           ) : (
    //             <div className="d-flex flex-column justify-content-center w-50 mt-2 mx-auto ">
    //               <img
    //                 src="/empty_cart.jpg"
    //                 alt="empty cart image"
    //                 className="cartImage"
    //               />
    //               <div className="mt-5">
    //                 <h4 className="font-weight-bold">
    //                   You don't have any items in your cart
    //                 </h4>
    //                 <h6 className="text-secondary">
    //                   Your favourite items are just a click away
    //                 </h6>

    //                 <Link to="/">
    //                   <button className="primaryButton mt-2 fs-6">
    //                     Start Shopping
    //                   </button>
    //                 </Link>
    //               </div>
    //             </div>
    //           )}
    //         </h4>
    //       </div>
    //     </div>
    //     <div className="row d-flex justify-content-center">
    //       <div className="col-md-8">
    //         {cart?.map((p) => (
    //           <div className="row m-2 card flex-row rounded-3" key={p._id}>
    //             <div className="col-md-4">
    //               <img
    //                 src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
    //                 alt={p.name}
    //                 style={{
    //                   width: "200px",
    //                   height: "200px",
    //                   margin: "10px",
    //                   borderRadius: "5px",
    //                 }}
    //               />
    //             </div>
    //             <div className="col-md-8 px-5">
    //               <h6 className="mt-5"> Name : {p.name}</h6>
    //               <p>Description : {p.description.substring(0, 30)}...</p>
    //               <p>Price : ₹{p.price}</p>
    //               <button
    //                 className="btn btn-danger btn-sm px-3 rounded-3"
    //                 onClick={() => {
    //                   removeCartItem(p._id);
    //                 }}
    //               >
    //                 {" "}
    //                 Remove{" "}
    //               </button>
    //             </div>
    //           </div>
    //         ))}
    //       </div>

    //       {cart?.length > 0 && (
    //         <div className="col-md-8 m-5 border p-3 d-flex">
    //           <div className=" w-100">
    //             <p className="fw-bold fs-4">Bills Details</p>

    //             <div className="d-flex gap-2 justify-content-between fs-5">
    //               <div>
    //                 <i class="fa-solid fa-gift me-2"></i>
    //                 <span>Item total</span>
    //               </div>
    //               <div>
    //                 <p className="text-end ">{totalPrice()}</p>
    //               </div>
    //             </div>

    //             <div className="d-flex gap-2 justify-content-between fs-5">
    //               <div>
    //                 <i class="fa-solid fa-truck me-2"></i>
    //                 <span>Delivery Charge</span>
    //               </div>
    //               <div>
    //                 <p className="text-end ">₹50.00</p>
    //               </div>
    //             </div>

    //             <div className="d-flex gap-2 justify-content-between fs-5">
    //               <div>
    //                 <p className="fw-bold">Grand Total</p>
    //               </div>
    //               <div>
    //                 <p className="text-end ">₹{GrandTotalPrice() + 50}.00</p>
    //               </div>
    //             </div>

    //             <div className="d-flex justify-content-center ">
    //               <Link to="/checkout">
    //                 <button className="primaryButton p-2 px-4 fs-6">
    //                   Checkout now
    //                 </button>
    //               </Link>
    //             </div>
    //           </div>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </Layout>

    <Layout>
      <div className="container">
        <div className="text-center">
          <h1 className="text-center bg-light p-2 mb-1">
            {`Hello ${auth?.token && auth?.user?.name}`}
          </h1>
          <h4 className="text-center">
            {cart?.length > 0 ? (
              `You Have ${cart?.length} items in your cart ${
                auth?.token ? "" : "please login to checkout"
              } `
            ) : (
              <div className="d-flex flex-column justify-content-center align-items-center mt-2">
                <img
                  src="/empty_cart.jpg"
                  alt="empty cart image"
                  className="cartImage w-50"
                />
                <div className="mt-3 text-center">
                  <h4 className="font-weight-bold">
                    You don't have any items in your cart
                  </h4>
                  <h6 className="text-secondary">
                    Your favourite items are just a click away
                  </h6>
                  <Link to="/">
                    <button className="primaryButton mt-3 fs-5">
                      Start Shopping
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </h4>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row m-2 card flex-row rounded-3" key={p._id}>
                <div className="col-md-4">
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    className="img-fluid rounded"
                  />
                </div>
                <div className="col-md-8 px-4 d-flex flex-column justify-content-center">
                  <h6 className="mt-3">Name: {p.name}</h6>
                  <p>Description: {p.description.substring(0, 30)}...</p>
                  <p>Price: ₹{p.price}</p>
                  <button
                    className="btn btn-danger btn-sm rounded"
                    onClick={() => {
                      removeCartItem(p._id);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {cart?.length > 0 && (
            <div className="col-md-8 m-3 border p-3">
              <div className="w-100">
                <p className="fw-bold fs-4">Bills Details</p>

                <div className="d-flex justify-content-between align-items-center fs-5">
                  <div>
                    <i className="fa-solid fa-gift me-2"></i>
                    <span>Item total</span>
                  </div>
                  <div>
                    <p className="text-end ">{totalPrice()}</p>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center fs-5">
                  <div>
                    <i className="fa-solid fa-truck me-2"></i>
                    <span>Delivery Charge</span>
                  </div>
                  <div>
                    <p className="text-end ">₹50.00</p>
                  </div>
                </div>

                <div className="d-flex justify-content-between fs-5">
                  <div>
                    <p className="fw-bold">Grand Total</p>
                  </div>
                  <div>
                    <p className="text-end ">₹{GrandTotalPrice() + 50}.00</p>
                  </div>
                </div>

                <div className="d-flex justify-content-center">
                  <Link to="/checkout">
                    <button className="primaryButton p-2 px-4 fs-6">
                      Checkout now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CartPageTest;
