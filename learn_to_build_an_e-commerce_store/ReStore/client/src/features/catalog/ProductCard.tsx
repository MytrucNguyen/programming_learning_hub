import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { currentFormat } from "../../app/util/util";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../basket/basketSlice";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    return (
        <Card
            elevation={3}
            sx={{ width: 280, borderRadius: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
            <CardMedia
                sx={{ height: 240, backgroundSize: 'cover', bgcolor: 'primary.light' }}
                image={product.pictureUrl}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom sx={{ textTransform: 'uppercase' }} variant="subtitle2">
                    {product.name}
                </Typography>
                <Typography gutterBottom variant="h6" sx={{ color: 'secondary.main' }}>
                    {currentFormat(product.price)}
                </Typography>
            </CardContent>
            <CardActions
                sx={{ justifyContent: 'space-between' }}
            >
                <LoadingButton
                    loading={status === ('pendingAddItem' + product.id)}
                    onClick={() => dispatch(addBasketItemAsync({ productId: product.id }))}
                    size="small">
                    Add to cart
                </LoadingButton>
                <Button
                    size="small"
                    component={Link}
                    to={`/catalog/${product.id}`}>
                    View
                </Button>
            </CardActions>
        </Card>
    )
}