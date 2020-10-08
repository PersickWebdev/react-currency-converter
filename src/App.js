import React, {useEffect, useState} from 'react';
import './App.module.css';
import style from './App.module.css';
import CurrencyRow from "./components/CurrencyRow/CurrencyRow";

const baseUrl = 'https://api.exchangeratesapi.io/latest';

const App = (props) => {
    const [currencyOptions, setCurrencyOptions] = useState([]);
    const [fromCurrency, setFromCurrency] = useState();
    const [toCurrency, setToCurrency] = useState();
    const [exchangeRate, setExchangeRate] = useState();
    const [amount, setAmount] = useState(1);
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

    let toAmount;
    let fromAmount;

    if (amountInFromCurrency) {
        fromAmount = amount;
        toAmount = amount * exchangeRate;
    } else {
        toAmount = amount;
        fromAmount = amount / exchangeRate;
    }

    useEffect(() => {
        fetch(baseUrl)
            .then(response => response.json())
            .then(data => {
                const firstCurrency = Object.keys(data.rates)[0];
                setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
                setFromCurrency(data.base);
                setToCurrency(firstCurrency);
                setExchangeRate(data.rates[firstCurrency])
            })
    }, []);

    useEffect(() => {
        if (fromCurrency != null && toCurrency != null) {
            fetch(`${baseUrl}?base=${fromCurrency}&symbols=${toCurrency}`)
                .then(response => response.json())
                .then(data => setExchangeRate(data.rates[toCurrency]))
        }
    }, [fromCurrency, toCurrency]);

    const handleFromAmountChange = (event) => {
        setAmount(event.target.value);
        setAmountInFromCurrency(true);
    }

    const handleToAmountChange = (event) => {
        setAmount(event.target.value);
        setAmountInFromCurrency(false);
    }

    return (
        <div className={style.app__container}>
            <h1>Convert</h1>
            <CurrencyRow currencyOptions={currencyOptions}
                         selectedCurrency={fromCurrency}
                         changeCurrency={(event) => setFromCurrency(event.target.value)}
                         amount={fromAmount}
                         changeAmount={handleFromAmountChange}/>
            <div>=</div>
            <CurrencyRow currencyOptions={currencyOptions}
                         selectedCurrency={toCurrency}
                         changeCurrency={(event) => setToCurrency(event.target.value)}
                         amount={toAmount}
                         changeAmount={handleToAmountChange}/>
        </div>
    );
}

export default App;
