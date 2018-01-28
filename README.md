# Spoodfy

####

Music web application made with React powered by the Spotify Web API.

## Getting Started


Spotify web clone that is made using primarily React, other dependencies is listed under prerequisities. This web application lets your play tracks, add tracks to playlists, create new playlists, follow/unfollow artists and much more. Everything is done through the Spotify Web API. Which means any changes you do inside Spoodfy will reflect inside the Spotify Client.

### Preview gifs (Slightly outdated)
<img src="https://media.giphy.com/media/l0HUncly0ebHQEkKI/giphy.gif">
<img src="https://media.giphy.com/media/l0HU72JX9qJ29KDOE/giphy.gif">
<img src="https://media.giphy.com/media/26CaLqJjJLX1EiKdi/giphy.gif">

## To run the project

In order to run the project both the client app and the backend service have to be started.

Clone the repo and navigate into the project folder and open terminal

`cd backend` followed by `python3 main.py`

To start the client app `yarn run dev-server` in the project root directory


### Prerequisities

The backend service is written in python3 using the microframework Flask. The dependencies needed to run the backend service is listed inside /backend/requirements.txt

In order to run the client app yarn / npm needs to be installed on your system.
Then run yarn install / npm install in the root directory to install all dependencies. Then the application can be launched using `yarn run dev-server`


## Deployment

TBA - I need to add a webpack production build config to the project. Currently there is only a dev build available.

# To deploy the system:

TBA

## Built With

* React
* Redux
* Redux-Saga
* Redux-Form
* React-Router-Dom
* Axios


## Documentation

### Axios Configuration

All the requests towards the Spotify API are made with Axios.

When logging in to the application the access token retrieved from the spotify API is set in the Axios configuration:
`axios.defaults.headers.common.Authorization = Bearer ${token}`
This will include the access token in all requests towards the spotify api without having to provide it manually with every requests.

As the backend provides a refresh token endpoint the login procedure also attaches an axios interceptor that detects requests with http status 401 (Bad Authorization) which is a sign that the access token has expired. The interceptor will then try to refresh the token using the backend service. If it retrieves a new token it will retry the original failed request automatically. If fails to retrieve a new token it will clear session storage and logout the user.

Code

```javascript
axios.interceptors.response.use((response) => {
          return response;
      }, (error) => {
          let originalRequest = error.config;
          console.log(error.config);
          if (error.response.status === 401 && !originalRequest._retry) {
              originalRequest._retry = true;
              // console.log('Trying to refresh token');
              return axios.get('http://localhost:5000/refreshtoken')
                  .then((newToken) => {
                      store.dispatch(setToken(newToken.data));
                      axios.defaults.headers.common.Authorization = `Bearer ${newToken.data}`;
                      originalRequest.headers.Authorization = `Bearer ${newToken.data}`;
                      window.sessionStorage.setItem('token', newToken.data);
                      return Promise.resolve(axios(originalRequest));
                  }).catch((e) => {
                      console.log('Error refreshing token');
                      console.log(e);
                      store.dispatch(clearToken());
                      window.sessionStorage.removeItem('token');
                      history.push('/login');
                  });
          }
      });
```

### Audio

The Spotify API provides a 30 seconds long preview_url for songs (not all!). To play these songs an <audio> element. By providing the preview url as a source for the audio element it's possible play the songs. Code snippet:

```javascript

return (
    <audio
    ref={ (audio) => { this.audioElement = audio; } }
    id="audioPlayer"
    src={ preview_url }
    key="audio"
    id="audioPlayer"
    crossOrigin="anonymous"
    volume={ 0.05 }
    onTimeUpdate={ this.onTimeUpdate }
    onEnded={ this.props.onEnded }
    onLoadedData={ this.onLoaded }
    loop={ repeat }
    />
);

```
The above snippet shows the audioplayer.
Prop explanation:

***onTimeUpdate***

Called when the audio element makes progress in terms of time. This is used to update the progress bar which displays how much of the song that has been played.

***onEnded***

Called when the audio element is finished playing a track. Very useful in order to decide what to do next, such as play the next queue track or stop playing and so on.

***src***

The source of the track to be be played, i.e the url to the track

*** volume (WARNING: This prop does not seem to work) ***

The volume prop does not seem to work! Instead change the volume using the ref.

***loop***

Does exactly what It sounds like, it loops the current playing track.

#### How to play / pause the current track?

By utilizing the lifecycle method ComponentWillRecieveProps it's possible to know when to play or pause the current track. See code

```javascript

componentWillReceiveProps(nextProps) {

    if (!nextProps.isPlaying && this.props.isPlaying) {
        this.audioElement.pause();
    }

    if (nextProps.isPlaying && !this.props.isPlaying) {
        this.audioElement.play();
    }

}

```

This will tell the component to pause, if it's currently playing. And vice-versa.



## Authors

* **Anton Hellbe**    


## License

This project is licensed under the MIT License
