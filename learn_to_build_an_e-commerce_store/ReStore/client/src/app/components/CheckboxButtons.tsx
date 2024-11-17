import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";

interface CheckboxButtonProps {
    items: string[];
    onChange: (items: string[]) => void;
    checked?: string[];

}

export default function CheckboxButtons({ items, checked, onChange }: CheckboxButtonProps) {
    const [checkedItems, setCheckedItems] = useState(checked || []);

    function handleChecked(value: string) {
        const currentIndex = checkedItems.findIndex(item => item === value);
        let newChecked: string[] = [];

        if (currentIndex === - 1) newChecked = [...checkedItems, value];
        else newChecked = checkedItems.filter(item => item !== value);

        setCheckedItems(newChecked);
        onChange(newChecked);
    }

    return (
        <FormGroup>
            {items.map(item => (
                <FormControlLabel
                    control={<Checkbox
                        checked={checkedItems.indexOf(item) !== -1}
                        onClick={() => handleChecked(item)}
                    />}
                    label={item}
                    key={item}
                />

            ))}
        </FormGroup>
    )
}