// import React from 'react'
// import { Link } from 'react-router-dom'
// import useCategory from '../components/hooks/useCategory'
// import Layout from '../components/Layout/Layout.jsx'

// const Categories = () => {
//     const categories = useCategory()
//     return (
//         <Layout>
//             <div className="container">
//                 <div className="row " >
//                     {categories.map((c) => (
//                         <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
//                             <Link to={`/category/${c.slug}`} className=" text-white text-center " style={{ fontSize: " 26px", backgroundColor: "rgb(31,31,31)", padding: "20px 35px", borderRadius: "10px", textDecoration: "none", }}> {c.name}</Link>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </Layout>
//     )
// }

// export default Categories


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
