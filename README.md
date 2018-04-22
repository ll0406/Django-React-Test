# Instructions on Running
## Overview of File Tree
```
.
├── README.md
├── api
│   ├── cloneAPI
│   │   ├── cloneAPI
│   │   │   ├── __init__.py
│   │   │   ├── settings.py
│   │   │   ├── urls.py
│   │   │   └── wsgi.py
│   │   ├── db.sqlite3
│   │   ├── manage.py
│   │   └── pairs
│   │       ├── __init__.py
│   │       ├── admin.py
│   │       ├── apps.py
│   │       ├── migrations
│   │       │   ├── 0001_initial.py
│   │       │   └── __init__.py
│   │       ├── models.py
│   │       ├── serializers.py
│   │       ├── tests.py
│   │       ├── urls.py
│   │       └── views.py
│   └── init_database.py
├── clone-site
│   ├── package.json
│   └── src
│       ├── components
│       │   ├── App
│       │   │   └── index.js
│       │   ├── ChangeText
│       │   │   ├── ChangeText.scss
│       │   │   ├── __test__
│       │   │   │   └── ChangeText.test.js
│       │   │   └── index.js
│       │   └── FadeIn
│       │       └── index.js
│       ├── containers
│       │   └── HomePage
│       │       ├── HomePage.scss
│       │       ├── __test__
│       │       │   └── HomePage.test.js
│       │       └── index.js
│       ├── enzymeSetup.js
│       ├── index.js
│       └── registerServiceWorker.js

```

* All self-implemented backend/api code is located under **./api**
* All frontend/React code is located under **./clone-site**

## Setup API
1. Open terminal, and run following code to install virtualenv if you have not installed it (I assume `pip` is already installed)
```
pip3 install virtualenv
```
if you have Anaconda installed, run following code instead
```
conda install virtualenv
```

2. On terminal, go to directory and run following code to setup virtual environment, and install django and django rest framework

```
>>> cd api
>>> virtualenv env
>>> source env/bin/activate

>>> pip3 install Django
>>> pip3 install djangorestframework
```

3. Also we need to enable cors on django, so please install django-cors-headers

```
>>> pip3 install django-cors-headers
```

4. Make sure nothing is running on port 8000 and start the server
```
>>> lsof -i :8000
COMMAND   PID USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
python  17440    l    5u  IPv4 0x63321b16b9bc4f3b      0t0  TCP localhost:irdmi (LISTEN)

>>> kill -9 <PID>

>>> cd cloneAPI && python3 manage.py runserver
...
...
```

5. Now the API should be accessible at port http://127.0.0.1:8000

## Setup Frontend
1. Then, on terminal, go to direcotry `./clone-site`
2. Install all dependencies with following code (Assume npm is already installed)
```
>>> npm install
```
3. Then start the web page by
```
>>> npm start
```
4. Webpage should be alive now


# Building Process

## Website Inspection.
1. General inspection of the website, including the content, functionalities of each button.
2. Resize Window and take note how css is set for the website.

## Frontend Building
### Initialize Front-End
1. Initialize project with create-react-app
2. Eject to install SASS and Edit corresponding Webpack loader
3. Install other dependencies
	1. react-motion: provide animation to website
	2. react-router-dom: provide web routing
	3. airbnb/enzyme: provide testable component
	4. react-swtich: simple switch component

### Coding Frontend
1. Under `src/components`, I have implemented following
	* `App`: All the routing of components
	* `ChangeText`: The core click-and-change component
	* `FadeIn`: A simple wrapper that allows component to have fade in animation
		
2. Under `src/containers`, I have implemented following
	* `HomePage`: a container that will fetch api and pass props to `<ChangeText>` component

### Testing
1. In addition, I have implemented test for`<ChangeText>` and `<HomePage>`, they are located in `__tests__` folders. To run the test, simpmly run following under `./clone-site`.
```
>>> npm test
```
		

## API Building
### Writing API
1. Building this api with django restframework is rather straight forward.
	1. I have created a simple `Pair` model that has two text field: `this_text` and `that_text`
	2. Then I implemented the corresponding `PairSerializer` and view that supports post and get action.

### Populate Database
1. In addition, for keeping the returned 'this ' and 'that' pair consistent with the original site, I have written code in `./api/init_database.py` to populate the database with the api endpoint from original website.
