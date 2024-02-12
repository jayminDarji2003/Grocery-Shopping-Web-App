// import React from "react";
// import Layout from "../components/Layout/Layout.jsx";
// import { useSearch } from "../context/search.jsx";
// import { Link } from "react-router-dom";

// const Search = () => {
//   const [values, setValues] = useSearch();
//   return (
//     <Layout title={"Search results"}>
//       <div className="container">
//         <div className="text-center">
//           <h1>Search Resuts</h1>
//           <h6>
//             {values?.results.length < 1
//               ? "No Products Found"
//               : `Found ${values?.results.length}`}
//           </h6>
//           <div className="d-flex flex-wrap mt-4">
//             {values?.results.map((p) => (
//               <div
//                 className="card m-2"
//                 style={{
//                   width: "18rem",
//                   borderRadius: "10px",
//                   overflow: "hidden",
//                   boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//                 }}
//               >
//                 <Link
//                   to={`/product/${p.slug}`}
//                   style={{ textDecoration: "none" }}
//                 >
//                   <img
//                     src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
//                     className="card-img-top rounded-5"
//                     alt={p.name}
//                     style={{ height: "200px" }}
//                   />
//                 </Link>
//                 <div className="card-body" style={{ color: "black" }}>
//                   <h5 className="card-title ">{p.name}</h5>
//                   {/* <p className="card-text">
//                     {p.description.substring(0, 30)}...
//                   </p> */}

//                   <p className="card-text fontBold">
//                     {" "}
//                     Quantity : <b>{p.quantity}</b>
//                   </p>

//                   <h5 className="card-text ">Price: ₹{p.price}</h5>
//                   <div className="d-flex justify-content-between mt-auto">
//                     <button
//                       className="btn btn-outline-secondary"
//                       onClick={() => {
//                         navigate(`/product/${p.slug}`);
//                       }}
//                     >
//                       More Details
//                     </button>
//                     <button
//                       className="btn btn-secondary cartBtn"
//                       onClick={() => {
//                         setCart([...cart, p]);
//                         localStorage.setItem(
//                           "cart",
//                           JSON.stringify([...cart, p])
//                         );
//                         toast.success("Item Added to cart");
//                       }}
//                     >
//                       Add to Cart
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Search;

import React from "react";
import Layout from "../components/Layout/Layout.jsx";
import { useSearch } from "../context/search.jsx";
import { Link } from "react-router-dom";
import { useCart } from "../context/cart.jsx";
import toast from "react-hot-toast";

const Search = () => {
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div
                className="card m-2"
                style={{
                  width: "18rem",
                  borderRadius: "10px",
                  overflow: "hidden",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
                key={p._id}
              >
                <Link
                  to={`/product/${p.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top rounded-5"
                    alt={p.name}
                    style={{ height: "250px" }}
                  />
                </Link>
                <div className="card-body" style={{ color: "black" }}>
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text fontBold">
                    Quantity: <b>{p.quantity}</b>
                  </p>
                  <h5 className="card-text">Price: ₹{p.price}</h5>
                  <div className="d-flex justify-content-between mt-auto">
                    <Link
                      to={`/product/${p.slug}`}
                      className="btn btn-outline-secondary"
                    >
                      More Details
                    </Link>
                    <button
                      className="primaryButton"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
