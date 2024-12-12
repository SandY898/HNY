// components/ProductCard.tsx
import React from "react";
import styles from "./Card.module.scss";
import { Product } from "../../types/Product";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className={styles.card}>
      <div className={styles.title}>{product.Name}</div>
      <div className={styles.price}>Цена: {product.Price} руб.</div>
      <div className={styles.category}>Категория: {product.Category}</div>
      <div className={styles.availability}>Наличие: {product.Available}</div>
      <div className={styles.rating}>Рейтинг: {product.Rating}⭐</div>
      <div className={styles.reviews}>
        {product["Have a feedback"]
          ? "Отзывы: Доступны"
          : "Отзывы: Отсутствуют"}
      </div>
    </div>
  );
};
