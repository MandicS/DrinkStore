import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Champagne', type: 'champagne' },
    { label: 'Coca-Cola', type: 'cocaCola' },
    { label: 'Evian', type: 'evian' },
    { label: 'Fanta', type: 'fanta' },
    { label: 'Fanta-Shokata', type: 'fantaShokata' },
    { label: 'Heineken', type: 'heineken' },
    { label: 'Pepsi', type: 'pepsi' },
    { label: 'Rose Wine', type: 'roseWine' },
    { label: 'Sprite', type: 'sprite' },
    { label: '7Up', type: 'sup' },
    { label: 'White Wine', type: 'whiteWine' },
    { label: 'Wine', type: 'wine' },
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
    <div className={classes.CenterWrap}>
    <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
    </div>
        {controls.map(ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added={() => props.productAdded(ctrl.type) }
                removed={() => props.productRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]} />
        ))}
        <div className={classes.CenterWrap}>
        <button 
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}>ORDER NOW</button>
        </div>
    </div>
);

export default buildControls;