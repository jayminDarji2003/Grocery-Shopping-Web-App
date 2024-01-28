import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import Banner from "../../public/images/Banner.jpg";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // get Total Count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //getproducts
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // get filtered product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/product-filters",
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      {/* banner image */}
      <img
        src="../../public/images/Banner.jpg"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      />
      {/* banner image */}
      <div className="row mt-4 mx-auto">
        <div className="col-md-2 ">
          <h4 className="text-center"> Filter By Category </h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c.id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          <h4 className="text-center mt-3"> Filter By Price </h4>
          <div className="d-flex flex-column mt-4">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column mt-4">
            <button
              className="btn btn-secondary cartBtn"
              onClick={() => window.location.reload()}
            >
              {" "}
              Reset filtering{" "}
            </button>
          </div>
        </div>

        <div className="col-md-10 mt-3">
          <h1 className="text-center"> All Products </h1>

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
                    style={{ height: "200px" }}
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

          <div className="m-2 p-3 d-flex justify-content-center">
            {products && products.length < total && (
              <button
                className="btn btn-secondary cartBtn"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? " Loading..." : "LOADMORE"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
