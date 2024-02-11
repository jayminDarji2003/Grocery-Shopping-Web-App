import React from 'react';
import { Link } from 'react-router-dom';
import useCategory from '../components/hooks/useCategory';
import Layout from '../components/Layout/Layout.jsx';

const Categories = () => {
    const categories = useCategory();

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    {categories.map((c) => (
                        <div className="col-md-6 my-4" key={c._id}>
                            <Link to={`/category/${c.slug}`} className="text-decoration-none">
                                <div className="card bg-dark text-white">
                                    <div className="card-body">
                                        <h5 className="card-title text-center">{c.name}</h5>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Categories;
