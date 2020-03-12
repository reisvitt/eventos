//Feed of application
import React from 'react';
import Comment from './Comment';

export default class Post extends React.Component {
    
    //is executed always new Post is intancieded
    constructor(props) {
        //pass on to the parent class the properties that comes the Post
        super(props);
        //state of the Post, all variables are been recorded inside here
        this.state = {
            comments: [
                { text: 'Good Post!' }
            ]
        };
        //infor to react when hadleSubimit is used we will be referencing the POST class
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //the paramenter is the variable of event
    handleSubmit(e) {
        //this.setStarte
        //prevent the reload of the page
        e.preventDefault();
    }

    //returns HTML content for this component 
    render() { 
        return (
            <div>
                <h2>{ this.props.title }</h2>
                
                {/*create new comments to the post*/}
                <form onSubmit={this.handleSubmit}>
                    <input />
                    <button type="submit">Comment</button>
                </form>
                
                {/*map iterate all components*/}
                { this.state.comments.map((comment, index) => {
                    
                    {/*key is used for positioneted better when react iterates the components*/}
                    return <Comment key={index} text={comment.text}/>
                
                }) }
            
            </div>
        );
    }
}