import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ImgixClient from 'imgix-core-js'
import {storage} from './firebase/index';

let client = new ImgixClient({
  domain: 'mhd22.imgix.net',
  secureURLToken: 'jAQx78EvgKsx7YsZ'
});



class App extends Component {
  constructor(){
    super();
    this.state={
      image:null,
      url:'',

    };
  }
  setImage=(e)=>{
    const im = e.target.files[0];
    if(im){
      this.setState({image:im});
      console.log(im);
    }
  }
  handleUpload=()=>{
    const {image} = this.state;
    if(image){
      const upload = storage.ref(`images/${image.name}`).put(image);
      upload.on('state_changed',
      (snapshot)=>{},
      (err)=>{console.log(err);},
      ()=>{
        storage.ref('images').child(image.name).getDownloadURL().then(urll=>{
          let url = client.buildURL(urll, { w: 500, h: 500 });
          this.setState({url})
          console.log(url);
          window.open(url,'_blank');
        })

      })
    }
    

  }

  // const logData =(e)=>{
  //   const ii=document.getElementById('input');
  //   console.log(ii.)
  // }
  render(){
    return (
      <div className="App">
        <h1>Choose an Image to upload it, then click on upload...</h1>
        <input id="input" onChange={this.setImage} type="File" accept="image/*"/>
        <br />
        <button onClick={this.handleUpload}>Upload</button>
      </div>
    );
  }
}

export default App;




// let url = client.buildURL('', { w: 500, h: 500 });
// console.log(url); 
// console.log("this is app");