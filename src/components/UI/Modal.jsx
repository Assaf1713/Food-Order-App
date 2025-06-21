// import { useEffect, useRef } from "react";
// import { createPortal } from "react-dom";

// export default function Modal({ children, open, className='' , onClose }) {
//   const dialogRef = useRef(null);

//   useEffect(() => {
//     if (open) {
//       dialogRef.current.showModal();
//     }
//   }, [open]);

//   return createPortal(
//     <dialog ref={dialogRef} className={`modal ${className}`} onClose={onClose}>{children}</dialog>,
//     document.getElementById("modal")
//   );
// }
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, className = '', onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close(); 
    }
  }, [open]);

  return createPortal(
    <dialog
      ref={dialogRef}
      className={`modal ${className}`}
      onClose={onClose}
    >
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
