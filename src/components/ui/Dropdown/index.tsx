import {FC} from 'react';
import { MenuItem, Select} from "@mui/material";

interface Props {
    currenciesList: string[];
    currentCurrency: string;
    onChange: (currency: string) => void;
}

const Dropdown:FC<Props> = ({currenciesList, currentCurrency, onChange}) => {
    return (
            <Select
                value={currentCurrency}
                onChange={(e) => onChange(e.target.value)}
                variant={"outlined"}
                sx={{maxHeight: 200}}
                fullWidth
            >
                {currenciesList.map((currency) => (
                    <MenuItem key={currency} value={currency}>
                        {currency}
                    </MenuItem>
                ))}
            </Select>
    );
};

export default Dropdown;