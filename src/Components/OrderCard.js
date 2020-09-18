import React from 'react';

const OrderCard = ({order}) => {
    const displayToppings = () => {
        const toppings = Object.keys(order.toppings);

        const orderedToppings = []

        toppings.forEach(key => {
            if (order.toppings[key]) {
                orderedToppings.push(key);
            }
        })

    return orderedToppings;
    }

    return (
        <div>
            <h2>{order.name}</h2>
            <h3>{order.phone}</h3>
            {displayToppings().map((toppings, i) => <p key={i}>(toppings)</p>)}
            <p>{order.specialInstructions}</p>
        </div>
    );
}

export default OrderCard;