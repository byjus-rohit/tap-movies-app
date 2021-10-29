import { Container, Spinner } from "react-bootstrap";

function Loader() {
    return (
        <Container className="d-flex justify-content-center mt-3">
            <Spinner animation="border" />
        </Container>
    )
}

export default Loader;