import React from "react";
import styles from "./index.module.css";

interface CheckboxProps {
  checked: boolean;
  onChange: (newVal: boolean) => void;
}
const Checkbox: React.FC<CheckboxProps> = (props) => {
  const { checked, onChange: emitOnChange } = props;
  const onChange = () => {
    emitOnChange(!checked);
  };
  return (
    <div className={styles.customCheckbox}>
      <input type="checkbox" checked={checked} readOnly />
      <span className={styles.checkMark} onClick={onChange}></span>
    </div>
  );
};

export default Checkbox;
