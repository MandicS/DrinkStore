import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import classes from './DrinkStore.css'
import Store from '../../components/Store/Store';
import BuildControls from '../../components/Store/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Store/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';

const PRODUCT_PRICE = {
    cocaCola: 0.5,
    pepsi: 0.5,
    fanta: 0.5,
    fantaShokata: 0.5,
    sup: 0.5,
    sprite: 0.5,
    evian: 0.4,
    wine: 5.5,
    heineken: 1,
    whiteWine: 6,
    roseWine: 7,
    champagne: 15.6,
}

class DrinkStore extends Component{
    state = {
        products: null,
        totalPrice: 2,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
    }

    componentDidMount () {
        axios.get('https://drinkstoreproject.firebaseio.com/products.json')
            .then(response => {
                this.setState({products: response.data})
            })
            .catch(error => {
                this.setState({error: true})
            });
    }

    updatePerchaseState (products) {
        const sum = Object.keys(products)
        .map(pKey => {
            return products[pKey]
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);
        this.setState({purchasable: sum > 0});
    }

    addProductHandler = (type) => {
        const oldCount = this.state.products[type];
        const updatedCount = oldCount + 1;
        const updatedProducts = {
            ...this.state.products
        };
        updatedProducts[type] = updatedCount;
        const priceAddition = PRODUCT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, products: updatedProducts});
        this.updatePerchaseState(updatedProducts);
    }

    removeProductHandler = (type) => {
        const oldCount = this.state.products[type];
        if (oldCount <= 0){
            return;
        }
        const updatedCount = oldCount -1;
        const updatedProducts = {
            ...this.state.products
        };
        updatedProducts[type] = updatedCount;
        const priceDeduction = PRODUCT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, products: updatedProducts});
        this.updatePerchaseState(updatedProducts);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        // alert("you continue");
        
        const queryParams = [];
        for (let i in this.state.products) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.products[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }
    render(){
        const disabledInfo = {
            ...this.state.products
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let store = this.state.error ? <p>Products can't be loaded!</p> : <Spinner />;

        if(this.state.products) {
            store = (
                <Aux>
                    <Store products={this.state.products} />
                    <BuildControls
                        productAdded={this.addProductHandler}
                        productRemoved={this.removeProductHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice} /> 
                </Aux>
            );
            orderSummary = <OrderSummary 
                products={this.state.products}
                purchaseCancelled={this.purchaseCancelHandler} 
                price={this.state.totalPrice.toFixed(2)}
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

export default withErrorHandler(DrinkStore, axios);