import { FC, useEffect, useState } from 'react';
import Input from "../ui/Input";
import Dropdown from "../ui/Dropdown";
import {Box, CircularProgress, Typography} from "@mui/material";
import useGetCurrencies from "../../hooks/useGetCurrencies.ts";

const formatNumber = (num: number): string => {
    return num.toString();
};



const ConvertForm: FC = () => {
    const [convertFromValue, setConvertFromValue] = useState<string>("");
    const [convertFromCurrency, setConvertFromCurrency] = useState<string>("UAH");
    const [convertToValue, setConvertToValue] = useState<string>("");
    const [convertToCurrency, setConvertToCurrency] = useState<string>("USD");
    const [lastUpdatedField, setLastUpdatedField] = useState<'from' | 'to'>('from');
    const { currencyListLoading, currencies, error, conversionRates } = useGetCurrencies(convertFromCurrency);

    const convertCurrency = (value: string, fromCurrency: string, toCurrency: string) => {
        const numericValue = parseFloat(value);
        if (isNaN(numericValue)) return "";

        const baseAmount = numericValue / conversionRates[fromCurrency];
        const convertedAmount = baseAmount * conversionRates[toCurrency];
        return formatNumber(Number(convertedAmount.toFixed(2)));
    };

    useEffect(() => {
        if (!conversionRates[convertToCurrency] || !conversionRates[convertFromCurrency]) return;

        if (lastUpdatedField === 'from' && convertFromValue !== '' && convertFromValue !== '.') {
            setConvertToValue(convertCurrency(convertFromValue, convertFromCurrency, convertToCurrency));
        } else if (lastUpdatedField === 'to' && convertToValue !== '' && convertToValue !== '.') {
            setConvertFromValue(convertCurrency(convertToValue, convertToCurrency, convertFromCurrency));
        }
    }, [convertFromValue, convertToValue, convertFromCurrency, convertToCurrency, conversionRates, lastUpdatedField]);

    const handleConvertFromValueChange = (value: string | number) => {
        if (value === "") {
            setConvertFromValue("");
            setConvertToValue("");
        } else {
            setConvertFromValue(value.toString());
        }
        setLastUpdatedField('from');
    };

    const handleConvertToValueChange = (value: string | number) => {
        if (value === "") {
            setConvertFromValue("");
            setConvertToValue("");
        } else {
            setConvertToValue(value.toString());
        }
        setLastUpdatedField('to');
    };

    const handleConvertFromCurrencyChange = (currency: string) => {
        setConvertFromCurrency(currency);
        setLastUpdatedField("from")
    };

    const handleConvertToCurrencyChange = (currency: string) => {
        setConvertToCurrency(currency);
        setLastUpdatedField("from")
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {error && <Typography variant="body2" color="error">{error}</Typography>}
                <Box sx={{ display: "flex", gap: 4, width: 600 }}>
                    <Input value={convertFromValue} onChange={handleConvertFromValueChange} placeholder="Enter amount" />
                    {
                        currencyListLoading ?
                        <CircularProgress size={24} sx={{marginTop: 2}}/> :
                        <Dropdown currenciesList={currencies} currentCurrency={convertFromCurrency} onChange={handleConvertFromCurrencyChange}/>
                    }
                </Box>
                <Box sx={{ display: "flex", gap: 4, width: 600 }}>
                    <Input value={convertToValue} onChange={handleConvertToValueChange} placeholder="Converted amount" />
                    {
                        currencyListLoading ?
                            <CircularProgress size={24} sx={{marginTop: 2}}/> :
                            <Dropdown currenciesList={currencies} currentCurrency={convertToCurrency} onChange={handleConvertToCurrencyChange} />
                    }
                </Box>
        </Box>
    );
}

export default ConvertForm;
