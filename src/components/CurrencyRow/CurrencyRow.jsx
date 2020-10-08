import React from "react";
import style from './CurrencyRow.module.css';

const CurrencyRow = (props) => {
    return (
        <div className={style.currencyRow__container}>
            <input className={style.currencyRow__input}
                   type="number"
                   value={props.amount}
                   onChange={props.changeAmount}/>
            <select className={style.currencyRow__select} value={props.selectedCurrency} onChange={props.changeCurrency}>
                {props.currencyOptions.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
        </div>
    )
}

export default CurrencyRow;