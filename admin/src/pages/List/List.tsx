import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import toast from "react-hot-toast";

interface dataTypes {
  _id:string
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

interface ListProps {
  url: string;
}

const defaultList: dataTypes[] = [];

const List: React.FC<ListProps> = ({url}) => {
  const [list, setList] = useState<dataTypes[]>(defaultList);


  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/api/foods`);
      console.log(response.data);
      setList(response.data.data);
      console.log(list);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch data");
    }
  };

const removeFood = async (FoodId: string) => {
  try {
    const response = await axios.delete(`${url}/api/foods/${FoodId}`);
    fetchData();
    console.log("Food removed successfully", response.data);
    toast.success("Food removed successfully");
  } catch (error) {
    console.error("Error removing food:", error);
    toast.error("Failed to remove food");
  }
};


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.map((item, index) => {
          const l = item.image.length;

          const src = `${url}/images/` + item.image.slice(8, l);
          return (
            <div className="list-table-format" key={index}>
              <img src={src} alt={item.image} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={()=>removeFood(item._id)} className="cursor">X</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
