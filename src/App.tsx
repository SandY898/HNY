import styles from "./App.module.scss";
import { Input } from "./components/Input/Input.tsx";
import { ProductCard } from "./components/Card/Card.tsx";
import productsData from "./services/products.json";
import { Filters } from "./components/Filters/Filters.tsx";
import { useState } from "react";

export const App = () => {
  const [filters, setFilters] = useState<FilterValues>({
    category: "",
    availability: "",
    hasReviews: "",
    rating: "",
  });

  // Получаем уникальные категории из данных
  const categories = [
    ...new Set(productsData.map((product) => product["Category"])),
  ];

  // Фильтрация товаров
  const filteredProducts = productsData.filter((product) => {
    const { category, availability, hasReviews, rating } = filters;
    return (
      (category ? product["Category"] === category : true) &&
      (availability ? product["Available"] === availability : true) &&
      (hasReviews
        ? product["Have a feedback"].toString() === hasReviews
        : true) &&
      (rating ? product["Rating"] >= parseFloat(rating) : true)
    );
  });
  const displayProducts =
    filters.category ||
    filters.availability ||
    filters.hasReviews ||
    filters.rating
      ? filteredProducts
      : productsData.slice(0, 5);

  return (
    <div className={styles.Primary}>
      <h1 className={styles.Header}>Найди подходящий подарок!</h1>
      <Input />
      <Filters categories={categories} onFilter={setFilters} />
      <div className={styles.Product}>
        {displayProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};
