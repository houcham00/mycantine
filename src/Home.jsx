import React, { useState } from "react"
import "./styles.css"

function Header() {
  return (
    <div className="logo">
      <h1>mycantine</h1>
    </div>
  )
}

function CardItem({ picture, title, price, available, onOrder }) {
  return (
    <div className={`card ${!available ? 'card-disabled' : ''}`}>
      <img src={picture} alt={title} className="card-img" />
      <div className="card-info">
        <h3 className="card-title">{title}</h3>
        <p className="card-price">{price} FCFA</p>
        <p className="card-status">{available ? 'Disponible' : 'Épuisé'}</p>
        {available && (
          <button onClick={onOrder} className="order-button">
            Commander
          </button>
        )}
      </div>
    </div>
  )
}

function MenuList({ onOrder }) {
  const menuItems = [
    { id: 1, picture: "src/assets/beignet.jpeg", title: "Beignet", price: 500, available: true },
    { id: 2, picture: "src/assets/juice.jpeg", title: "Juice", price: 700, available: true },
    { id: 3, picture: "src/assets/shawarma.jpeg", title: "Shawarma", price: 1500, available: false },
    // ... autres items
  ];

  return (
    <div className="list-items">
      {menuItems.map((item) => (
        <CardItem 
          key={item.id}
          picture={item.picture} 
          title={item.title}
          price={item.price}
          available={item.available}
          onOrder={() => onOrder(item)}
        />
      ))}
    </div>
  )
}

function Cart({ cartItems, onRemoveFromCart }) {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="list-items">
      {cartItems.length === 0 ? (
        <h2>Votre panier est vide</h2>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.picture} alt={item.title} className="cart-item-img" />
              <div className="cart-item-info">
                <h3>{item.title}</h3>
                <p>{item.price} FCFA</p>
                <button onClick={() => onRemoveFromCart(index)}>Retirer</button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total: {total} FCFA</h3>
            <button className="checkout-button">Payer avec MTN Mobile Money</button>
          </div>
        </>
      )}
    </div>
  )
}

function History() {
  const orderHistory = [
    { id: 1, date: '2024-01-29', items: ['Beignet', 'Juice'], total: 1200, status: 'Livré' },
    { id: 2, date: '2024-01-28', items: ['Shawarma'], total: 1500, status: 'Livré' },
  ];

  return (
    <div className="list-items">
      <h2>Historique des commandes</h2>
      {orderHistory.map((order) => (
        <div key={order.id} className="history-item">
          <p>Date: {order.date}</p>
          <p>Articles: {order.items.join(', ')}</p>
          <p>Total: {order.total} FCFA</p>
          <p>Statut: {order.status}</p>
        </div>
      ))}
    </div>
  )
}

function Menu({ activeView, setActiveView, cartItemsCount }) {
  return (
    <div className="menu-container">
      <button 
        onClick={() => setActiveView('menu')}
        style={{ backgroundColor: activeView === 'menu' ? '#fff' : 'transparent', color: activeView === 'menu' ? '#539df2' : '#fff' }}
      >
        🍽️ Menu du jour
      </button>
      <button 
        onClick={() => setActiveView('cart')}
        style={{ backgroundColor: activeView === 'cart' ? '#fff' : 'transparent', color: activeView === 'cart' ? '#539df2' : '#fff' }}
      >
        🛒 Panier ({cartItemsCount})
      </button>
      <button 
        onClick={() => setActiveView('history')}
        style={{ backgroundColor: activeView === 'history' ? '#fff' : 'transparent', color: activeView === 'history' ? '#539df2' : '#fff' }}
      >
        🔍 Historique
      </button>
    </div>
  )
}

function HomePage() {
  const [activeView, setActiveView] = useState('menu');
  const [cartItems, setCartItems] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const handleOrder = (item) => {
    setCartItems([...cartItems, item]);
    setNotifications([...notifications, `${item.title} ajouté au panier`]);
    // Simuler la disparition de la notification après 3 secondes
    setTimeout(() => {
      setNotifications(notifications.filter(n => n !== `${item.title} ajouté au panier`));
    }, 3000);
  };

  const handleRemoveFromCart = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'menu':
        return <MenuList onOrder={handleOrder} />;
      case 'cart':
        return <Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />;
      case 'history':
        return <History />;
      default:
        return <MenuList onOrder={handleOrder} />;
    }
  };

  return (
    <>
      <Header />
      {notifications.map((notification, index) => (
        <div key={index} className="notification">
          {notification}
        </div>
      ))}
      {renderContent()}
      <Menu 
        activeView={activeView} 
        setActiveView={setActiveView} 
        cartItemsCount={cartItems.length}
      />
    </>
  )
}

export default HomePage;