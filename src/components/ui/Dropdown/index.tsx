import {FC} from 'react';
import {FormControl, MenuItem, Select} from "@mui/material";

interface Props {
    currenciesList: string[];
    currentCurrency: string;
    onChange: (currency: string) => void;
}

const Dropdown:FC<Props> = ({currenciesList, currentCurrency, onChange}) => {
    return (
        <FormControl
            sx={{maxWidth: 150, width: "100%"}}
        >
            <Select
                value={currentCurrency}
                onChange={(e) => onChange(e.target.value)}
                variant={"outlined"}
                MenuProps={{
                    PaperProps: {
                        sx: {
                            maxHeight: 200,
                            overflow: 'auto',
                        },
                    },
                }}
                fullWidth
            >
                {currenciesList.map((currency) => (
                    <MenuItem key={currency} value={currency}>
                        {currency}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default Dropdown;