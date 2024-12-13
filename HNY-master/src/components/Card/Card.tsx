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
      <div className={styles.title}>{product.Наименование}</div>
      <div className={styles.price}>Цена: {product.Цена} руб.</div>
      <div className={styles.availability}>Описание: {product.Описание}</div>
    </div>
  );
};
