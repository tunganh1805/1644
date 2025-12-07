import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoriteContext = createContext();

export const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error('useFavorite must be used within a FavoriteProvider');
  }
  return context;
};

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const getProductId = (product) => {
    if (product._id) return String(product._id);
    if (product.id) return String(product.id);
    return `${product.name || product.model || product.title || 'product'}-${Date.now()}`;
  };

  const addToFavorites = (product) => {
    setFavorites((prevFavorites) => {
      const productId = getProductId(product);
      
      const isAlreadyFavorite = prevFavorites.some((item) => {
        const itemId = getProductId(item);
        return itemId === productId;
      });

      if (isAlreadyFavorite) {
        return prevFavorites;
      }

      return [
        ...prevFavorites,
        {
          ...product,
          id: productId,
          _id: product._id || productId,
        },
      ];
    });
  };

  const removeFromFavorites = (product) => {
    const productId = getProductId(product);
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => {
        const itemId = getProductId(item);
        return itemId !== productId;
      })
    );
  };

  const toggleFavorite = (product) => {
    const productId = getProductId(product);
    const isCurrentlyFavorite = favorites.some((item) => {
      const itemId = getProductId(item);
      return itemId === productId;
    });

    if (isCurrentlyFavorite) {
      removeFromFavorites(product);
    } else {
      addToFavorites(product);
    }
  };

  const isFavorite = (product) => {
    if (!product) return false;
    const productId = getProductId(product);
    return favorites.some((item) => {
      const itemId = getProductId(item);
      return itemId === productId;
    });
  };

  const getFavoritesCount = () => {
    return favorites.length;
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    getFavoritesCount,
  };

  return <FavoriteContext.Provider value={value}>{children}</FavoriteContext.Provider>;
};

