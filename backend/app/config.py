"""All environment variables"""
import os

client_id = os.environ['CLIENT_ID']
client_secret = os.environ['CLIENT_SECRET']
redirect_uri = os.environ['REDIRECT_URI']
access_scope = 'user-library-read'

origins = [
  'http://localhost',
  'https://accounts.spotify.com'
]