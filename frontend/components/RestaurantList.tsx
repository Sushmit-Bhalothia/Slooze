import { useEffect, useState } from 'react';

export default function RestaurantList({ onAddToCart }: { onAddToCart?: (item: any) => void }) {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3000/restaurants', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setRestaurants(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading restaurants...</div>;

  return (
    <div>
      <h3>Restaurants & Menu</h3>
      {restaurants.map(r => (
        <div key={r.id} style={{ marginBottom: 20, border: '1px solid #ccc', padding: 10 }}>
          <h4>{r.name} ({r.country})</h4>
          <ul>
            {r.menuItems.map((item: any) => (
              <li key={item.id}>
                {item.name} - ${item.price}
                {onAddToCart && (
                  <button style={{ marginLeft: 10 }} onClick={() => onAddToCart(item)}>
                    Add to Order
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
