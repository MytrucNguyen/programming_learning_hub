import { TextField } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";

interface AppTextInputProps extends UseControllerProps {
    label: string;
}

export default function AppTextInput(props: AppTextInputProps) {
    const { fieldState, field } = useController({ ...props, defaultValue: '' })

    return (
        <TextField
            {...props}
            {...field}
            fullWidth
            variant="outlined"
            error={!!fieldState}
            helperText={fieldState.error?.message}
        />
    )
}