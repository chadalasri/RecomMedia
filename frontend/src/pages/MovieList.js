import React from 'react';
import {Container, Row, Col, ListGroup, Image} from 'react-bootstrap';
import {AppContext} from '../AppContext';
import MyNav from '../components/navbar';
import './MovieList.css';

export default class MovieList extends React.Component {
  static contextType = AppContext;
  constructor() {
    super();
    this.state = {
      movies: [],
      limit: 200,
      page: 1,
      count: 0
    };
  }
  componentDidMount() {
    if (this.context.store.searchList != null)
    {
      this.loadMovieCountSearch();
      this.loadMoviesSearch();
    }
    else{
      this.loadMovieCount();
      this.loadMovies();
    }
  }
  loadMovieCount = async () => {
    const response = await fetch('https://recommedia-api.herokuapp.com/movieCount');
    const count = await response.json();
    await this.setState({count})
  }
  loadMovies = async () => {
    const offset = this.state.limit * (this.state.page - 1);
    const query = `limit=${this.state.limit}&offset=${offset}`
    const response = await fetch(`https://recommedia-api.herokuapp.com/pages?${query}`);
    const movies = await response.json();
    await this.setState({movies});
  }
  loadMovieCountSearch = async() => {
    const count = this.context.store.searchList.length;
    await this.setState({count});
  }
  loadMoviesSearch = async () => {
    const movies = this.context.store.searchList;
    await this.setState({movies});
  }
  pageBack = async () => {
    await this.setState({page: this.state.page - 1});
    await this.loadMovies();
  }
  pageForward = async () => {
    await this.setState({page: this.state.page + 1});
    await this.loadMovies();
  }
  selectMovie(movie) {
    this.context.actions.setMovie(movie);
    this.props.history.push('/movie');
  }
  render() {
    console.log(this.state.movies);
    const offset = this.state.limit * (this.state.page - 1);
    return <>
      <MyNav/>
      <Container fluid className='p-3'>
        <p>
          Showing {this.state.count > 0?offset+1:0}-{offset+this.state.limit < this.state.count? offset+this.state.limit: this.state.count} of {this.state.count}
        </p>
        {this.state.page > 1 ? <>
          <span onClick={this.pageBack}>Previous</span>
        </> : ''}
        <span className='mx-3'>{this.state.page}</span>
        {this.state.page * this.state.limit < this.state.count ? <>
          <span onClick={this.pageForward}>Next</span>
        </> : ''}
        <ListGroup>
          {this.state.movies.map(movie => (
            <ListGroup.Item key={movie.id} onClick={() => this.selectMovie(movie)}>
              <Row>
                <Col>
                  <Image src={movie.link} className='movieImage'/>
                </Col>
                <Col className='flex-grow-1'>
                  <h3>
                    {movie.name} ({movie.year})
                  </h3>
                  <p>
                    {movie.rating}/10
                  </p>
                  <p>
                    {movie.genres}
                  </p>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </>;
  }
}
