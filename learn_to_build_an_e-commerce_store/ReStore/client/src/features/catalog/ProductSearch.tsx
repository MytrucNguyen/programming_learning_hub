import { debounce, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setProductParams } from "./catalogSlice";
import { useState } from "react";

export default function ProductSearch() {
    const { productParams } = useAppSelector(state => state.catalog);
    const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
    const dispatch = useAppDispatch();

    const debouncedSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setProductParams({ searchTerm: event?.target.value }))
    }, 1000)

    return (
        <TextField
            label='Search Product'
            variant="outlined"
            fullWidth
            value={searchTerm || ''}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setSearchTerm(event.target.value)
                debouncedSearch(event)
            }}
        />
    )
}