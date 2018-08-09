import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        url: '',
        item: []
    }
    this.TopStories = this.TopStories.bind(this);
    this.MostRecentStories = this.MostRecentStories.bind(this);
    this.Health = this.Health.bind(this);
    this.loadXMLDoc = this.loadXMLDoc.bind(this);
  }
TopStories(){
    var a = this.state.url;
    a = "https://timesofindia.indiatimes.com/rssfeeds/5880659.cms";
    this.setState({a})
    this.loadXMLDoc(a);    
}

MostRecentStories(){
    var a = this.state.url;
    a = "https://timesofindia.indiatimes.com/rssfeeds/1221656.cms";
    this.setState({a})
    this.loadXMLDoc(a);
}
Health(){
    var a = this.state.url;
    a = "https://timesofindia.indiatimes.com/rssfeeds/3908999.cms";
    this.setState({a})
    this.loadXMLDoc(a);
}
loadXMLDoc(a){     
    fetch(a)
        .then(response => response.text())
        .then((response) => {
            //var data = response.getElementsByTagName("item");
            let parser = new DOMParser();
            let parsedHtml = parser.parseFromString(response, 'text/xml');
            var x = parsedHtml.getElementsByTagName("item");
            var  i, xmlDoc, txt,title,description,link,guid,pubDate;
            // console.log(parsedHtml);
            // console.log(x.length);
            for (i = 0; i< x.length; i++) {
                title = x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
                pubDate = x[i].getElementsByTagName("pubDate")[0].childNodes[0].nodeValue;
                description = x[i].getElementsByTagName("description")[0].childNodes[0].nodeValue;
                link = x[i].getElementsByTagName("link")[0].childNodes[0].nodeValue;
                guid = x[i].getElementsByTagName("guid")[0].childNodes[0].nodeValue;
                this.state.item.push({title,description,link,guid,pubDate});
                //this.setState({b});
                console.log(this.state.item[i]);
            }
        })
}

  render() {
    return (
        <div>
        <div className="left">
        <button onClick={this.TopStories} >TopStories</button><br/>
        <button onClick={this.MostRecentStories} >Most Recent Stories</button><br/>
        <button onClick={this.Health} >Health</button><br/>
        </div>
        <div className = "right">
        {
            this.state.item.map((item,i) =>
            <div key = {i}>
               <a href = {item.link}>{item.title}</a><br/>
                <p style={{fontSize: '20px'}}>{item.description}</p> 
                <b style={{color: 'red'}}>{item.pubDate}</b>
                <hr/>
            </div>
        )
        }
      </div>
      </div>
    );
  }
}



export default App;
