// Global application component
// all other components are allocated within this
import React from 'react';
import Post from './Post';

export default class App extends React.Component {
    //returns HTML content for this component
    //render can have only one container of all components inside he
    render() {
        return (
            <div className="App">
                <h1>Eventos</h1>
                <Post title="Learning ReactJs with RocketSeat" />
                <Post title="ReactJs is awesome" />
                <Post title="Soon more video of ReactJS" />
                
            </div>
        );
    }

}