import { Button } from "react-bootstrap"
import { Card, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap"
import axios from "axios"
import { useEffect, useState } from "react"

function Body() {
    const [fetchAPI, setAPI] = useState([]);
    const [searchTerm, SetSearchTerm] = useState('');
    const [searchResult, SetSearchResult] = useState([]);
    useEffect(() => {
        axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=bb5e381f440043d3acf803f0431e5c32').then((Response) => {
            setAPI(Response.data.articles);
        },[fetchAPI])
    })

    const searchData = (value) => {
        SetSearchTerm(value);

        if (searchTerm !== '') {
            const filteredData = fetchAPI.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchTerm.toLowerCase());
            })
            SetSearchResult(filteredData);
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