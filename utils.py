import json
import re
import time


def current_milli_time():
    return round(time.time() * 1000)


def parse_html(description, content):
    pattern = r'($\\r\\n|$\\n|$\\r)+'
    pattern2 = r'<[^>]*>'

    if description != None and description != "" and description != "None":
        parsed_description = description.replace('\n', '. ').replace('\r', '')
        parsed_description = re.sub(pattern2, ' ', parsed_description, re.M)
        parsed_description = parse_pontuation(parsed_description)
    else:
        parsed_description = ""

    if content != None and content != "" and content != "None":
        parsed_content = content.replace('\n', '. ').replace('\r', '')
        parsed_content = re.sub(pattern2, ' ', parsed_content, re.M)
        parsed_content = parse_pontuation(parsed_content)
    else:
        parsed_content = ""

    if parsed_content == [] or parsed_content == "":
        parsed_text = parsed_description
    elif parsed_description == [] or parsed_description == "":
        parsed_text = parsed_content
    elif parsed_description in parsed_content:
        parsed_text = parsed_content
    else:
        parsed_text = parsed_description + " " + parsed_content

    return parsed_text


def parse_pontuation(s):
    if s[-1] != "." and s[-1] != "!" and s[-1] != "?" and s[-1] != ";":
        ponctuation = [s.rfind('. '), s.rfind(
            '! '), s.rfind('? '), s.rfind('; ')]
        later = ponctuation.index(max(ponctuation))

        if later == 0:
            pont = ". "
        elif later == 1:
            pont = "! "
        elif later == 2:
            pont = "? "
        elif later == 3:
            pont = "; "

        parsed_s = s.split(pont)[:-1]
        if parsed_s != []:
            parsed_s = pont.join(parsed_s)+"."

        return parsed_s
    return s


def check_if_exists(article_title, news_collection):
    info = news_collection.document(article_title).get()
    if info.exists:
        return True
    else:
        return False


def add_to_database(final_json, news_collection):
    try:
        news_collection.document(final_json["title"]).set(final_json)
        return json.dumps({'success': True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"


def parse_title(title):
    parsed_title = title.split(" - ")[:-1]
    if parsed_title != []:
        parsed_title = " - ".join(parsed_title)
        parsed_title = parsed_title.replace("/", "-")
        return parsed_title

    title = title.replace("/", "-")
    return title
