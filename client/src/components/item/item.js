import React from "react";
import { Link } from "react-router-dom";
import "./item.css";
import shippingImg from "../../images/ic_shipping.png";
import Currency from "../../currency";

const currency = new Currency();

class Item extends React.Component {
  getItemUrl(itemId) {
    return `/items/${itemId}`;
  }

  getItemPrice(item) {
    if (item.price.currency) {
      var price = currency.formatCurrency(
        item.price.amount,
        item.price.decimals,
        item.price.currency
      );
      return (
        <span>
          {price.amount}
          <span className="ml-decimals">{price.decimals}</span>
        </span>
      );
    } else {
      return (
        <span>
          $ 0<span className="ml-decimals">00</span>
        </span>
      );
    }
  }

  render() {
    return (
      <li className="ml-item ml-bg-content">
        <div>
          <div className="ml-picture">
            <Link to={this.getItemUrl(this.props.item.id)}>
              <img src={this.props.item.picture} alt="" />
            </Link>
          </div>
          <div className="ml-detail">
            <div className="ml-price">
              {this.getItemPrice(this.props.item)}{" "}
              {this.props.item.free_shipping ? (
                <img src={shippingImg} alt="" />
              ) : (
                ""
              )}
            </div>
            <div>
              <Link to={this.getItemUrl(this.props.item.id)}>
                {this.props.item.title}
              </Link>
            </div>
          </div>
          <div className="ml-address">{this.props.item.address}</div>
        </div>
      </li>
    );
  }
}

export default Item;
