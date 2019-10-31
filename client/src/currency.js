class Currency {
  formatCurrency(integers, decimals, currencyType) {
    var amount = parseFloat(integers + "." + decimals);
    var options = {
      style: "currency",
      currency: currencyType
    };
    var numberFormat = new Intl.NumberFormat("es-AR", options);
    amount = numberFormat.formatToParts(amount);
    var decimal = "";
    var price = amount.reduce(function(newString, item) {
      if (item.type === "decimal") decimal = item.value;
      return newString + item.value;
    }, "");

    return {
      amount: price.split(decimal)[0],
      decimals: price.split(decimal)[1]
    };
  }
}

module.exports = Currency;
