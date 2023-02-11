import React from 'react';
import axios from 'axios';


const fetchDogs = (breed) => {
    return axios.get(`https://dog.ceo/api/breed/${breed}/images`)
    .then(res => res)
    .catch(err => console.error('noooo'));
}


class App extends React.Component {
    constructor() {
        console.log('constructor ran');
        super();
        this.state = {
            doggos: [],
            breed: 'husky'
        }
        // fetchDogs('husky');
    }

    componentDidMount() { 
        // This runs right after component runs! Render runs once again after this
        // Any time state is updated, render is run again

        console.log('component did mount');
        fetchDogs(this.state.breed)
        .then(res => {
            this.setState({doggos: res.data.message });
        })
    }

    componentDidUpdate(prevProps, prevState) {
        // Used for error checking, check previous and new state
        console.log('component did update');
        // console.log(prevState);
        if(prevState.doggos !== this.state.doggos) {
            console.log('the dogs have changed');
            if(this.state.breed === 'chihuahua') {
                fetchDogs('husky')
                .then(res => {
                    this.setState({doggos: res.data.message, breed: 'husky'})
                })
            }
        }
    }

    searchDogs = dogName => {
        console.log('search dog');
        fetchDogs(dogName)
        .then(res => {
            this.setState({doggos: res.data.message, breed: dogName});
        })
    }



    render() {
        console.log('render function ran');
        return (
            <>
                <h1>My App</h1>
                <SearchForm searchDogs={this.searchDogs} />
                {this.state.doggos.map((dog, index) => (
                <img width='200' src={dog} key={index} alt={dog} />
                ))}
            </>
        )
    }
}

export default App;