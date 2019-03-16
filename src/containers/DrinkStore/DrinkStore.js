import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary';
import classes from './DrinkStore.css'
import Store from '../../components/Store/Store';
import BuildControls from '../../components/Store/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Store/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';
import * as actionTypes from '../../store/actions';

class DrinkStore extends Component{
    state = {
        purchasing: false,
        loading: false,
        error: false,
    }

    componentDidMount () {
        // axios.get('https://drinkstoreproject.firebaseio.com/products.json')
        //     .then(response => {
        //         this.setState({products: response.data})
        //     })
        //     .catch(error => {
        //         this.setState({error: true})
        //     });
    }

    updatePerchaseState (products) {
        const sum = Object.keys(products)
        .map(pKey => {
            return products[pKey]
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum > 0;
    }

    // addProductHandler = (type) => {
    //     const oldCount = this.props.prods[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedProducts = {
    //         ...this.props.prods
    //     };
    //     updatedProducts[type] = updatedCount;
    //     const priceAddition = PRODUCT_PRICE[type];
    //     const oldPrice = this.props.price;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({totalPrice: newPrice, products: updatedProducts});
    //     this.updatePerchaseState(updatedProducts);
    // }

    // removeProductHandler = (type) => {
    //     const oldCount = this.props.prods[type];
    //     if (oldCount <= 0){
    //         return;
    //     }
    //     const updatedCount = oldCount -1;
    //     const updatedProducts = {
    //         ...this.props.prods
    //     };
    //     updatedProducts[type] = updatedCount;
    //     const priceDeduction = PRODUCT_PRICE[type];
    //     const oldPrice = this.props.price;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({totalPrice: newPrice, products: updatedProducts});
    //     this.updatePerchaseState(updatedProducts);
    // }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {        
        // const queryParams = [];
        // for (let i in this.props.prods) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.prods[i]));
        // }
        // queryParams.push('price=' + this.props.price);
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // });
        this.props.history.push('./checkout');
    }
    render(){
        const disabledInfo = {
            ...this.props.prods
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let store = this.state.error ? <p>Products can't be loaded!</p> : <Spinner />;

        if(this.props.prods) {
            store = (
                <Aux>
                    <Store products={this.props.prods} />
                    <BuildControls
                        productAdded={this.props.onProductAdded}
                        productRemoved={this.props.onProductRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePerchaseState(this.props.prods)}
                        ordered={this.purchaseHandler}
                        price={this.props.price} /> 
                </Aux>
            );
            orderSummary = <OrderSummary 
                products={this.props.prods}
                purchaseCancelled={this.purchaseCancelHandler} 
                price={this.props.price.toFixed(2)}
                purchaseContinued={this.purchaseContinueHandler} />;
        }
        if(this.state.loading) {
            orderSummary = <Spinner />;
        } 
        
        
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <div className={classes.Background}>
                {store}       
                </div>         
            </Aux>
        );
    }

}

const mapStateToProps = state => {
    return {
        prods: state.products,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onProductAdded: (prodName) => dispatch({type: actionTypes.ADD_PRODUCT, productName: prodName}),
        onProductRemoved: (prodName) => dispatch({type: actionTypes.REMOVE_PRODUCT, productName: prodName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(DrinkStore, axios));