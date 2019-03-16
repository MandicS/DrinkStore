import React, {Component} from 'react';

import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';
import classes from './OrderSummary.css';

class OrderSummary extends Component {
    render () {
        const productSummary = Object.keys(this.props.products)
    .map(igKey => {
        return (
        <li key={igKey}>
            <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.products[igKey]}
        </li>);
    })

        return (
            <Aux>
                <div className={classes.OrderSummary}>
                    <h3>Your Order</h3>
                    <ul>
                        {productSummary}
                    </ul>
                    <p><strong>Total Price: {this.props.price}</strong></p>
                    <p>Continue to Checkout?</p>
                    <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                    <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
                </div>
            </Aux>
        );
    }
}

export default OrderSummary;