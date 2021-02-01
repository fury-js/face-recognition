import React, { Component } from "react";
import Particles from 'react-particles-js';
import { Navigation } from "./components/navigation/navigation";
import { SignIn } from "./components/signin/SignIn";
import { Register } from "./components/register/Register";
import { Logo } from "./components/logo/logo";
import { Rank } from "./components/rank/rank";
import { ImageLinkForm } from "./components/imageLinkForm/imageLinkForm";
import { FaceRecognition } from "./components/FaceRecognition/FaceRecognition";
import './App.css';




const particlesOptions = {
  particles: {
    line_linked: {
      shadow: {
        enable: true,
        color: '#3CA9D1',
        blur: 5
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      name:'',
      entries: 0,
      input: '',
      imageUrl: '',
      box: {},
      route: 'SignIn',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        password: '',
        entries: 0,
        date: ''
      }
    }
  }

  // componentDidMount() {
  //   fetch('http://localhost:3000/')
  //   .then(response => response.json())
  //   .then(users => {

  //   })
  // }

  loadUser = (data => {
    this.setState(
      {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        entries: data.entries,
        date: data.date
      }
    )

  })

  onInputChange = (event) => {
    this.setState({input: event.target.value})

  }
  calculateFaceBox = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
  
    }
  
  }
  
  displayFaceBox = (box) => {
    this.setState({box: box});
  }
  

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    fetch('https://shrouded-caverns-08771.herokuapp.com/imageurl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                input: this.state.input
            })
        })
    .then(response=>response.json())
    .then (response => {
      if(response) {
        fetch('https://shrouded-caverns-08771.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.id
            })
        })
        .then(response => response.json())
        // .then(data=>{console.log(data)})
        .then(entries => {
          this.setState( {entries:entries})
          console.log(entries)
        })
      }
      this.displayFaceBox(this.calculateFaceBox(response))
    })
    .catch(err => console.log(err));

  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState({isSignedIn: false})
    }
    else if (route === 'home') {
      // this.loadUser(this.state.user)
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }
  render() {
    return (
      <div  className="App">
          <Particles className='particles'
                params={particlesOptions} />
          <Navigation isSignedIn= {this.state.isSignedIn} onRouteChange={this.onRouteChange} />
          { this.state.route === 'home' 
            ? <div>
              <Logo />
              <Rank name={this.state.name} entries={this.state.entries} />
              {console.log(this.state.user.name)}
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition box= {this.state.box} imageUrl= {this.state.imageUrl} />
              </div>
            : (
                this.state.route === 'SignIn'  
                ?
                <SignIn loadUser= {this.loadUser} onRouteChange= {this.onRouteChange}/>
                :
                <Register loadUser= {this.loadUser} onRouteChange={this.onRouteChange}/>
              ) 
            }
      </div>
    );
  }
}

export default App;
