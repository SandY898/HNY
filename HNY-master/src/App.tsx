import styles from "./App.module.scss";
import { Input } from "./components/Input/Input.tsx";
import { ProductCard } from "./components/Card/Card.tsx";
import { Filters } from "./components/Filters/Filters.tsx";
import { useState } from "react";
import gir from './girljanda-9.gif';
import ded from './95d59a36e1f1cb3341b2b3c0faa58f8f.gif';
import baba from './orig.gif';

export const App = () => {
    const [filters, setFilters] = useState<FilterValues>({
        category: "",
        availability: "",
        hasReviews: "",
        rating: "",
    });
    const [products, setProducts] = useState<any[]>([]); // Для хранения полученных данных о товарах
    const [loading, setLoading] = useState<boolean>(false); // Для отображения загрузки
    const [error, setError] = useState<string>(""); // Для обработки ошибок

    // Функция для поиска товаров
    const searchProducts = async (query: string, budget: number) => {
        setLoading(true); // Включаем индикатор загрузки
        setError(""); // Сбрасываем ошибку

        try {
            const response = await fetch("http://127.0.0.1:5000/api/recommend", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query, budget }), // Отправляем запрос с query и budget
            });

            if (!response.ok) {
                throw new Error("Ошибка при получении данных с API");
            }

            const data = await response.json();
            setProducts(data.recommendations || []); // Обрабатываем данные
        } catch (err: any) {
            setError(err.message); // Обработка ошибок
        } finally {
            setLoading(false); // Выключаем индикатор загрузки
        }
    };

    // Получаем уникальные категории из данных
    const categories = [
        ...new Set(products.map((product) => product["Категория"])),
    ];

    // Фильтрация товаров
    const filteredProducts = products.filter((product) => {
        const { category, availability, hasReviews, rating } = filters;
        return (
            (category ? product["Категория"] === category : true) &&
            (availability ? product["Доступность"] === availability : true) &&
            (hasReviews
                ? product["Есть отзыв"]?.toString() === hasReviews
                : true) &&
            (rating ? product["Рейтинг"] >= parseFloat(rating) : true)
        );
    });

    const displayProducts =
        filters.category ||
        filters.availability ||
        filters.hasReviews ||
        filters.rating
            ? filteredProducts
            : products.slice(0, 5);

    return (
        <div className={styles.Primary}>
            <img className={styles.Gir} src={gir} alt="loading..." />
            <h1 className={styles.Header}>Найди подходящий подарок!</h1>
            <Input onSearch={searchProducts} /> {/* Передаем функцию поиска с учетом бюджета */}

            <Filters categories={categories} onFilter={setFilters} />

            <div className={styles.Product}>
                {loading ? (
                    <p>Загрузка...</p>
                ) : error ? (
                    <p>Произошла ошибка: {error}</p>
                ) : (
                    displayProducts.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))
                )}
            </div>

            <div>
                <img src="https://www.expertplus.ru/UserFiles/Image/content/new_year/06.gif" alt="" />
                <img src="https://www.expertplus.ru/UserFiles/Image/content/new_year/06.gif" alt="" />
                <img src={ded} alt="loading..." />
                <img src="https://www.expertplus.ru/UserFiles/Image/content/new_year/06.gif" alt="" />
                <img src="https://www.expertplus.ru/UserFiles/Image/content/new_year/06.gif" alt="" />
                <img style={{ height: "350px" }} src={baba} alt="loading..." />
                <img src="https://www.expertplus.ru/UserFiles/Image/content/new_year/06.gif" alt="" />
                <img src="https://www.expertplus.ru/UserFiles/Image/content/new_year/06.gif" alt="" />
            </div>
        </div>
    );
};
