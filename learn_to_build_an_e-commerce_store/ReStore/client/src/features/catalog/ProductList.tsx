import { Box } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";
import { useAppSelector } from "../../app/store/configureStore";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface ProductListProps {
    products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
    const { productsLoaded } = useAppSelector(state => state.catalog);
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap', gap: 3,
                justifyContent: 'center'
            }}>
            {products.map(product => (
                <Box key={product.id}>
                    {!productsLoaded ? (
                        <ProductCardSkeleton />
                    ) : (
                        <ProductCard product={product} />
                    )}
                </Box>
            ))}
        </Box>
    )
}