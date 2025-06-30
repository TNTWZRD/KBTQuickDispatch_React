function Modal({ onClose, children }) {
  return (
    <div className="modal-overlay rounded bg-gray-200 p-6" style={{'position': 'absolute'}} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button p-2 px-3 mb-2 bg-gray-100 rounded" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;