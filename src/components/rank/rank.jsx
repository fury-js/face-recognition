import React from "react";

export const Rank = ({name, entries}) => {
    return (
        <div className= 'white f1'>
            <div>
                {`${name}, your current entries is....`}
            </div>
            <div className= 'white f1'>
                {entries}
            </div>
        </div>

    );
}

export default Rank;
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         name: '',
    //         entries: 0
    //     }
    // }
    // componentDidMount(){
    //     fetch('http://localhost:3000/')
    //     .then(response => response.json())
    //     .then(user => {
    //         if(user) {
    //             console.log(user.name)
    //             this.setState({name:user.name})
    //             console.log(this.state)
    //             this.setState({entries: user.entries})
    //         }
    //     })
        // console.log(this.state)
    // }
    // render() {
        // if(this.state.user){
         
        

        
    // }
   
// }

