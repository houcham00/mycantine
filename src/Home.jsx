import React, { useState } from "react"
import "./styles.css"

function Header() {
  return (
    <div className="logo">
      <h1>mycantine</h1>
    </div>
  )
}

function CardItem({ picture, title, price, available, onAddToCart }) {
  return (
    <div className={`card ${!available ? 'card-disabled' : ''}`}>
      <img src={picture} alt={title} className="card-img" />
      <div className="card-info">
        <h3 className="card-title">{title}</h3>
        <p className="card-price">{price} FCFA</p>
        <p className="card-status">{available ? 'Disponible' : 'Épuisé'}</p>
        {available && (
          <button 
            className="order-button"
            onClick={() => onAddToCart({ picture, title, price })}
          >
            Ajouter au panier
          </button>
        )}
      </div>
    </div>
  )
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
    }
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
          onAddToCart={() => onAddToCart(item)}
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
        <div className="cart-container">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.picture} alt={item.title} className="cart-item-img" />
              <div className="cart-item-info">
                <h3>{item.title}</h3>
                <p>{item.price} FCFA</p>
                <button 
                  className="remove-button"
                  onClick={() => onRemoveFromCart(index)}
                >
                  Retirer
                </button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total: {total} FCFA</h3>
            <button className="checkout-button">
              Payer avec MTN Mobile Money
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function Menu({ activeView, setActiveView, cartItemsCount }) {
  return (
    <div className="menu-container">
      <button 
        onClick={() => setActiveView('menu')}
        style={{ 
          backgroundColor: activeView === 'menu' ? '#fff' : 'transparent',
          color: activeView === 'menu' ? '#539df2' : '#fff' 
        }}
      >
        🍽️ Menu
      </button>
      <button 
        onClick={() => setActiveView('cart')}
        style={{ 
          backgroundColor: activeView === 'cart' ? '#fff' : 'transparent',
          color: activeView === 'cart' ? '#539df2' : '#fff' 
        }}
      >
        🛒 Panier ({cartItemsCount})
      </button>
      <button 
        onClick={() => setActiveView('history')}
        style={{ 
          backgroundColor: activeView === 'history' ? '#fff' : 'transparent',
          color: activeView === 'history' ? '#539df2' : '#fff' 
        }}
      >
        🔍 Historique
      </button>
    </div>
  )
}

function HomePage() {
  const [activeView, setActiveView] = useState('menu');
  const [cartItems, setCartItems] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Fonction pour ajouter un item au panier
  const handleAddToCart = (item) => {
    setCartItems(prevItems => [...prevItems, item]);
    setNotificationMessage(`${item.title} ajouté au panier`);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  // Fonction pour retirer un item du panier
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
        return <div className="list-items"><h2>Historique des commandes</h2></div>;
      default:
        return <MenuList onAddToCart={handleAddToCart} />;
    }
  };

  return (
    <>
      <Header />
      {showNotification && (
        <div className="notification">
          {notificationMessage}
        </div>
      )}
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