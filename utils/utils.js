const calculateExchangeRate = (baseCurrencyData, targetCurrencyData) => {
  const baseCurrencyCode = baseCurrencyData.code;
  const baseCurrencyRate = baseCurrencyData.mid;
  const targetCurrencyCode = targetCurrencyData.code;
  const targetCurrencyRate = targetCurrencyData.mid;

  if (baseCurrencyCode === "PLN") {
    return targetCurrencyRate;
  } else if (targetCurrencyCode === "PLN") {
    return 1 / baseCurrencyRate;
  } else {
    return targetCurrencyRate / baseCurrencyRate;
  }
};

exports.calculateExchangeRate = calculateExchangeRate;
