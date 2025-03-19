import React, { useState, useEffect } from "react";
import "./styles.css";

function Header() {
  return (
    <div className="header">
      <div className="logo">
        <h1>mycantine</h1>
      </div>
    </div>
  );
}

function CardItem({ picture, title, price, available, onAddToCart }) {
  const [isAdding, setIsAdding] = useState(false);
  
  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart({ picture, title, price });
    
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  return (
    <div className={`card ${!available ? 'card-disabled' : ''}`}>
      <div className="card-image-container">
        <img src={picture} alt={title} className="card-img" />
        {!available && <div className="sold-out-overlay">Épuisé</div>}
      </div>
      <div className="card-info">
        <h3 className="card-title">{title}</h3>
        <p className="card-price">{price.toLocaleString()} FCFA</p>
        {available && (
          <button 
            className={`order-button ${isAdding ? 'adding' : ''}`}
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {isAdding ? '✓ Ajouté' : 'Ajouter au panier'}
          </button>
        )}
      </div>
    </div>
  );
}

function MenuList({ onAddToCart }) {
  const menuItems = [
    { 
      id: 1, 
      picture: "src/assets/beignet.jpeg", 
      title: "Beignet", 
      price: 500, 
      available: true 
    },
    { 
      id: 2, 
      picture: "src/assets/juice.jpeg", 
      title: "Juice", 
      price: 700, 
      available: true 
    },
    { 
      id: 3, 
      picture: "src/assets/shawarma.jpeg", 
      title: "Shawarma", 
      price: 1500, 
      available: true 
    },
    {
      id: 4,
      picture: "src/assets/shawarma.jpeg",
      title: "Poulet rôti",
      price: 2500,
      available: false
    },
    {
      id: 5,
      picture: "src/assets/riz.jpeg",
      title: "Riz au Gras",
      price: 1200,
      available: true
    },
    {
      id: 6,
      picture: "src/assets/attieke.jpeg",
      title: "Attiéké Poisson",
      price: 1800,
      available: true
    },
    {
      id: 7,
      picture: "src/assets/salade.jpeg",
      title: "Salade César",
      price: 1300,
      available: true
    },
    {
      id: 8,
      picture: "src/assets/burger.jpeg",
      title: "Burger Deluxe",
      price: 2000,
      available: true
    },
    {
      id: 9,
      picture: "src/assets/couscous.jpeg",
      title: "Couscous Royal",
      price: 2200,
      available: true
    },
    {
      id: 10,
      picture: "src/assets/pizza.jpeg",
      title: "Pizza Margherita",
      price: 3500,
      available: false
    }
  ];

  return (
    <div className="container container-left">
      <h2 className="section-title">Menu du Jour</h2>
      <div className="list-items">
        {menuItems.map((item) => (
          <CardItem 
            key={item.id}
            picture={item.picture}
            title={item.title}
            price={item.price}
            available={item.available}
            onAddToCart={() => onAddToCart(item)}
          />
        ))}
      </div>
    </div>
  );
}

function CartItem({ item, index, onRemoveFromCart }) {
  const [isRemoving, setIsRemoving] = useState(false);
  
  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemoveFromCart(index);
    }, 300);
  };

  return (
    <div className={`cart-item ${isRemoving ? 'removing' : ''}`}>
      <img src={item.picture} alt={item.title} className="cart-item-img" />
      <div className="cart-item-info">
        <h3>{item.title}</h3>
        <p>{item.price.toLocaleString()} FCFA</p>
      </div>
      <button 
        className="remove-button"
        onClick={handleRemove}
      >
        ×
      </button>
    </div>
  );
}

