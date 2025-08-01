function Modal({ onClose, children, title }) {
  return (
    <div className="top-20 md:top-3 right-3 left-3 bottom-3" style={{'position': 'absolute'}} onClick={onClose}>
      <div className="modal-backdrop fixed inset-0 bg-black opacity-50 l-0 r-0 b-0 t-0" onClick={onClose}></div>
      <div className="modal-container fixed inset-0 flex items-center justify-center">
        <div className="modal-content bg-gray-100 rounded-lg shadow-lg p-6 w-full max-w-2xl mx-2 md:mx-5 md:h-9/10 md:mb-15 h-7/8 overflow-auto" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header flex justify-between items-center mb-4">
            <span onClick={onClose} className="p-2 px-3 bg-gray-300 rounded">&times;</span>
            <h2 className="me-auto ms-4 text-left text-xl font-semibold">{title}</h2>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;                                                                                                                                   