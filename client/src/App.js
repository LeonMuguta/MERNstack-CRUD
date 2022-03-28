import { useState, useEffect } from "react";
import './App.css';
import Axios from "axios";

function App() {

  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [foodList, setFoodList] = useState([]);
  const [newFoodName, setNewFoodName] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:8000/read").then((response) => {
      setFoodList(response.data);
    })
  }, []);

  const addToList = () => {
    Axios.post("http://localhost:8000/insert", {
      nameOfFood: foodName, 
      quantityWeekly: quantity
    });
  }

  const updateFood = (id) => {
    Axios.put("http://localhost:8000/update", {
      id: id,
      nameOfUpdatedFood: newFoodName
    });
  }

  const deleteFood = (id) => {
    Axios.delete("http://localhost:8000/delete/" + id);
  }

  return (
    <div className="App">
      <h1>MERN - CRUD Application</h1>

      <label htmlFor="nameOfFood">Food Name:</label><br />
      <input type="text" className="foodTitle" name="nameOfFood" onChange={(e) => setFoodName(e.target.value)}/><br /><br />
      <label htmlFor="quantityWeekly">Weekly Consumption:</label><br />
      <input type="number" className="quantity" name="quantityWeekly" onChange={(e) => setQuantity(e.target.value)}/><br /><br />
      <button onClick={ addToList }>Add to List</button>
      <hr />

      <h1>Food List</h1>

      { foodList.map((value, key) => {
        return (
          <div key={ key } className="foodData">
            <h2>Fruit: { value.foodName } </h2>
            <p>Weekly Consumption: { value.quantity } </p>
            <input type="text" name="" placeholder="Update food name: " onChange={(e) => setNewFoodName(e.target.value)}/>
            <button onClick={ () => updateFood(value._id) }>Update</button>
            <button onClick={ () => deleteFood(value._id) }>Delete</button>
          </div>
        )
      }) }

    </div>
  );
}

export default App;
