import React, { Component } from 'react';
import fetch from 'node-fetch';
class Data extends Component {
    constructor(props) {
        super(props);
        this.fetching=this.fetching.bind(this)
    }
    fetching(url) {
        fetch(url).then(
            Response => {
                return Response.text()
            }
        ).then(data => {
            const a = JSON.stringify(data);
            console.log(JSON.parse(a))
            this.setState({ data: JSON.parse(a) })
        }).catch(error => console.error(error));
    }
    render() {
       
        return (
            <div>
                { this.fetching.bind(this, this.props.url)}
            </div>
        );
    }
}
export default Data;