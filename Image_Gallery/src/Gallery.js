import { useState } from 'react'
// import { X } from 'lucide-react';
import img1 from './images/1.jpg'
import img2 from './images/2.jpg'
import img3 from './images/3.jpg'
import img4 from './images/4.jpg'
import img5 from './images/5.jpg'
import img6 from './images/6.jpg'
let src;
function Gallery() {
    const [isOpen, setisOpen] = useState(false)
    function onClick(image){
        setisOpen(!isOpen);
        console.log(image)
         src = image;
    }
    function onClose(){
        setisOpen(false)
    }
    return(
        <div className="container py-5">
        <h1 className="text-center mb-5">Image Gallery</h1>
        
        <div className="row awein">
            <div className="col-md-4 gallery-item">
                <img src={img1} alt=" 1" className="img-fluid rounded shadow" onClick={()=>onClick(img1)}/>
            </div>
            <div className="col-md-4 gallery-item">
                <img src={img2} alt=" 2" className="img-fluid rounded shadow"onClick={()=>onClick(img2)}/>
            </div>
            <div className="col-md-4 gallery-item">
                <img src={img3} alt=" 3" className="img-fluid rounded shadow"onClick={()=>onClick(img3)}/>
            </div>
            <div className="col-md-4 gallery-item">
                <img src={img4}alt=" 4" className="img-fluid rounded shadow"onClick={()=>onClick(img4)}/>
            </div>
            <div className="col-md-4 gallery-item">
                <img src={img5} alt=" 5" className="img-fluid rounded shadow"onClick={()=>onClick(img5)}/>
            </div>
            <div className="col-md-4 gallery-item">
                <img src={img6} alt=" 6" className="img-fluid rounded shadow"onClick={()=>onClick(img6)}/>
            </div>
        </div>
        {isOpen && (
        <div 
          className="modal show d-block" 
          tabIndex="-1" 
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0">
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={onClose}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-0 large">
                <img 
                  src={src}
                  alt="Enlarged view" 
                  className="img-fluid rounded"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    
    );
}
export default Gallery;