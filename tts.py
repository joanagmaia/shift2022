import boto3
from boto3 import Session
from boto3 import resource
from botocore.exceptions import BotoCoreError, ClientError
from contextlib import closing


BUCKET_NAME = "newsaudio"
AWS_REGION = 'eu-west-3'

ACCESS_KEY = 'AKIATEECVADDWKXPPRJS'
SECRET_KEY = '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'


def create_tts(text, title):

    session = Session(region_name=AWS_REGION,
                      aws_access_key_id=ACCESS_KEY,
                      aws_secret_access_key=SECRET_KEY
                      )
    polly = session.client("polly")
    s3 = resource('s3',
                  aws_access_key_id=ACCESS_KEY,
                  aws_secret_access_key=SECRET_KEY
                  )
    bucket = s3.Bucket(BUCKET_NAME)

    filename = f'{title}.mp3'

    URL = f"http://{BUCKET_NAME}.s3.{AWS_REGION}.amazonaws.com/{filename}"
    try:
        response = polly.synthesize_speech(
            Text=text,
            OutputFormat="mp3",
            VoiceId="Amy")

        with closing(response["AudioStream"]) as stream:
            bucket.put_object(Key=filename, Body=stream.read())
    except BotoCoreError as error:
        print("boto core error")
        print(error)

    return URL
