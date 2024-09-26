import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <Container component={Paper} sx={{ height: 400 }}>
            <Typography variant="h3" gutterBottom>
                Opps - we could not find what you are looking for
            </Typography>
            <Divider />
            <Button fullWidth component={Link} to='/catalog'>Go back to shop</Button>
        </Container>
    )
}