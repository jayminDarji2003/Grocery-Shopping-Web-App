import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  // inital details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  // get products
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get similar products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container mt-3 ms-3">
        <div className="col-md-5">
          <h4 className="text-center"> Image</h4>
          <img
            src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
            alt=""
            className="card-img-top mt-2 rounded-3 border"
            style={{ width: "400px", height: "400px" }}
          />
        </div>
        <div className="col-md-6">
          <h4 className="text-center"> Product Details</h4>
          <h4 className="mt-5">{product.name}</h4>
          <p className="mt-2 "> Description : {product.description}</p>
          <h6 className="mt-2">Price : ₹{product.price}</h6>
          <h6 className="mt-2">Quantity : {product.quantity}</h6>
          {product.category && (
            <h6 className="mt-2">Category : {product.category.name}</h6>
          )}
          <button
            className="primaryButton ms-1 mt-3"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success("Item Added to cart");
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>
      <hr />
      <div className="row container similar-products">
        <h4>Similar Products</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex  flex-wrap">
          {relatedProducts?.map((p, index) => (
            <div
              className="card m-2"
              style={{
                width: "18rem",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
              key={index}
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
                <h5 className="card-title ">{p.name}</h5>
                {/* <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p> */}

                <p className="card-text fontBold">
                  {" "}
                  Quantity : <b>{p.quantity}</b>
                </p>

                <h5 className="card-text ">Price: ₹{p.price}</h5>
                <div className="d-flex justify-content-between mt-auto">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      navigate(`/product/${p.slug}`);
                    }}
                  >
                    More Details
                  </button>
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
    </Layout>
  );
};

export default ProductDetails;
