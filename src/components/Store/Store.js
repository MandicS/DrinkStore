import React from 'react';

import classes from './Store.css';
import StoreProduct from './StoreProduct/StoreProduct';

const store = (props) => {
    let transformedProducts = Object.keys(props.products)
    .map(pKey => {
        return [...Array(props.products[pKey])].map((_, i) => {
            return <StoreProduct key={pKey +i} type={pKey} />
        });
    })
    .reduce((arr, el) => {
        return arr.concat(el)
    }, []);
    if(transformedProducts.length === 0) {
        transformedProducts = <p>Please start adding products</p>
    }
    return (
        <div className={classes.Store}>
            <StoreProduct />
            {transformedProducts}
            <StoreProduct />
        </div>
    );
};

export default store;