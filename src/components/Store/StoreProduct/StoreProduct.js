import React, { Component } from 'react';
import PropTypes from 'prop-types';

import champagne from '../../../assets/images/champagne.png';
import pepsi from '../../../assets/images/pepsi.png';
import fanta from '../../../assets/images/fanta.png';
import cocaCola from '../../../assets/images/coca-cola.png';
import sup from '../../../assets/images/7up.png';
import evian from '../../../assets/images/evian.png';
import sprite from '../../../assets/images/sprite.png';
import fantaShokata from '../../../assets/images/fanta-shokata.png';
import wine from '../../../assets/images/wine.png';
import heineken from '../../../assets/images/heineken.png';
import whiteWine from '../../../assets/images/white-wine.png';
import roseWine from '../../../assets/images/rose-wine.png';

class StoreProduct extends Component {
    render () {
        let product = null;

    switch (this.props.type){
        case ('cocaCola'):
            product = <span>
                <img src={cocaCola} alt="Coca-Cola" />
            </span>;
            break;
        case ('pepsi'):
            product = <span>
                <img src={pepsi} alt="Pepsi" />
            </span>;
            break;
        case ('fanta'):
            product = <span>
                <img src={fanta} alt="Fanta" />
            </span>;
            break;
        case ('fantaShokata'):
            product = <span>
                <img src={fantaShokata} alt="Fanta-Shokata" />
            </span>;
            break;
        case ('sup'):
            product = <span>
                <img src={sup} alt="7Up" />
            </span>;
            break;
        case ('sprite'):
            product = <span>
                <img src={sprite} alt="Sprite" />
            </span>;
            break;
        case ('evian'):
            product = <span>
                <img src={evian} alt="Evian" />
            </span>;
            break;
        case ('wine'):
            product = <span>
                <img src={wine} alt="Wine" />
            </span>;
            break;
        case ('heineken'):
            product = <span>
                <img src={heineken} alt="Heineken" />
            </span>;
            break;
        case ('whiteWine'):
            product = <span>
                <img src={whiteWine} alt="wWhite Wine" />
            </span>;
            break;
        case ('roseWine'):
            product = <span>
                <img src={roseWine} alt="Rose Wine" />
            </span>;
            break;
        case ('champagne'):
            product = <span>
                <img src={champagne} alt="Champagne" />
            </span>;
            break;
        default:
            product = null;
    }
    return product;
    }
}

StoreProduct.propTypes = {
    type: PropTypes.string.isRequired,
}

export default StoreProduct;