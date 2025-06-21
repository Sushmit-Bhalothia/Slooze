import { useEffect, useState } from 'react';

export default function OrderList() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3000/orders', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading orders...</div>;

  return (
    <div style={{ marginTop: 40 }}>
      <h3>Your Orders</h3>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul>
          {orders.map((order: any) => (
            <li key={order.id} style={{ marginBottom: 10 }}>
              <b>Order #{order.id}</b> [{order.status}]<br />
              Items: {order.items.map((i: any) => i.name).join(', ')}<br />
              Payment: {order.paymentMethod}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
