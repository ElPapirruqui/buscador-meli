const fetch = require("node-fetch");

class ItemsService {
  constructor() {}

  async getItemsList(query) {
    const response = await fetch(
      `https://api.mercadolibre.com/sites/MLA/search?q=${query}`
    );
    let data = await response.json();

    let categories = data.filters.find(item => {
      return item.id === "category";
    });
    categories = categories ? categories.values.shift(0) : null;
    categories = categories
      ? categories.path_from_root.map(item => {
          return item.name;
        })
      : [];

    let results = data.results.splice(0, 4);

    data = {
      author: {
        name: "Ignacio",
        lastname: "Urrutia"
      },
      categories: categories,
      items: results.map(item => {
        let price = item.price.toString();
        price = price.split(".");

        return {
          id: item.id,
          title: item.title,
          price: {
            currency: item.currency_id,
            amount: price.shift(0),
            decimals: price.shift(0)
          },
          picture: item.thumbnail,
          condition: item.condition,
          free_shipping: item.shipping.free_shipping,
          address: item.address.state_name
        };
      })
    };

    return data;
  }

  async getItemById(id) {
    const itemResponse = await fetch(
      `https://api.mercadolibre.com/items/${id}`
    );
    let itemData = await itemResponse.json();

    const descriptionResponse = await fetch(
      `https://api.mercadolibre.com/items/${id}/description`
    );
    const descriptionData = await descriptionResponse.json();

    let price = itemData.price.toString();
    price = price.split(".");

    let picture = itemData.pictures;
    picture = picture.shift(0);
    picture = picture ? picture.url : "";

    itemData = {
      author: {
        name: "Ignacio",
        lastname: "Urrutia"
      },
      item: {
        id: itemData.id,
        title: itemData.title,
        price: {
          currency: itemData.currency_id,
          amount: price.shift(0),
          decimals: price.shift(0)
        },
        picture: picture,
        condition: itemData.condition,
        free_shipping: itemData.shipping.free_shipping,
        sold_quantity: itemData.sold_quantity,
        description: descriptionData.plain_text
      }
    };

    return itemData;
  }
}

module.exports = ItemsService;
