import { useEffect, useState } from "react";

const FoodItemList = () => {

    const [foodItems, setFoodItems] = useState();
    useEffect(() => {
        loadFoodItems();
    }, [])
    console.log(foodItems)

    const loadFoodItems = async () => {
        const restaurantData = JSON.parse(localStorage.getItem('restaurantUser'))
        let resto_id = restaurantData._id
        let response = await fetch("http://localhost:3000/api/restaurant/foods/"+resto_id);
        response = await response.json();
        if (response.success) {
            setFoodItems(response.result)
        }
        else {
            alert("food item list not loading")

        }
}

const deleteFoodItem=async(id)=>{
    let response = await fetch('http://localhost:3000/api/restaurant/foods/'+id,{
        method:'delete'
    });
    response = await response.json();
    if(response.success){
        loadFoodItems();
    }else{
        alert("food item not deleted")
    }
}

return (
    <>
        <h1>Food Items</h1>
        <table>
            <thead>
                <tr>
                    <td>S.N</td>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Description</td>
                    <td>Image</td>
                    <td>Operations</td>
                </tr>
            </thead>
            <tbody>
                {
                foodItems && foodItems.map((items,key)=>(
                <tr key={key}>
                    <td>{key+1}</td>
                    <td>{items.name}</td>
                    <td>{items.price}</td>
                    <td>{items.description}</td>
                    <td><img src={items.img_path}/></td>
                    <td><button onClick={()=>deleteFoodItem(items._id)}>Delete</button>
                    <button>Edit</button>
                    </td>
                </tr>
                ))
            }
            </tbody>
        </table>
    </>
)
}
export default FoodItemList;