function Cart({ cartItems, onRemoveFromCart }) {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container container-left">
      <h2 className="section-title">Votre Panier</h2>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h3>Votre panier est vide</h3>
          <p>Ajoutez des articles du menu pour commencer</p>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items-list">
            {cartItems.map((item, index) => (
              <CartItem 
                key={index} 
                item={item} 
                index={index} 
                onRemoveFromCart={onRemoveFromCart} 
              />
            ))}
          </div>
          
          <div className="cart-total">
            <div className="total-row">
              <span>Sous-total:</span>
              <span>{total.toLocaleString()} FCFA</span>
            </div>
            <div className="total-row">
              <span>Frais de livraison:</span>
              <span>500 FCFA</span>
            </div>
            <div className="total-row grand-total">
              <span>Total:</span>
              <span>{(total + 500).toLocaleString()} FCFA</span>
            </div>
            
            <div className="payment-methods">
              <button className="checkout-button mtn">
                <span className="payment-icon">📱</span>
                Payer avec MTN Mobile Money
              </button>
              <button className="checkout-button orange">
                <span className="payment-icon">💳</span>
                Payer avec Orange Money
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function OrderHistory() {
  const pastOrders = [
    {
      id: "ORD-001",
      date: "18 Mar 2025",
      items: ["Shawarma", "Juice"],
      total: 2200,
      status: "Livré"
    },
    {
      id: "ORD-002",
      date: "15 Mar 2025",
      items: ["Beignet"],
      total: 500,
      status: "Livré"
    }
  ];

  return (
    <div className="container container-left">
      <h2 className="section-title">Historique des Commandes</h2>
      
      {pastOrders.length === 0 ? (
        <div className="empty-history">
          <h3>Aucune commande passée</h3>
        </div>
      ) : (
        <div className="order-history-list">
          {pastOrders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>
                  <span className="order-id">{order.id}</span>
                  <span className="order-date">{order.date}</span>
                </div>
                <span className={`order-status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>
              <div className="order-items">
                {order.items.join(", ")}
              </div>
              <div className="order-footer">
                <span className="order-total">Total: {order.total.toLocaleString()} FCFA</span>
                <button className="reorder-button">Commander à nouveau</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Menu({ activeView, setActiveView, cartItemsCount }) {
  return (
    <div className="menu-container">
      <button 
        onClick={() => setActiveView('menu')}
        className={activeView === 'menu' ? 'active' : ''}
      >
        <span className="menu-icon">🍽️</span>
        <span className="menu-text">Menu</span>
      </button>
      <button 
        onClick={() => setActiveView('cart')}
        className={activeView === 'cart' ? 'active' : ''}
      >
        <span className="menu-icon">🛒</span>
        <span className="menu-text">Panier</span>
        {cartItemsCount > 0 && <span className="cart-badge">{cartItemsCount}</span>}
      </button>
      <button 
        onClick={() => setActiveView('history')}
        className={activeView === 'history' ? 'active' : ''}
      >
        <span className="menu-icon">🔍</span>
        <span className="menu-text">Historique</span>
      </button>
    </div>
  );
}

function Notification({ message, show, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;
  
  return (
    <div className="notification">
      <span className="notification-icon">✓</span>
      {message}
    </div>
  );
}

function HomePage() {
  const [activeView, setActiveView] = useState('menu');
  const [cartItems, setCartItems] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleAddToCart = (item) => {
    setCartItems(prevItems => [...prevItems, item]);
    setNotificationMessage(`${item.title} ajouté au panier`);
    setShowNotification(true);
  };

  const handleRemoveFromCart = (index) => {
    setCartItems(prevItems => {
      const newItems = [...prevItems];
      newItems.splice(index, 1);
      return newItems;
    });
  };

  const renderContent = () => {
    switch (activeView) {
      case 'menu':
        return <MenuList onAddToCart={handleAddToCart} />;
      case 'cart':
        return (
          <Cart 
            cartItems={cartItems} 
            onRemoveFromCart={handleRemoveFromCart}
          />
        );
      case 'history':
        return <OrderHistory />;
      default:
        return <MenuList onAddToCart={handleAddToCart} />;
    }
  };

  return (
    <div className="app-container">
      <Header />
      <Notification 
        message={notificationMessage} 
        show={showNotification} 
        onClose={() => setShowNotification(false)} 
      />
      <main className="main-content">
        {renderContent()}
      </main>
      <Menu 
        activeView={activeView}
        setActiveView={setActiveView}
        cartItemsCount={cartItems.length}
      />
    </div>
  );
}

export default HomePage;