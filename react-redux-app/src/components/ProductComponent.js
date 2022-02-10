import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductComponent = () => {
  const products = useSelector((state) => state.allProducts.products);
  const searchText = useSelector((state) => state.allProducts.searchText);
  let filterProducts = [];
  if (searchText !== "") {
      filterProducts = products.filter((p) =>
        p.title.toLowerCase().includes(searchText.toLowerCase())
      );
  } else {
      filterProducts = products;
    }
    
/*
  const renderList =
    filterProducts &&
    filterProducts.map((product) => {
      const { id, title, image, price, category } = product;
      return (
        <div className="five wide column" key={id}>
          <Link to={`/product/${id}`}>
            <div className="ui link cards">
              <div className="card">
                <div className="image">
                  <img src={image} alt={title} />
                </div>
                <div className="content">
                  <div className="header">{title}</div>
                  <div className="meta price">$ {price}</div>
                  <div className="meta">{category}</div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      );
    });
    */
    
    const renderList = filterProducts.length>0 ? (
      filterProducts.map((product) => {
        const { id, title, image, price, category } = product;
        return (
          <div className="five wide column" key={id}>
            <Link to={`/product/${id}`}>
              <div className="ui link cards">
                <div className="card">
                  <div className="image">
                    <img src={image} alt={title} />
                  </div>
                  <div className="content">
                    <div className="header">{title}</div>
                    <div className="meta price">$ {price}</div>
                    <div className="meta">{category}</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        );
      })
    ) : (
      <div className="ui div empty">
        <h3>Products Not Found!</h3>
      </div>
    );
      
    
  return <>{renderList}</>;
};

export default ProductComponent;
