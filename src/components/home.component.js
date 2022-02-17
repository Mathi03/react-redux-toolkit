import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className="container py-4">
      <h1> Welcome</h1>
      <h4>You can access our panels in the following links:</h4>
      <ul className='list-group'>
        <li className='list-group-item'>
          <Link to={'/products'} className="nav-link">Products</Link>
        </li>
        <li className='list-group-item'>
          <Link to={'/users'} className="nav-link">Users</Link>
        </li>
      </ul>
    </div>
  );
};
export default Home;
