import {FC, useEffect, useState} from 'react';
import Input from "../ui/Input";
import Dropdown from "../ui/Dropdown";
import {Box, CircularProgress} from "@mui/material";
import useGetCurrencies from "../../hooks/useGetCurrencies.ts";

const ConvertForm:FC = () => {
    const [convertFromValue, setConvertFromValue] = useState<number>(0);
    const [convertFromCurrency, setConvertFromCurrency] = useState<string>("UAH");
    const [convertToValue, setConvertToValue] = useState<number>(0);
    const [convertToCurrency, setConvertToCurrency] = useState<string>("USD");
    const { currencyListLoading, currencies, error, conversionRates  } = useGetCurrencies(convertFromCurrency);

    useEffect(() => {
        if (conversionRates[convertToCurrency] && conversionRates[convertFromCurrency]) {
            const baseAmount = convertFromValue / conversionRates[convertFromCurrency];
            const convertedAmount = baseAmount * conversionRates[convertToCurrency];
            setConvertToValue(convertedAmount);
        }
    }, [convertFromValue, convertFromCurrency, convertToCurrency, conversionRates]);

    const handleConvertFromValueChange = (value: string | number) => {
        if (!isNaN(Number(value))) {
            setConvertFromValue(Number(value));
        }
    };

    const handleConvertFromCurrencyChange = (currency: string) => {
        setConvertFromCurrency(currency);
        setConvertToValue(0);
    };

    const handleConvertToCurrencyChange = (currency: string) => {
        setConvertToCurrency(currency);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {
                currencyListLoading ? <CircularProgress size={24} /> : <>
                    <Box sx={{ display: "flex", gap: 4, width: 600 }}>
                        <Input value={convertFromValue} onChange={handleConvertFromValueChange} placeholder="Enter amount" />
                        <Dropdown currenciesList={currencies} currentCurrency={convertFromCurrency} onChange={handleConvertFromCurrencyChange} />
                    </Box>
                    <Box sx={{ display: "flex", gap: 4, width: 600 }}>
                        <Input value={convertToValue} onChange={() => {}} placeholder="Converted amount" disabled />
                        <Dropdown currenciesList={currencies} currentCurrency={convertToCurrency} onChange={handleConvertToCurrencyChange} />
                    </Box>
                </>
            }
        </Box>
    );
}

export default ConvertForm;