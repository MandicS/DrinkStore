import React from 'react';

import classes from './Order.css';

const order = (props) => {
    const products = [];
    for (let productName in props.products) {
        products.push(
            {
                name: productName,
                amount: props.products[productName]
            }
        );
    }

    const productOutput = products.map(product => {
        return <span 
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key={product.name}>{product.name} ({product.amount}) </span>
    })

    return (
        <div className={classes.Order}>
            <p>products: {productOutput}</p>
            <p>Price: <strong>$ {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
}
export default order;