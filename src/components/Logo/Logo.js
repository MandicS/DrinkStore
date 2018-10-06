import React from 'react';

import storeLogo from '../../assets/images/store-logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={storeLogo} alt="MyStore" />
    </div>
);

export default logo;