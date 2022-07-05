from flask import Flask, jsonify, request
import requests
from firebase_admin import credentials, firestore, initialize_app
from threading import Thread
import flask_cors as fc
import text2emotion as te
import nltk
from tts import create_tts
from utils import *
import random


# Initialize Firestore DB
cred = credentials.Certificate(r"key.json")
default_app = initialize_app(cred)
db = firestore.client()
news_collection = db.collection('news_collection')
comments_collection = db.collection('comments_collection')
MAX_DB_SIZE = 1000

headers = {}
NEWS_URL = "https://newsapi.org/v2/"
NEWS_API_TOKEN = "0f2c81f0327f45ccabffd44b6aae7991"


def create_app():
    app = Flask(__name__)
    fc.CORS(app)
    nltk.download('omw-1.4')
    return app


app = create_app()


@app.route('/')
def hello_world():
    return '¯\_(ツ)_/¯'


@app.route('/fetch-news/<query>',  methods=['GET'])
def fetch_and_add(query):
    thread = Thread(target=thread_function_for_fetch_n_add, args=(query,))
    thread.daemon = True
    thread.start()

    return jsonify({'thread_name': str(thread.name),
                    'started': True})


@app.route('/news/<lastseen_id>', methods=['GET'])
def fetch_news(lastseen_id):
    ids = int(request.args.get('ids', 0))
    idb = int(request.args.get('idb', 0))
    max_size = 30
    payload_size = 0
    result = {"articles": []}

    docs = news_collection.order_by(u"id").where(
        u'id', '>', lastseen_id).limit(max_size).stream()
    for doc in docs:
        #    if idb < int(doc.get("id")) and payload_size < max_size:
        #         payload_size = payload_size + 1
        #         result["articles"].append(doc.to_dict())
        #     elif idb > int(doc.get("id")) and payload_size < max_size:
        #         payload_size = payload_size + 1
        result["articles"].append(doc.to_dict())

    random.shuffle(result["articles"])
    return jsonify(result)


@app.route('/comment', methods=['POST'])
def comment():
    try:
        # comments_collection.document(final_json["title"]).set(final_json)
        # return jsonify({"success": True}), 200
        comment_doc = {
            "id": str(current_milli_time()),
            "comment": request.get_json()['comment']
        }

        comments_collection.document(
            str(current_milli_time())).set(comment_doc)

        return jsonify({'result': 'Comment added'}), 200
    except Exception as e:
        return f"An Error Occured: {e}"


@app.route('/footer', methods=['GET'])
def footer():
    docs = comments_collection.order_by(
        u'id', direction=firestore.Query.DESCENDING).limit(10).stream()
    results = []
    for doc in docs:
        results.append(doc.get('comment'))

    return jsonify(results)


def thread_function_for_fetch_n_add(query):
    r = requests.get(NEWS_URL + 'top-headlines?PageSize=50&language=en' +
                     '&category=' + query + '&apiKey=' + NEWS_API_TOKEN)
    data = r.json()

    #f = open('test.json')
    #data = json.load(f)

    result = {"articles": []}

    for each in data["articles"]:
        article_inf = {
            "id": str(current_milli_time()),
            "publishedAt": each["publishedAt"],
            "title": parse_title(each["title"]),
            "url": each["url"],
            "urlToImage": each["urlToImage"],
            "audioUrl": '',
            "source": each["source"]["name"],
            "category": query,
            "emotion": '',
        }
        parsed_text = parse_html(each["description"], each["content"])

        if parsed_text == [] or check_if_exists(article_inf["title"], news_collection):
            continue

        emotions = te.get_emotion(parsed_text)
        emotion = max(emotions, key=emotions.get)
        article_inf["emotion"] = emotion
        article_inf["text"] = parsed_text
        article_inf['audioUrl'] = create_tts(parsed_text, article_inf['id'])

        add_to_database(article_inf, news_collection)

        result["articles"].append(article_inf)

    # DELETE SAME NUMBER THAT IS ADDED
    number_added = len(result["articles"])
    docs = news_collection.order_by(u"id").limit(number_added).stream()
    for doc in docs:
        news_collection.document(doc.get("title")).delete()

    # f.close()

    return


if __name__ == "__main__":
    app.run(threaded=True)
