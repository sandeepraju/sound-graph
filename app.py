from flask import Flask
from flask import render_template
from flask_sockets import Sockets

app = Flask(__name__)
sockets = Sockets(app)


@sockets.route('/events')
def echo_socket(ws):
    while True:
        message = ws.receive()
        ws.send(message)


@app.route('/')
def hello():
    return render_template('index.html')

if __name__ == '__main__':
    app.run()
