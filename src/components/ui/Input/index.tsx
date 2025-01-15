import {ChangeEvent, FC} from 'react';
import {TextField} from "@mui/material";

interface Props {
    value: string | number;
    onChange: (value: string | number) => void;
    placeholder?: string;
    disabled?: boolean;
};

const Input:FC<Props> = ({onChange, placeholder, value, disabled = false}) => {

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;

        onChange(isNaN(Number(inputValue)) ? inputValue : Number(inputValue));
    };

    return (
        <TextField
            value={value}
            placeholder={placeholder || ''}
            onChange={handleChange}
            variant="outlined"
            disabled={disabled}
            fullWidth
        />
    );
}

export default Input;