from flask import Flask, request, jsonify, render_template
from chatbot import ChatBot

app = Flask(__name__, static_folder="static", template_folder="templates")
bot = ChatBot()

@app.route("/")
def home():
    return render_template("chatbot_web.html")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    mensaje = data.get("mensaje", " ")
    respuesta = bot.responder(mensaje)
    return jsonify ({"respuesta": respuesta})

@app.route("/historial", methods=["GET"])
def historial():
    return jsonify(bot.historial)

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

