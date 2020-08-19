import React from 'react';

import s from './validation.module.css';


const Area = ({input,meta, ...props}) =>{

    
  //  let Err = meta.error || (meta.visited && !input.value) ? <p>Required</p> : null

    return (
        <div>
            <textarea cols="50" rows="5" {...input} {...props}   className = {meta.error ? s.err : ''}></textarea>
            { meta.error? <p>Put less symbols</p> : null   }
           
        </div>
    )
}
 export default Area;