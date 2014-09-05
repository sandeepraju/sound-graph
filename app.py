import json

from flask import Flask, render_template, jsonify
from flask.ext.socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'blah-blah-blah'
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/events')
def events():
    payload = json.loads(request.data)
    emit('events', {'data': payload})
    return  jsonify({'status': 'success'})

# @socketio.on('my event', namespace='/test')
# def test_message(message):
#     emit('my response', {'data': message['data']})

# @socketio.on('start-stream', namespace='/test')
# def test_message(message):

#     # emit('my response', {'data': message['data']}, broadcast=True)




@socketio.on('connect', namespace='/ev')
def test_connect():
    emit('my response', {'data': 'Connected'})

@socketio.on('disconnect', namespace='/ev')
def test_disconnect():
    print('Client disconnected')

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)
