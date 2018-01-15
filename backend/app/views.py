from . import app
import json
from flask import Flask, request, redirect, g, render_template, jsonify
import requests
import base64
import urllib
import urllib.parse
import sys
import six
from app.config import CLIENT_ID, CLIENT_SECRET


SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize"
SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"
SPOTIFY_API_BASE_URL = "https://api.spotify.com"
API_VERSION = "v1"
SPOTIFY_API_URL = "{}/{}".format(SPOTIFY_API_BASE_URL, API_VERSION)

#ServerSide Parameters
CLIENT_SIDE_URL = "http://localhost"
PORT = 5000
REDIRECT_URI = "{}:{}/callback".format(CLIENT_SIDE_URL, PORT)
SCOPE = "playlist-modify-public playlist-modify-private playlist-read-private user-read-private user-read-email user-read-recently-played playlist-read-collaborative user-follow-modify user-top-read user-follow-read user-follow-modify"
STATE = ""
SHOW_DIALOG_bool = True
SHOW_DIALOG_str = str(SHOW_DIALOG_bool).lower()

TOKEN = ''
CURRENT_REFRESH_TOKEN = ''

auth_query_parameters = {
    "response_type" : "code",
    "redirect_uri" : REDIRECT_URI,
    "scope": SCOPE,
    "client_id" : CLIENT_ID,
    "show_dialog": SHOW_DIALOG_str
}

@app.route('/')
def index():
    url_args = "&".join(["{}={}".format(key, urllib.parse.quote(val)) for key, val in auth_query_parameters.items()])
    auth_url = "{}/?{}".format(SPOTIFY_AUTH_URL, url_args)
    return redirect(auth_url)

@app.route("/callback")
def callback():
    global TOKEN
    global CURRENT_REFRESH_TOKEN
    auth_token = request.args['code']
    code_payload = {
        "grant_type": "authorization_code",
        "code": str(auth_token),
        "redirect_uri": REDIRECT_URI
    }
    base64encoded = base64.standard_b64encode(b"6c94d2c6becc41c6a84429c86270179e:875b30af700543bc87f7260b61bb028d").decode('ascii')
    # print(base64encoded, file=sys.stderr)
    headers = { "Authorization": "Basic " + str(base64encoded) }
    # print(headers, file=sys.stderr)
    post_request = requests.post(SPOTIFY_TOKEN_URL, data = code_payload, headers = headers)
    response_data = json.loads(post_request.text)
    # print(response_data, file=sys.stderr)
    TOKEN = response_data["access_token"]
    CURRENT_REFRESH_TOKEN = response_data["refresh_token"]
    token_type = response_data["token_type"]
    expires_in = response_data["expires_in"]

    return redirect("http://localhost:8080/callback")


@app.route('/token')
def tokenroute():
    global TOKEN
    return jsonify(TOKEN)

@app.route('/test')
def errorRoute():
    return jsonify({'BadRequest': 'BadRequest'}), 401;

@app.route('/refreshtoken')
def refreshToken():
    global CURRENT_REFRESH_TOKEN
    global TOKEN
    print('REFRESH TOKEN CALLED', file=sys.stderr)
    code_payload = {
        "grant_type": "refresh_token",
        "refresh_token": CURRENT_REFRESH_TOKEN
    }
    base64encoded = base64.standard_b64encode(b"6c94d2c6becc41c6a84429c86270179e:875b30af700543bc87f7260b61bb028d").decode('ascii')
    headers = { "Authorization": "Basic " + str(base64encoded) }
    post_request = requests.post(SPOTIFY_TOKEN_URL, data = code_payload, headers = headers)
    response_data = json.loads(post_request.text)
    print(response_data, file=sys.stderr)
    TOKEN = response_data["access_token"]
    return jsonify(TOKEN)
