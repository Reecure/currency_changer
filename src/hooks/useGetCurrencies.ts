import { useEffect, useState } from "react";
import axios from "axios";
import { ApiResponse } from "../types/apiResponse.ts";

interface UseGetCurrenciesResult {
    currencies: string[];
    currencyListLoading: boolean;
    error: string | null;
    conversionRates: Record<string, number>;
}

const useGetCurrencies = (baseCurrency: string): UseGetCurrenciesResult => {
    const [currencies, setCurrencies] = useState<string[]>([]);
    const [currencyListLoading, setCurrencyListLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [conversionRates, setConversionRates] = useState<Record<string, number>>({});

    useEffect(() => {
        const fetchCurrencies = async () => {
            setCurrencyListLoading(true);
            try {
                const response = await axios.get<ApiResponse>(
                    `https://v6.exchangerate-api.com/v6/cec12839d52cd42b56fabfe5/latest/${baseCurrency}`
                );
                const rates = response.data.conversion_rates;
                setCurrencies(Object.keys(rates));
                setConversionRates(rates);
            } catch (error) {
                console.error("Error fetching currencies:", error);
                setError("Failed to fetch currencies.");
            } finally {
                setCurrencyListLoading(false);
            }
        };

        fetchCurrencies();
    }, [baseCurrency]);

    return {
        currencies,
        currencyListLoading,
        error,
        conversionRates
    };
};

export default useGetCurrencies;