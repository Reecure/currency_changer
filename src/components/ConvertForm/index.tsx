import { FC, useEffect, useState } from 'react';
import Input from "../ui/Input";
import Dropdown from "../ui/Dropdown";
import { Box, CircularProgress } from "@mui/material";
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

    useEffect(() => {
        if (!conversionRates[convertToCurrency] || !conversionRates[convertFromCurrency]) return;

        if (lastUpdatedField === 'from' && convertFromValue !== '' && convertFromValue !== '.') {
            const numericValue = parseFloat(convertFromValue);
            if (isNaN(numericValue)) return;

            const baseAmount = numericValue / conversionRates[convertFromCurrency];
            const convertedAmount = baseAmount * conversionRates[convertToCurrency];

            const roundedAmount = Number(convertedAmount.toFixed(2));
            setConvertToValue(formatNumber(roundedAmount));

        } else if (lastUpdatedField === 'to' && convertToValue !== '' && convertToValue !== '.') {
            const numericValue = parseFloat(convertToValue);
            if (isNaN(numericValue)) return;

            const baseAmount = numericValue / conversionRates[convertToCurrency];
            const convertedAmount = baseAmount * conversionRates[convertFromCurrency];

            const roundedAmount = Number(convertedAmount.toFixed(2));
            setConvertFromValue(formatNumber(roundedAmount));
        }
    }, [convertFromValue, convertToValue, convertFromCurrency, convertToCurrency, conversionRates, lastUpdatedField]);

    const handleConvertFromValueChange = (value: string | number) => {
        if (value === "") {
            setConvertFromValue("");
            setConvertToValue("");
        } else {
            setLastUpdatedField('from');
            setConvertFromValue(value.toString());
        }
    };

    const handleConvertToValueChange = (value: string | number) => {
        if (value === "") {
            setConvertFromValue("");
            setConvertToValue("");
        } else {
            setLastUpdatedField('to');
            setConvertToValue(value.toString());
        }
    };

    const handleConvertFromCurrencyChange = (currency: string) => {
        setConvertFromCurrency(currency);

        if (lastUpdatedField === 'to' && convertToValue) {
            setLastUpdatedField('to');
        }
    };

    const handleConvertToCurrencyChange = (currency: string) => {
        setConvertToCurrency(currency);
        if (lastUpdatedField === 'to' && convertToValue) {
            setLastUpdatedField('to');
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
                <Box sx={{ display: "flex", gap: 4, width: 600 }}>
                    <Input value={convertFromValue} onChange={handleConvertFromValueChange} placeholder="Enter amount" />
                    {
                        currencyListLoading ?
                        <CircularProgress size={24}/> :
                        <Dropdown currenciesList={currencies} currentCurrency={convertFromCurrency} onChange={handleConvertFromCurrencyChange}/>
                    }
                </Box>
                <Box sx={{ display: "flex", gap: 4, width: 600 }}>
                    <Input value={convertToValue} onChange={handleConvertToValueChange} placeholder="Converted amount" />
                    {
                        currencyListLoading ?
                            <CircularProgress size={24}/> :
                            <Dropdown currenciesList={currencies} currentCurrency={convertToCurrency} onChange={handleConvertToCurrencyChange} />
                    }
                </Box>
        </Box>
    );
}

export default ConvertForm;
