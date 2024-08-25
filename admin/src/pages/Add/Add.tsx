import React, { useState, useEffect } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";

interface DataTypes {
  name: string;
  description: string;
  category: string;
  price: number;
}

interface AddProps {
  url: string;
}

const defaultData: DataTypes = {
  name: "",
  description: "",
  category: "",
  price: 0,
};

const Add: React.FC<AddProps> = ({url}) => {
  const [image, setImage] = useState<File | null>(null);

  const [data, setData] = useState<DataTypes>(defaultData);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const onChangeHandler = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", data.price.toString());
    formData.append("image", image as Blob);

    try {
      await axios.post(`${url}/api/foods`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setData(defaultData);
      setImage(null);
      toast.success("Product Added Successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to add product. Please try again.");
    }
  };

  useEffect(() => {
    // Cleanup image preview URL
    return () => {
      if (image) {
        URL.revokeObjectURL(URL.createObjectURL(image));
      }
    };
  }, [image]);

  return (
    <div className="add">
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt={image ? "Selected product image" : "Upload Area"}
            />
          </label>
          <input
            type="file"
            id="image"
            hidden
            required
            onChange={handleImageChange}
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type Here"
            required
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows={6}
            placeholder="Write Content Here"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Category</p>
            <select
              onChange={onChangeHandler}
              value={data.category}
              name="category"
              required
            >
              <option value="">Select a Category</option>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwitch">Sandwitch</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="$20"
              min="0"
              required
            />
          </div>
        </div>
        <button type="submit" className="add-button">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
