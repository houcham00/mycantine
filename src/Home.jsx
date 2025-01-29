import React from "react"
import "./styles.css"


function Header() {
    return (
        <>
            <div className="logo">
                <h1>mycantine</h1>
            </div>
        </>
    )
}

function CardItem({ picture, title })
{
    return (
      <div className="card">
        <img src={picture} alt={title} className="card-img" />
        <h3 className="card-title">{title}</h3>
      </div>
    );
}

function Menu() {
    return (
        <>
            <div className="menu-container">
                <button>🍽️ Menu</button>
                <button>🛒 Panier</button>
                <button>🔍 Historique</button>
            </div>
        </>
    )
}

function MenuList() {
    return (
        <>
            <div className="list-items">
                <CardItem picture="src/assets/beignet.jpeg" title="Beignet"/>
                <CardItem picture="src/assets/juice.jpeg" title="Juice"/>
                <CardItem picture="src/assets/shawarma.jpeg" title="Shawarma"/>
                <CardItem picture="src/assets/beignet.jpeg" title="Beignet"/>
                <CardItem picture="src/assets/juice.jpeg" title="Juice"/>
                <CardItem picture="src/assets/shawarma.jpeg" title="Shawarma"/>
                <CardItem picture="src/assets/beignet.jpeg" title="Beignet"/>
                <CardItem picture="src/assets/juice.jpeg" title="Juice"/>
                <CardItem picture="src/assets/shawarma.jpeg" title="Shawarma"/>
            </div>
        </>
    )
}

function HomePage() {
    return (
        <>
            <Header />
            <MenuList />
            <Menu />
        </>
    )
}

export default HomePage;
