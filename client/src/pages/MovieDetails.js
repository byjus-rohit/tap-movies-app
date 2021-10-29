import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Alert, Card, Container, ListGroup, ListGroupItem } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import Loader from '../components/Loader';

const MovieDetails = () => {
    const { movieId } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [details, setDetails] = useState({});

    useEffect(() => {
        fetchMovieDetails();
    }, [])

    const fetchMovieDetails = async () => {
        try {
            setLoading(true);
            const response = await axios({
                method: 'get',
                url: `http://localhost:4000/api/movies/${movieId}`
            });
            setLoading(false);
            setDetails(response.data.movie);
        }
        catch (e) {
            setError(e.message);
        }
    }

    return (
        <Container className="d-flex justify-content-center">
            <Card style={{ width: '30rem' }} >
                {error && <Alert variant='danger'>{error}</Alert>}
                {loading ?
                    <Loader />
                    :
                    <>
                        <Card.Header><h1>{details.title}</h1></Card.Header>
                        <Card.Body>
                            <Card.Img variant="top" src={details.poster} />
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>Rating: {details.rating}</ListGroupItem>
                            <ListGroupItem>Created At: {moment(details.createdAt).format('DD-MMM-YYYY')}</ListGroupItem>
                            <ListGroupItem>Updated At: {moment(details.updatedAt).format('DD-MMM-YYYY')}</ListGroupItem>
                        </ListGroup>
                    </>
                }
            </Card>
        </Container>
    )
}

export default MovieDetails;