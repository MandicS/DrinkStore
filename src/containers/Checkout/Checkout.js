import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    // state = {
    //     products: null,
    //     price: 0
    // }

    // componentWillMount () {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const products = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         } else {
    //             products[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState({products: products, totalPrice: price});
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render () {
        return (
            <div>
                <CheckoutSummary 
                    products={this.props.prods}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    // render={(props) => (<ContactData products={this.props.prods} price={this.props.price} {...props} />)}
                    component={ContactData}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        prods: state.products,
        price: state.price
    }
}

export default connect(mapStateToProps)(Checkout);