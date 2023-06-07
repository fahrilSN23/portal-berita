import { Button } from "react-bootstrap"
import { Card, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap"
import axios from "axios"
import { useEffect, useState } from "react"

function Body() {
    const [fetchAPI, setAPI] = useState([]);
    const [filterAPI, setFilterAPI] = useState([]);
    const [searchTerm, SetSearchTerm] = useState('');
    const [searchResult, SetSearchResult] = useState([]);
    useEffect(() => {
        axios.get('https://newsapi.org/v2/top-headlines?country=id&apiKey=8182a972d0904387ad12d261ea43b234').then((Response) => {
            setAPI(Response.data.articles);
        },[])
    })

    useEffect(() => {
        SetSearchResult(filterAPI);
    }, [filterAPI])

    const searchData = (value) => {
        SetSearchTerm(value);
        // console.log(value);

        if (searchTerm !== '') {
            axios.get('https://newsapi.org/v2/everything?q='+searchTerm+'&apiKey=8182a972d0904387ad12d261ea43b234').then((Response) => {
                setFilterAPI(Response.data.articles);
            })
        } else {
            SetSearchResult(fetchAPI);
        }
    }
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Search...."
                            className="mb-3"
                        >
                            <Form.Control type="text" placeholder="example" onChange={(e)=>searchData(e.target.value)} />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row>
                    {
                        searchTerm.length > 1 ? (
                            searchResult.map(item=>(
                            <Col style={{ marginBottom: '20px' }}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={item.urlToImage} />
                                <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Text>
                                    {item.description}
                                    </Card.Text>
                                    <Button href={item.url} target="_blank" variant="primary">Read More</Button>
                                </Card.Body>
                            </Card>
                            </Col>
                            ))
                        ) : (
                            fetchAPI.map(item=>(
                                <Col style={{ marginBottom: '20px' }}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={item.urlToImage} />
                                    <Card.Body>
                                        <Card.Title>{item.title}</Card.Title>
                                        <Card.Text>
                                        {item.description}
                                        </Card.Text>
                                        <Button href={item.url} target="_blank" variant="primary">Read More</Button>
                                    </Card.Body>
                                </Card>
                                </Col>
                            ))
                        )
                    }
                    
                </Row>
            </Container>
        </>
    )
}

export default Body