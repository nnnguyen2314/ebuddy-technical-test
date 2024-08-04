import {SelectingOption} from "@modules/shared/features/formControls/types/SelectingOption";

export interface FormInputProps {
    name: string;
    control: any;
    label: string;
    setValue?: any;
    type?: string;
    options?: SelectingOption[];
    rules?: any;
    errors?: any;
}