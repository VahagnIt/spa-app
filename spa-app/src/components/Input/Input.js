import React from 'react';
import './Input.css';

function isInvalid(touched, valid) {
   return !valid && touched;
}
const Input = (props) => {
    const inputType = props.type || 'text';
    let cls = ['form-control'];
    const htmlFor = `${inputType}-${Math.random()}`;
    if(isInvalid(props.touched, props.valid)){
        cls.push('invalid');
    }
    return (
        <div>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input
                id={htmlFor}
                type={inputType}
                className={cls.join(' ')}
                value={props.value}
                onChange={props.onChange}
            />
            {
                isInvalid(props.touched, props.valid)
                    ? <span style={{color: 'red'}}>{props.errorMessage}</span>
                    : null
            }
        </div>
    )
};

export default Input;