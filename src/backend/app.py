from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/optimize', methods=['POST'])
def optimize_routes():
    data = request.json
    warehouse = data['warehouse']
    destinations = data['destinations']
    
    # Placeholder logic for route optimization
    routes = {
        "warehouse": warehouse,
        "optimized_routes": [{"to": d, "distance": i*10} for i, d in enumerate(destinations)]
    }
    return jsonify(routes)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
