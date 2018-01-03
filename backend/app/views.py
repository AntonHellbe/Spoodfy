from . import app
import json
from flask import Flask, request, redirect, g, render_template, jsonify
import requests
import base64
import urllib
import urllib.parse
import sys
import six

CLIENT_ID = "6c94d2c6becc41c6a84429c86270179e"
CLIENT_SECRET = "875b30af700543bc87f7260b61bb028d"

SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize"
SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"
SPOTIFY_API_BASE_URL = "https://api.spotify.com"
API_VERSION = "v1"
SPOTIFY_API_URL = "{}/{}".format(SPOTIFY_API_BASE_URL, API_VERSION)

#ServerSide Parameters
CLIENT_SIDE_URL = "http://localhost"
PORT = 5000
REDIRECT_URI = "{}:{}/callback".format(CLIENT_SIDE_URL, PORT)
SCOPE = "playlist-modify-public playlist-modify-private playlist-read-private user-read-private user-read-email user-read-recently-played"
STATE = ""
SHOW_DIALOG_bool = True
SHOW_DIALOG_str = str(SHOW_DIALOG_bool).lower()

TOKEN = ''

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
    auth_token = request.args['code']
    code_payload = {
        "grant_type": "authorization_code",
        "code": str(auth_token),
        "redirect_uri": REDIRECT_URI
    }
    base64encoded = base64.standard_b64encode(b"6c94d2c6becc41c6a84429c86270179e:875b30af700543bc87f7260b61bb028d").decode('ascii')
    print(base64encoded, file=sys.stderr)
    headers = { "Authorization": "Basic " + str(base64encoded) }
    print(headers, file=sys.stderr)
    post_request = requests.post(SPOTIFY_TOKEN_URL, data = code_payload, headers = headers)
    response_data = json.loads(post_request.text)
    print(response_data, file=sys.stderr)
    TOKEN = response_data["access_token"]
    refresh_token = response_data["refresh_token"]
    token_type = response_data["token_type"]
    expires_in = response_data["expires_in"]

    return redirect("http://localhost:8080/callback")


@app.route('/token')
def tokenroute():
    global TOKEN
    return jsonify(TOKEN)
