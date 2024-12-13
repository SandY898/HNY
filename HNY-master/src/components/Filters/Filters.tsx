import React from "react";
import styles from "./Filters.module.scss";

interface FiltersProps {
  categories: string[];
  onFilter: (filters: Partial<FilterValues>) => void;
}

export interface FilterValues {
  category: string;
  availability: string;
  hasReviews: string;
  rating: string;
}

export const Filters: React.FC<FiltersProps> = ({ categories, onFilter }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFilter((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.Filters}>
      <select className={styles.Select} name="category" onChange={handleChange}>
        <option value="">Категория</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        className={styles.Select}
        name="availability"
        onChange={handleChange}
      >
        <option value="">Наличие</option>
        <option value="В наличии">В наличии</option>
        <option value="Под заказ">Под заказ</option>
        <option value="Ожидается поступление">Ожидается поступление</option>
        <option value="Предзаказ">Предзаказ</option>
      </select>

      <select
        className={styles.Select}
        name="hasReviews"
        onChange={handleChange}
      >
        <option value="">Отзывы</option>
        <option value="true">Есть отзывы</option>
        <option value="false">Нет отзывов</option>
      </select>

      <select className={styles.Select} name="rating" onChange={handleChange}>
        <option value="">Рейтинг</option>
        <option value="4.0">4.0 и выше</option>
        <option value="4.5">4.5 и выше</option>
        <option value="4.8">4.8 и выше</option>
      </select>
    </div>
  );
};
