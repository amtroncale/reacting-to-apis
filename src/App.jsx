import React from 'react'

class App extends React.Component {
  state = {
    movies: [],
    people: [],
    moviesLoaded: false,
    peopleLoaded: false
  };

  componentDidMount() {
    fetch("https://ghibliapi.herokuapp.com/films")
      .then(res => res.json())
      .then(movieList => {
        this.setState({ movies: movieList })
      })
    fetch("https://ghibliapi.herokuapp.com/people")
      .then(res => res.json())
      .then(peopleList => {
        this.setState({ people: peopleList })
    })
  };

  moviesLoading() {
    this.setState({ moviesLoaded: false })
  };

  peopleLoading() {
    this.setState({ peopleLoaded: false })
  };

  toggleMoviesLoaded() {
    this.setState({ moviesLoaded: true })
  };

  togglePeopleLoaded() {
    this.setState({ peopleLoaded: true })
  };

  showMovies() {
    return (
      <>
        <button className="btn btn-secondary btn-block" onClick={() => this.moviesLoading()}>Hide Movies</button>
        <button className="btn btn-secondary btn-block" onClick={() => this.peopleLoading()}>Load People</button>
        <ul>
          {this.state.movies.map(movie => {
            return (
              <li key={movie.id}>
                <div className="col-md-11 m-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{movie.title}</h5>
                      <p className="card-text">{movie.description}</p>
                      <a href={movie.url} target="_blank" rel="noopener noreferrer">Click for movie information</a>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </>
    )
  };

  showPeople() {
    return (
      <>
        <button className="btn btn-secondary btn-block" onClick={() => this.moviesLoading()}>Load Movies</button>
        <button className="btn btn-secondary btn-block" onClick={() => this.peopleLoading()}>Hide People</button>

        <ul>
          {this.state.people.map(person => {
            return (
              <li key={person.id}>
                <div className="col-md-11 m-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{person.name}</h5>
                      <ul>
                        <li>Age: {person.age}</li>
                        <li>Gender: {person.gender}</li>
                      </ul>
                      <a href={person.url} target="_blank" rel="noopener noreferrer">Click here for character information</a>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </>
    )
  };

  noRequest() {
    return (
      <>
        <button className="btn btn-secondary btn-block" onClick={() => this.toggleMoviesLoaded()}>Load Movies</button>
        <button className="btn btn-secondary btn-block" onClick={() => this.togglePeopleLoaded()}>Load People</button>
      </>
    )
  };

  render() {
    if (this.state.moviesLoaded) {
      return (
        <>{this.showMovies()}</>
      )
    } else if (this.state.peopleLoaded) {
      return (
        <>{this.showPeople()}</>
      )
    } else {
      return (
        <>{this.noRequest()}</>
      )
    }
  }
};

export default App;