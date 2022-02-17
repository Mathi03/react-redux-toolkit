import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserSession } from '../store/slices/auth/actions';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ history }) => {
  const [user, setUser] = useState({ email: '', password: '', loading: false });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ ...user, loading: true });
    // const history = useHistory();
    dispatch(fetchUserSession(user))
      .then(() => {
        navigate('/');
        window.location.reload();
      })
      .catch(() => {
      setUser({ ...user, loading: false });
    });
  };

  const { isLoggedIn } = useSelector((state) => state.moduleAuth);

  if (isLoggedIn) {
    return <Link to="/profile" />;
  }
  return (
    <div className="col-md-12">
      <div className="card card-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Username</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              className="form-control"
              name="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={user.loading}>
              {user.loading && <span className="spinner-border spinner-border-sm"></span>}
              <span>Login</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
