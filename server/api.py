from flask import Flask, request, jsonify
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline
import pymorphy2
from flask_cors import CORS
# Flask app initialization
app = Flask(__name__)
CORS(app)  # Разрешить все источники
# Load data
df = pd.read_excel("info_dump 13.12.24 10-23-16.xlsx")

# Initialize lemmatizer
morph = pymorphy2.MorphAnalyzer()
# fetch('http://127.0.0.1:5000/api/recommend', {
#     method: 'POST',
#     headers: {
#         'Content-Type': 'application/json',
#     },
#     body: JSON.stringify({ query: 'мышь', budget: 3500 }),
# })
# .then(response => response.json())
# .then(data => console.log(data))
# .catch(error => console.error('Error:', error));

def lemmatize_text(text):
    """Lemmatize text using pymorphy2"""
    words = text.split()
    lemmatized_words = [morph.parse(word)[0].normal_form for word in words]
    return " ".join(lemmatized_words)

# Preprocess data
df['Описание'] = df['Описание'].apply(lemmatize_text)
df['Цена'] = df['Цена'].apply(lambda x: x.split("\xa0₽")[0])
df = df[df['Цена'] != "Не указана"]
df['Цена'] = df['Цена'].astype(int)

# Define custom Russian stopwords
russian_stop_words = [
    'и', 'в', 'на', 'с', 'по', 'что', 'как', 'для', 'это', 'но', 'же', 'этот', 'бы', 'так', 'все', 'то', 'нет', 'быть', 'из', 'или', 'да', 'при', 'к', 'о', 'такой', 'такое', 'такого'
]

# Build model
vectorizer = TfidfVectorizer(stop_words=russian_stop_words)
classifier = LogisticRegression()
model = make_pipeline(vectorizer, classifier)
X = df['Описание']
y = df['Категория']
model.fit(X, y)

def recommend_products(query, budget):
    """Recommend products based on query and budget"""
    lemmatized_query = lemmatize_text(query)
    predicted_category = model.predict([lemmatized_query])[0]
    category_items = df[df['Категория'] == predicted_category]
    affordable_items = category_items[category_items['Цена'] <= budget]
    affordable_items = affordable_items.sort_values(by='Цена', ascending=False).head(3)

    # Добавляем ссылку на товар в результат
    return affordable_items[['Наименование', 'Цена', 'Описание', 'Ссылка на товар']].to_dict(orient='records')


@app.route('/api/recommend', methods=['POST'])
def api_recommend():
    data = request.json
    query = data.get('query', '')
    budget = data.get('budget', 0)
    try:
        recommendations = recommend_products(query, budget)
        return jsonify(recommendations=recommendations)
    except Exception as e:
        return jsonify(error=str(e)), 400

if __name__ == '__main__':
    
    app.run(debug=True)
 