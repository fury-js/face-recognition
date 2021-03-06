import React from "react";

export class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
        }
    }
    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }
    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }
    onSubmitSignIn = () => {
        console.log(this.state)
        fetch('https://shrouded-caverns-08771.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })        
        .then(response => response.json())
        .then(user => {
            if(user.id) {
                this.props.loadUser(user)
                this.props.onRouteChange('home')
            }
        })
    }
    render() {
        return (
            <article class="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center shadow-5">
                <main className="pa4 black-80">
                    <div className="measure" accept-charset="utf-8">
                            <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
                            <legend class="ph0 mh0 fw6 clip">Sign Up</legend>
                            <div class="mt3">
                            <div className="mt3">
                                    <label className="db fw1 lh-copy f6" htmlFor="email-address">Name</label>
                                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                        type="text" 
                                        name="name"  
                                        id="name"
                                        onChange={this.onNameChange}
                                    />
                                </div>
                                <label class="db fw4 lh-copy f6" for="email-address">Email address</label>
                                <input class="pa2 input-reset ba bg-transparent w-100 measure" 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address"
                                    onChange={this.onEmailChange}
                                />
                            </div>
                            <div class="mt3">
                                <label class="db fw4 lh-copy f6" for="password">Password</label>
                                <input class="b pa2 input-reset ba bg-transparent" 
                                    type="password" 
                                    name="password"  
                                    id="password"
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                            </fieldset>
                            <div class="mt3">
                            <input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" 
                            type="submit" value="Register" onClick={this.onSubmitSignIn}/>
                            </div>
                    </div>
                </main>
            </article>
        );
    }
    
}

export default Register;