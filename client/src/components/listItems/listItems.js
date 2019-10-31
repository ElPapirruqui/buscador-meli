import React from "react";
import Item from "../item/item";

class ListItems extends React.Component {
  render() {
    return (
      <div className="ml-container">
        {this.props.items && this.props.items.length ? (
          <ul>
            {this.props.items.map(item => {
              return <Item key={item.id} item={item} />;
            })}
          </ul>
        ) : (
          <div className="ml-item ml-bg-content">
            <div style={{ color: "#777" }}>No se encontraron resultados.</div>
          </div>
        )}
      </div>
    );
  }
}

export default ListItems;
