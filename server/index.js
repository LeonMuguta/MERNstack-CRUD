const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/food', {useNewUrlParser: true, useUnifiedTopology: true});

const foodSchema = new mongoose.Schema({
    foodName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const Food = mongoose.model("Food", foodSchema);

app.post("/insert", (req, res) => {

    const food = req.body.nameOfFood;
    const days = req.body.quantityWeekly;

    const foods = new Food({
        foodName: food,
        quantity: days
    });

    foods.save();

    res.send("<h1>Hello World!</h1>");
});

app.get("/read", (req, res) => {
    Food.find({}, (err, result) => {
        if (err) {
            res.send("<h1>ERROR!</h1>");
        } else {
            res.send(result);
        }
    });
});

app.put("/update", async (req, res) => {

    const newFoodName = req.body.nameOfUpdatedFood;
    const id = req.body.id;

    await Food.findById(id, (err, updatedFood) => {
        if (err) {
            res.send("Error!!");
        } else {
            updatedFood.foodName = newFoodName;
            updatedFood.save();
            res.send("Error!!");
        }
    })

});

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;

    await Food.findByIdAndRemove(id).exec();

    res.send("Deleted")
});

app.listen(8000, () => {
    console.log("Server running on port 8000");
});