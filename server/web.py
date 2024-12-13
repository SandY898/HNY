from flask import Flask, request, render_template
import requests

# Flask app initialization
app = Flask(__name__)

API_URL = "http://127.0.0.1:5000/api/recommend"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/recommend', methods=['POST'])
def recommend():
    query = request.form.get('query', '')
    budget = request.form.get('budget', 0, type=int)
    try:
        response = requests.post(API_URL, json={"query": query, "budget": budget})
        if response.status_code == 200:
            recommendations = response.json().get('recommendations', [])
            return render_template('index.html', recommendations=recommendations, query=query, budget=budget)
        else:
            error = response.json().get('error', 'Unknown error occurred')
            return render_template('index.html', error=error)
    except Exception as e:
        return render_template('index.html', error=str(e))

if __name__ == '__main__':
    app.run(port=5001, debug=True)
