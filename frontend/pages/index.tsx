import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import RestaurantList from '../components/RestaurantList';
import OrderList from '../components/OrderList';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      router.push('/login');
    } else {
      setUser(JSON.parse(userStr));
    }
  }, []);

  if (!user) return null;

  const [cart, setCart] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  const handleAddToCart = (item: any) => {
    setCart([...cart, item]);
  };

  async function handleCreateOrder() {
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          itemIds: cart.map(i => i.id),
          paymentMethod: 'card',
        }),
      });
      if (res.ok) {
        setCart([]);
        setMessage('Order created!');
      } else {
        setMessage('Failed to create order');
      }
    } catch (e) {
      setMessage('Failed to create order');
    }
  }

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 40 }}>
      <h2>Welcome, {user.username} ({user.role}, {user.country})</h2>
      <div style={{ marginTop: 20 }}>
        <div>
          <h3>Order Cart</h3>
          {cart.length === 0 ? (
            <p>No items in cart.</p>
          ) : (
            <ul>
              {cart.map((item, idx) => (
                <li key={idx}>{item.name} - ${item.price}</li>
              ))}
            </ul>
          )}
          <button onClick={handleCreateOrder} disabled={cart.length === 0}>
            Create Order
          </button>
          {message && <div style={{ color: 'green', marginTop: 10 }}>{message}</div>}
        </div>
        <div style={{ marginTop: 40 }}>
          <RestaurantList onAddToCart={handleAddToCart} />
        </div>
        <OrderList />
      </div>
    </div>
  );
}


