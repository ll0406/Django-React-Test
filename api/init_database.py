import requests
import json

def prepopulate():
    # Retrieve from the website and store the this-that pair to database 500 times
    for i in range(0, 500):
        # Retrieve
        r = requests.get('http://itsthisforthat.com/api.php?json')
        data = json.loads(r.text)

        # Store to database (api server is running at 8000 at this point)
        requests.post('http://127.0.0.1:8000/pairs', json={"this_text": data['this'], "that_text": data['that']})

#Only run following once to prepopulate the database
#prepopulate()