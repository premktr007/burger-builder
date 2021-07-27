import React from 'react';

import classes from './Input.css';

const input = (props) => {
    let inputElement = null;

    switch(props.type) {
        case 'input':
            inputElement = <input {...props.options} 
                            className={classes.InputElement} 
                            onChange={props.changed}/>
            break;
            case 'text':
                inputElement = <textarea {...props.options} 
                                className={classes.InputElement}
                                onChange={props.changed}/>
                break;
            case 'select':
                inputElement = (
                    <select {...props.options} 
                        className={classes.InputElement} 
                        onChange={props.changed}>
                        <option value="normal">Normal</option>
                        <option value="fast">Fastest</option>
                    </select>
                )
                break;
            default:
                inputElement = <input {...props.options} className={classes.InputElement}/>
        }
    
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input;
