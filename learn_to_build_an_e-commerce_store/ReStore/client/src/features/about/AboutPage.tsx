import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import agent from "../../app/api/agent";

export default function AboutPage() {
    return (
        <Container>
            <Typography gutterBottom variant="h2">Errors for testing purposes</Typography>
            <ButtonGroup fullWidth>
                <Button variant='contained' onClick={() => agent.TestErrors.get400Error()}>Test 400 Errors</Button>
                <Button variant='contained' onClick={() => agent.TestErrors.get401Error()}>Test 401 Errors</Button>
                <Button variant='contained' onClick={() => agent.TestErrors.get404Error().catch(error => console.log(error))}>Test 404 Errors</Button>
                <Button variant='contained' onClick={() => agent.TestErrors.get500Error()}>Test 500 Errors</Button>
                <Button variant='contained' onClick={() => agent.TestErrors.getValidationError()}>Test Validation Errors</Button>
            </ButtonGroup>
        </Container>
    )
}