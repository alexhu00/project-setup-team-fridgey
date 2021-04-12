import React from "react";
import "./AddIngredientBox.css";
import axios from "axios"
import { useState,useEffect } from "react";
import ShoppingList from"../ShoppingList/ShoppingList"
import AddNewFridgeItemModal from "../ShoppingList/AddNewFridgeItemModal"
const AddIngredientBox = (props) => {

const fridgeData = require("../data/mock_recipes.json");
const itemList=[]
for (let i=0;i<fridgeData.length;i++){
  for (let j=0;j<fridgeData[i].length;j++){
    itemList.push(fridgeData[i][j].title)
  }
}

const apiCall = async () => {
  let b = await axios.get("/shopData");
  // console.log(b.data);
  setShopData(b.data);
};
useEffect(() => {
  apiCall();
}, []);

const onAddToShoppingList = async (name, amount, typeFood) => {
  var itemId = shopData[typeFood][1].length;
  

  const obj = {
    "id": itemId + 1,
    "title": props.name,
    "amount": amount,
    "type": typeFood,
    "dateadded": { $date: { $numberLong: 161448318100 } },
  }

  await axios.post("/shopData/addToShoppingList", obj).then((res) => {
    setShowAddFridgeItemModal(false)
    setShopData(res.data)
  })
};
const [shopData, setShopData] = useState([]);
const [showAddFridgeItemModal, setShowAddFridgeItemModal] = useState(false);
const [addButton, setAddButton] = useState("+");
// const itemList=myItems.map((myItems)=>{return myItems.title})
if (itemList.includes(props.name)){
  return (
    <div>
    <div class="box">
      <p class="text"> <span class="haveIt">{props.name}</span> </p>
      <button class="ingredientButton" onClick={() => {
       
    //    axios.post("/addIngredientToSL", {"name":
    //      props.name
    //  })
    //    .then(res => {
    //      console.log(res);
    //    });
    //    setAddButton("\u2713"); 
       setShowAddFridgeItemModal(true)}}>         {addButton}     </button>
     </div>
     <AddNewFridgeItemModal
     onClose={() => setShowAddFridgeItemModal(false)}
     show={showAddFridgeItemModal}
     fromRecipe={true}
     recipeName={props.name}
     parentCallback={onAddToShoppingList}
     onAddToShoppingList={onAddToShoppingList}
   />
    </div>
  );
  
}
else {
  return (
    <div>
    <div class="box">
      <p class="text"><span style={{color:"red"}}>{props.name}</span> </p>
      
      <button class="ingredientButton" onClick={() => {
       
    //   axios.post("/addIngredientToSL", {"name":
    //     props.name
    // })
    //   .then(res => {
    //     console.log(res);
    //   });
      //setAddButton("\u2713"); 
      setShowAddFridgeItemModal(true)}}>         {addButton}     </button>
    </div>
    <AddNewFridgeItemModal
    onClose={() => setShowAddFridgeItemModal(false)}
    show={showAddFridgeItemModal}
    fromRecipe={true}
     recipeName={props.name}
     parentCallback={onAddToShoppingList}
     onAddToShoppingList={onAddToShoppingList}
  />
</div>
  )
}}

export default AddIngredientBox
