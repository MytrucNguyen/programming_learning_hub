import { Divider, Grid2, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

export default function ProductDetails() {
    const { basket, status: basketStatus } = useAppSelector(state => state.basket);
    const { id } = useParams<{ id: string }>();
    const product = useAppSelector(state => productSelectors.selectById(state, parseInt(id!)));
    const dispatch = useAppDispatch();
    const { status: productStatus } = useAppSelector(state => state.catalog);
    const [quantity, setQuantity] = useState(0);

    const item = basket?.items.find(i => i.productId === product?.id);

    const productDetails = [
        { label: 'Name', value: product.name },
        { label: 'Description', value: product.description },
        { label: 'Type', value: product.type },
        { label: 'Brand', value: product.brand },
        { label: 'Quantity in stock', value: product.quantityInStock },
    ]

    useEffect(() => {
        if (item) setQuantity(item.quantity);
        if (!product) dispatch(fetchProductAsync(parseInt(id!)))
    }, [dispatch, id, item, product])

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = parseInt(event.target.value)

        if (value >= 0) {
            setQuantity(value);
        }
    }

    function handleUpdateCart() {
        if (!product) {
            console.error("Product is undefined or null.");
            return;
        }

        const itemExistsInCart = !!item;
        const isIncreasingQuantity = !item || quantity > item.quantity;

        if (isIncreasingQuantity) {
            const updatedQuantity = itemExistsInCart ? quantity - item.quantity : quantity;
            dispatch(addBasketItemAsync({ productId: product.id, quantity: updatedQuantity }))
        } else {
            const updatedQuantity = item.quantity - quantity;
            dispatch(removeBasketItemAsync({ productId: product.id, quantity: updatedQuantity }))
        }
    }

    if (productStatus === 'pending') return <LoadingComponent message="Loading product" />

    if (!product) return <NotFound />

    return (
        <Grid2 container spacing={6} maxWidth='lg' sx={{ mx: 'auto' }}>
            <Grid2 size={6}>
                <img src={product.pictureUrl} alt={product.name} style={{ width: '100%' }} />
            </Grid2>
            <Grid2 size={6}>
                <Typography variant="h3">{product.name}</Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="h4" color="secondary">${(product.price / 100).toFixed(2)}</Typography>
                <TableContainer>
                    <Table sx={{ '& td': { fontSize: '1rem' } }}>
                        <TableBody>
                            {productDetails.map((detail, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ fontWeight: 'bold' }}>{detail.label}</TableCell>
                                    <TableCell >{detail.value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid2 container spacing={2}>
                    <Grid2 size={6}>
                        <TextField
                            onChange={handleInputChange}
                            variant="outlined"
                            type="number"
                            label="Quantity in Cart"
                            fullWidth
                            value={quantity}
                        />
                    </Grid2>
                    <Grid2 size={6}>
                        <LoadingButton
                            disabled={item?.quantity === quantity || (!item && quantity === 0)}
                            loading={basketStatus.includes('pending')}
                            onClick={handleUpdateCart}
                            sx={{ height: '55px' }}
                            color='primary'
                            size="large"
                            variant="contained"
                            fullWidth
                        >
                            {item ? 'Update Quantity' : 'Add to Cart'}
                        </LoadingButton>
                    </Grid2>
                </Grid2>
            </Grid2>
        </Grid2>
    )
}
