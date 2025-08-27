import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { login, logout, register } from '../../store/slices/authSlice';
import { fetchProducts } from '../../store/slices/productSlice';
import { addItem, removeItem } from '../../store/slices/cartSlice';

const ReduxExample = () => {
  const dispatch = useAppDispatch();
  const { user, loading, isAuthenticated } = useAppSelector(state => state.auth);
  const { products, loading: productsLoading } = useAppSelector(state => state.products);
  const { items, total, itemCount } = useAppSelector(state => state.cart);

  useEffect(() => {
    // Fetch products when component mounts
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleLogin = () => {
    dispatch(login({ email: 'demo@example.com', password: 'password123' }));
  };

  const handleRegister = () => {
    dispatch(register({ name: 'Demo User', email: 'demo@example.com', password: 'password123' }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleAddToCart = () => {
    if (products.length > 0) {
      const product = products[0];
      dispatch(addItem({
        productId: product._id || product.id,
        quantity: 1,
        product: product
      }));
    }
  };

  const handleRemoveFromCart = () => {
    if (items.length > 0) {
      const productId = items[0].productId;
      dispatch(removeItem(productId));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Redux Example Component</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Authentication State</h3>
        <div className="space-y-2">
          <p>Loading: {loading ? 'Yes' : 'No'}</p>
          <p>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
          <p>User: {user ? JSON.stringify(user, null, 2) : 'None'}</p>
        </div>
        
        <div className="mt-4 space-x-2">
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
          <button
            onClick={handleRegister}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Register
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Products State</h3>
        <div className="space-y-2">
          <p>Loading: {productsLoading ? 'Yes' : 'No'}</p>
          <p>Products Count: {products.length}</p>
          <p>Products: {products.length > 0 ? JSON.stringify(products.slice(0, 2), null, 2) : 'None'}</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Cart State</h3>
        <div className="space-y-2">
          <p>Items Count: {itemCount}</p>
          <p>Total: ${total}</p>
          <p>Items: {items.length > 0 ? JSON.stringify(items.slice(0, 2), null, 2) : 'None'}</p>
        </div>
        
        <div className="mt-4 space-x-2">
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add to Cart
          </button>
          <button
            onClick={handleRemoveFromCart}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Remove from Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReduxExample;
