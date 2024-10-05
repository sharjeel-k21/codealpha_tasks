import React, { useState } from 'react';
// import { X } from 'lucide-react';

function ClickableImage() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="container p-3">
      {/* Thumbnail image that opens the modal when clicked */}
      <img 
        src="/api/placeholder/200/150" 
        alt="Click to enlarge"
        onClick={handleClick}
        className="img-fluid rounded cursor-pointer"
        style={{ cursor: 'pointer' }}
      />

      {/* Modal */}
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
                  onClick={handleClick}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-0">
                <img 
                  src="/api/placeholder/800/600" 
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
export default ClickableImage;