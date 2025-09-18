from flask import Flask, request 

app = Flask (__name__)

@app.route("/sum")
def hello():
    x = request.args.get('x', type=int)
    y = request.args.get('y', type=int)
    sum = x+y
    return {"result": sum}
    


if __name__ == "__main__":
    app.run(localhost='0.0.0.0', port=50100, debug=True)