import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Product } from "../../app/models/product"

interface CatalogProps {
    products: Product[];
    addProduct: () => void;
}

export default function Catalog({ products, addProduct }: CatalogProps) {

    return (
        <>
            <List>
                {products.map((product =>
                    <ListItem key={product.id}>
                        <ListItemAvatar>
                            <Avatar src={product.pictureUrl} />
                        </ListItemAvatar>
                        <ListItemText> {product.name} - ${product.price}</ListItemText>
                    </ListItem>
                ))}
            </List>
            <Button variant='contained' onClick={addProduct}>Add Product</Button>
        </>
    )
}