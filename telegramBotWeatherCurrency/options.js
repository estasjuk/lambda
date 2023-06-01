const startMenu = {
  reply_markup: {
        keyboard: [["Weather Forecast in Munich"]],
      resize_keyboard: true,
  },
};

const weather = {
  reply_markup: {
        keyboard: [["Every 3 hours", "Every 6 hours"], ["Back"]],
      resize_keyboard: true,
  },
};

module.exports = {
  startMenu,
  weather,
};