import React, { createContext, ReactNode, useEffect, useState } from "react";
import { food_list } from "../assets/assets"; // Assuming this is an array of FoodItem

// Define the type for individual food items
interface FoodItem {
  _id: string;
  image: string;
  name: string;
  price: number;
  description: string;
  category: string;
}

// Define the structure of the StoreContext
export interface StoreContextType {
  food_list: FoodItem[];
  cartItems: { [key: string]: number }; // Object to hold item counts
  addToCart: (itemId: string) => void; // Function to add an item to the cart
  removeFromCart: (itemId: string) => void; // Function to remove an item from the cart
}

// Default context value to ensure type safety
const defaultContextValue: StoreContextType = {
  food_list: [],
  cartItems: {},
  addToCart: () => {}, // Placeholder function
  removeFromCart: () => {}, // Placeholder function
};

// Create context with default values
export const StoreContext =
  createContext<StoreContextType>(defaultContextValue);

interface StoreContextProviderProps {
  children: ReactNode;
}

// StoreContextProvider component to provide the context to its children
const StoreContextProvider: React.FC<StoreContextProviderProps> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<{ [key: string]: number }>({});

  const addToCart = (itemId: string) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prev) => {
      const updatedCartItems = { ...prev };
      if (updatedCartItems[itemId] > 1) {
        updatedCartItems[itemId] -= 1;
      } else {
        delete updatedCartItems[itemId];
      }
      return updatedCartItems;
    });
  };

  useEffect(() => {
    console.log("Cart Items: ", cartItems);
  }
    , [cartItems]);

  const contextValue: StoreContextType = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
