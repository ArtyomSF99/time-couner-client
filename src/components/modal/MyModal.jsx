import React from "react";
import styles from "./modal.module.scss";

const MyModal = ({ children, visible, setVisible }) => {
  return (
    visible && (
      <div className={styles.modalBackground} onClick={() => setVisible(false)}>
        <div
          className={styles.myModalContent}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    )
  );
};

export default MyModal;
