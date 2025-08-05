import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="text-center mt-16">
      <h2 className="text-3xl font-bold mb-2">404 - Page Not Found</h2>
      <p className="text-gray-600 mb-4">Oops! That page doesn’t exist.</p>
      <Link to="/" className="text-blue-600 underline">Go Home</Link>
    </div>
  );
};

export default NotFound;
