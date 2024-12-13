import styles from "./Input.module.scss";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";

interface InputProps {
    onSearch: (query: string, budget: number) => void; // Функция поиска с учетом бюджета
}

export const Input: React.FC<InputProps> = ({ onSearch }) => {
    const [query, setQuery] = useState<string>(""); // Состояние для ввода текста
    const [budget, setBudget] = useState<number>(0); // Состояние для ввода бюджета

    const handleSearch = () => {
        if (query.trim()) {
            onSearch(query, budget); // Вызываем функцию поиска с введенным запросом и бюджетом
        }
    };

    return (
        <div className={styles.Primary}>
            <input
                type="text"
                className={styles.Input}
                placeholder="Смартфон"
                value={query}
                onChange={(e) => setQuery(e.target.value)} // Обновляем состояние для запроса
            />
            <input
                type="number"
                className={styles.Input}
                placeholder="Бюджет"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))} // Обновляем состояние для бюджета
            />
            <span className={styles.Span} onClick={handleSearch}>
        <CiSearch />
      </span>
        </div>
    );
};
