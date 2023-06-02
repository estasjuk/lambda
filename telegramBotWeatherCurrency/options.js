const startMenu = {
  reply_markup: {
        keyboard: [["Weather Forecast in Munich"], ["Currency Exchange"]],
      resize_keyboard: true,
  },
};

const weather = {
  reply_markup: {
        keyboard: [["Every 3 hours", "Every 6 hours"], ["Back"]],
      resize_keyboard: true,
  },
};

const currency = {
  reply_markup: {
        keyboard: [["Privat", "Mono"], ["Back"]],
      resize_keyboard: true,
  },
};

module.exports = {
  startMenu,
  weather,
  currency
};