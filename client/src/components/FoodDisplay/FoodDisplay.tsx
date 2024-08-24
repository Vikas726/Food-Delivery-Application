import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext, StoreContextType } from "../../context/StoreContext"; // Import both context and its type if needed
import FoodItem from "../FoodItem/FoodItem";

interface FoodDisplayProps {
  category: string;
}

const FoodDisplay: React.FC<FoodDisplayProps> = ({ category }) => {
  // Correctly consume the context using useContext
  const { food_list } = useContext<StoreContextType>(StoreContext);
  return (
    <div className="food-display" id="food-display">
      <h2>Top Dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                price={item.price}
                description={item.description}
                image={item.image}
                category={item.category}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
