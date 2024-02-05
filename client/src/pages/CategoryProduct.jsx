import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useCart();

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container-fluid mt-3 category">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found </h6>
        <div className="row mt-3 p-0">
          <div className="col-md-12 offset-1">
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div
                  className="card m-2"
                  style={{
                    width: "18rem",
                    borderRadius: "10px",
                    overflow: "hidden",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  }}
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
                        className="btn btn-secondary cartBtn"
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
            {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
