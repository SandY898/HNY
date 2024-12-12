import styles from "./Input.module.scss";
import { CiSearch } from "react-icons/ci";

export const Input = () => {
  return (
    <div className={styles.Primary}>
      <input type="text" className={styles.Input} placeholder="Смартфон" />
      <span className={styles.Span}>
        <CiSearch />
      </span>
    </div>
  );
};
