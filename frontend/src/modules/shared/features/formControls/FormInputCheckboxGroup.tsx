import React, { useEffect, useState } from 'react';
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { FormInputProps } from './types/FormInputProps';
const FormInputCheckboxGroup: React.FC<FormInputProps> = ({name,
                                                              control,
                                                              setValue,
                                                              label,
                                                              options = []}) => {
    const [selectedItems, setSelectedItems] = useState<any>([]);
    const handleSelect = (value: any) => {
        const isPresent = selectedItems.indexOf(value);
        if (isPresent !== -1) {
            const remaining = selectedItems.filter((item: any) => item !== value);
            setSelectedItems(remaining);
        } else {
            setSelectedItems((prevItems: any) => [...prevItems, value]);
        }
    };

    useEffect(() => {
        setValue(name, selectedItems);
    }, [name, selectedItems, setValue]);
    return (
        <FormControl size={"small"} variant={"outlined"}>
            <FormLabel component="legend">{label}</FormLabel>
            <div>
                {options.map((option: any) => {
                    return (
                        <FormControlLabel
                            control={
                                <Controller
                                    name={name}
                                    render={({ field }) => {
                                        return (
                                            <Checkbox
                                                checked={selectedItems.includes(option.value)}
                                                onChange={() => handleSelect(option.value)}
                                            />
                                        );
                                    }}
                                    control={control}
                                />
                            }
                            label={option.label}
                            key={option.value}
                        />
                    );
                })}
            </div>
        </FormControl>
    );
};

export default FormInputCheckboxGroup;