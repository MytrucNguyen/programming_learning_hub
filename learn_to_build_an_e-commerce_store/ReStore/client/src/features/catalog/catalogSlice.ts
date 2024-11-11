import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";

interface FiltersPayload {
    brands: string[];
    types: string[];
}

function getErrorMessage(error: unknown): string | null {
    if (typeof error === 'object' && error !== null && 'data' in error) {
        const errorData = (error as { data: { message?: string } }).data;
        return errorData?.message || null;
    }
    return null;
}

const productsAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<Product[], void, { rejectValue: string }>(
    'catalog/fetchProductsAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.Catalog.list();
        } catch (error) {
            const errorMessage = getErrorMessage(error) || "Failed to fetch products.";
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

export const fetchProductAsync = createAsyncThunk<Product, number, { rejectValue: string }>(
    'catalog/fetchProductAsync',
    async (productId, thunkAPI) => {
        try {
            return await agent.Catalog.details(productId);
        } catch (error) {
            const errorMessage = getErrorMessage(error) || "Failed to fetch product details.";
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

export const fetchFilters = createAsyncThunk<FiltersPayload, void, { rejectValue: string }>(
    'catalog/fetchFilters',
    async (_, thunkAPI) => {
        try {
            return await agent.Catalog.fetchFilters();
        } catch (error) {
            const errorMessage = getErrorMessage(error) || "Failed to fetch filters.";
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productsAdapter.getInitialState({
        productsLoaded: false,
        filtersLoaded: false,
        status: 'idle',
        brands: [] as string[],
        types: [] as string[],
        error: null as string | null,
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingFetchProducts';
            state.error = null;
        });
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.productsLoaded = true;
            state.error = null;
        });
        builder.addCase(fetchProductsAsync.rejected, (state, action) => {
            state.status = 'idle';
            state.error = action.payload ?? "An unknown error occurred while fetching products.";
        });

        builder.addCase(fetchProductAsync.pending, (state) => {
            state.status = 'pendingFetchProduct';
            state.error = null;
        });
        builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
            state.productsLoaded = true;
            state.error = null;
        });
        builder.addCase(fetchProductAsync.rejected, (state, action) => {
            state.status = 'idle';
            state.error = action.payload ?? "An unknown error occurred while fetching product details.";
        });

        builder.addCase(fetchFilters.pending, (state) => {
            state.status = 'pendingFetchFilters';
            state.error = null;
        });
        builder.addCase(fetchFilters.fulfilled, (state, action) => {
            state.brands = action.payload.brands;
            state.types = action.payload.types;
            state.filtersLoaded = true;
            state.status = 'idle';
            state.error = null;
        });
        builder.addCase(fetchFilters.rejected, (state, action) => {
            state.status = 'idle';
            state.error = action.payload ?? "An unknown error occurred while fetching filters.";
        });
    },
});

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog);
