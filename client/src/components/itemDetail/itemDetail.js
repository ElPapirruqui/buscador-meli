import React from "react";
import { withRouter } from "react-router-dom";
import "./itemDetail.css";
import shippingImg from "../../images/ic_shipping@2x.png.png";
import Currency from "../../currency";

const currency = new Currency();

class ItemDetail extends React.Component {
  state = {
    itemDetail: {
      description: ""
    },
    loading: true
  };

  componentDidMount() {
    const itemId = this.props.match.params.id;
    if (itemId) this.getItemDetail(itemId);
  }

  getItemDetail = async itemId => {
    const response = await fetch(`http://localhost:5000/api/items/${itemId}`);
    const data = await response.json();
    this.setState({
      itemDetail: data.item,
      loading: false
    });
  };

  getItemPrice(item) {
    if (item.price.currency) {
      var price = currency.formatCurrency(
        item.price.amount,
        item.price.decimals,
        item.price.currency
      );
      return (
        <h2>
          {price.amount}
          <span className="ml-decimals">{price.decimals}</span>
        </h2>
      );
    } else {
      return (
        <h2>
          $ 0<span className="ml-decimals">00</span>
        </h2>
      );
    }
  }

  render() {
    return (
      <div className="ml-container ml-item-detail">
        {!this.state.loading ? (
          <div className="ml-bg-content">
            <div className="ml-picture ml-column">
              <img alt="" src={this.state.itemDetail.picture} />
            </div>
            <div className="ml-detail ml-column">
              <div className="ml-sold-info">
                {this.state.itemDetail.condition} -{" "}
                {this.state.itemDetail.sold_quantity} vendidos
              </div>
              <h3>{this.state.itemDetail.title}</h3>
              {this.getItemPrice(this.state.itemDetail)}
              {this.state.itemDetail.free_shipping ? (
                <div className="ml-free-shipping">
                  <img src={shippingImg} alt="" />
                  <span>Envío gratis</span>
                </div>
              ) : (
                ""
              )}
              <button className="ml-button">Comprar</button>
            </div>
            <div className="ml-description ml-column">
              <h3>Descripción del producto</h3>
              <p>{this.state.itemDetail.description}</p>
            </div>
          </div>
        ) : (
          <div className="ml-loading"></div>
        )}
      </div>
    );
  }
}

ItemDetail = withRouter(ItemDetail);

export default ItemDetail;
