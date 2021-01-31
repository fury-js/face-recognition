import React from "react";
import "./imageLinkForm.css";

export const ImageLinkForm = ({ onInputChange, onButtonSubmit}) => {
    return (
       <div>
           <p className='f3'>{'This app will detect your face.'}</p>
           <div className='form center pa4 br3 shadow-5'>
                <input type='text' className='f5 pa2 w-70 center' onChange={onInputChange} />
                <button className= 'w-30 grow f7 link ph3 pv2 dib white bg-light-blue' onClick={onButtonSubmit}>Detect</button>
           </div>

       </div>
    );
}

export default ImageLinkForm;