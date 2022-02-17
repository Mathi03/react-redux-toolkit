import { useState, useEffect } from 'react';
import axios from 'axios';
import header from '../services/auth-header';
import { Link } from 'react-router-dom';

const API_URL = process.env.API_URL || 'http://localhost:4000/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSeach] = useState('');

  useEffect(() => {
    axios
      .get(`${API_URL}/products`, { headers: header() })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const deleteProduct = (id) => {
    axios
      .delete(`${API_URL}/products/${id}`, { headers: header() })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const searchBarcode = (e) => {
    e.preventDefault();
    axios
      .get(`${API_URL}/products?searchBarcode=${search}`, { headers: header() })
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };
  return (
    <div className="container">
      <div className="mb-3 row align-items-center justify-content-between">
        <div className="col-auto">
          <Link className="btn btn-success my-3 " to={'/products/create'}>
            Create Product
          </Link>
        </div>
        <form className="col-auto row align-items-center" onSubmit={searchBarcode}>
          <div className="col-auto">
            <label type="text">Search by barcode:</label>
          </div>
          <div className="col-auto">
            <input
              type="text"
              className="form-control"
              name="name"
              value={search}
              onChange={(e) => setSeach(e.target.value)}
            />
          </div>
          <div className="col-auto">
            <input className="btn btn-primary" type="submit" value="Search" />
          </div>
        </form>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Barcode</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <th scope="row">{p.name}</th>
              <td>{p.barcode}</td>
              <td>{p.price}</td>
              <td>
                <Link className="btn btn-primary" to={`${p._id}`} key={p._id}>
                  Editar
                </Link>
                <button className="btn btn-danger" onClick={() => deleteProduct(p._id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
