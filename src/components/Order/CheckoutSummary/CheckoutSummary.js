import React from 'react'

import Store from '../../Store/Store';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>This is your orders</h1>
            <div style={{width: '100%', margin:'auto'}}>
                <Store products={props.products}/>
            </div>
            <Button 
            btnType="Danger"
            clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button 
            btnType="Success"
            clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    );
}

export default checkoutSummary;