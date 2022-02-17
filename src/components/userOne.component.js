import { useState, useEffect } from 'react';
import axios from 'axios';
import header from '../services/auth-header';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = process.env.API_URL || 'http://localhost:4000/api';

const UserOne = ({ history }) => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    roles: [],
    loading: false
  });
  const params = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ ...user, loading: true });
    // const history = useHistory();
    axios
      .put(`${API_URL}/users/${params.userId}`, user, { headers: header() })
      .then(() => {
        navigate('/users');
        window.location.reload();
      })
      .catch(() => {
        setUser({ ...user, loading: false });
      });
  };

  const handleCheck = (e) => {
    if (e.target.checked) {
      setUser({ ...user, roles: [...user.roles, e.target.value] });
    } else {
      setUser({ ...user, roles: [...user.roles.filter((r) => r.indexOf(e.target.value))] });
    }
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/users/${params.userId}`, { headers: header() })
      .then((res) => {
        setUser({...res.data, roles: res.data.roles.map((e) => e['name'])});
      })
      .catch((err) => console.log(err));
  }, [params.userId]);
  return (
    <div className="container">
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control"
            name="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="roles">Roles</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="user"
              onChange={handleCheck}
              checked={user.roles.includes('user')}
            />
            <label className="form-check-label">User</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="admin"
              onChange={handleCheck}
              checked={user.roles.includes('admin')}
            />
            <label className="form-check-label">Admin</label>
          </div>
        </div>
        <div className="form-group">
          <button className="btn btn-primary btn-block my-2" disabled={user.loading}>
            {user.loading && <span className="spinner-border spinner-border-sm"></span>}
            <span>Actualizar</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserOne;
