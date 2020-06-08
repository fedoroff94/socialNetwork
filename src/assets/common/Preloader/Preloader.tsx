import React, { FC } from 'react';
import preloader from '../../images/loading.gif';

type PropsType = {

}

let Preloader: FC<PropsType> = (props) => {
    return <div>
        <img src={preloader}/>
        </div>
}

export default Preloader;