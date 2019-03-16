import * as actionTypes from './actions';

const PRODUCT_PRICES = {
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

const initialState = {
    products: {
        cocaCola: 0,
        pepsi: 0,
        fanta: 0,
        fantaShokata: 0,
        sup: 0,
        sprite: 0,
        evian: 0,
        wine: 0,
        heineken: 0,
        whiteWine: 0,
        roseWine: 0,
        champagne: 0,
    },
    totalPrice: 2
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PRODUCT:
            return {
                ...state,
                products: {
                    ...state.products,
                    [action.productName]: state.products[action.productName] + 1
                },
                totalPrice: state.totalPrice + PRODUCT_PRICES[action.productName]
            };
        case actionTypes.REMOVE_PRODUCT:
            return {
                ...state,
                products: {
                    ...state.products,
                    [action.productName]: state.products[action.productName] - 1
                },
                totalPrice: state.totalPrice - PRODUCT_PRICES[action.productName]
            };
        default:
            return state;
    }
};

export default reducer;