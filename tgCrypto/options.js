const addToFavorite = {
    reply_markup: {
        keyboard: [["Add to favorite"]],
        resize_keyboard: true,
    },
  };
  
  const deleteFromFavorite = {
    reply_markup: {
          keyboard: [["Delete from favorite"]],
        resize_keyboard: true,
    },
  };
  
  module.exports = {
    addToFavorite,
    deleteFromFavorite,
  };