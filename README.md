# Oscillator-API
Current Version (0.1) **Still in Production/Testing**   
  
This API is designed on top of the [Spotify Web Api](https://developer.spotify.com/discover/) and allows users to quickly
query songs and get recommendations based off of those queries. The API's design was intended for DJ's so that they could
find tracks to mix based off key and tempo however it can provide many different uses for anyone.

API was built and maintained by Matthew Nitsopoulos.
Please credit me when using the API in other projects.

## Contents

* [Getting Started](#Getting-Started)
* [Features](#Features)  
* [Data References](#Data-References)
* [Related Projects](#Related-Projects)  
* [Usage](#Usage)  
* [Examples](#Examples)  
* [Development](#Development)  

## Getting Started

To test if the API is working, click [this](https://api-oscillator.herokuapp.com/) or copy "https://api-oscillator.herokuapp.com/" into the browser of your choice!  
<br>
It may take a few moments but if everything worked correctly you should recieve a screen like this:
![](test.png)

## Features

The API has two main features at this time:
### **Search**:
**Paramaters**  
- song - (REQUIRED) (String) - The name of the song that is being searched for  
- artist - (REQUIRED) (String) - The name of the artist that is being searched for  

**Returns** 
- JSON Object - A JSON object full of songs and their [attributes](#Song-Attributes)  

**Example**  
  
If you want to search for "Thunderstruck" by "AC/DC" you would use:
https://api-oscillator.herokuapp.com/search?artist=AC%2FDC&song=Thunderstruck
---

### **RecommendExact**:
**Paramaters**  
- songID - (OPTIONAL) (String)   - The spotify ID of the song that is being used 
- artistID - (REQUIRED) (String) - The spotify ID of the artist that is being used 
- key - (OPTIONAL) (Integer)     - The key of music that will be used (NOTE: Value is an Integer between 0 and 11. Refer to [KeyChart](#Key-Chart) for more info)
- bpm - (OPTIONAL) (Integer)     - The tempo of the music that will be used

**Returns** 
- JSON Object - A JSON object full of songs and their [attributes](#Song-Attributes) 

**Example**  
  
If you want to search for "Strangers" by "Seven Lions" you would use:
https://api-oscillator.herokuapp.com/recommend?artistID=6fcTRFpz0yH79qSKfof7lp&songID=2U0pVx4m1Kdm1Gsjjm6iq8 


## Data References

### Song Attributes
- SongName      - Name of the song (Ex. Strangers)
- Artists       - List of artists who contributed to the song (ex. Seven Lions, Myon, Shane 54, Tove Lo)
- Key           - Key that the song is in (ex. C)
- Mode          - If the song is in a major or minor key (ex. minor)
- Tempo         - The tempo of the song in Beats Per Minute (ex. 130)
- Duration      - The length of the song in seconds (ex. 204)
- songID        - Spotify's ID of the song (ex. 2U0pVx4m1Kdm1Gsjjm6iq8)
- artistID      - List of artist ID's (ex. ["6fcTRFpz0yH79qSKfof7lp", "0nTbVTXLLbBA4xCtn0cFkv", "2ITbqEgyp32vL3BxEFmQ1V", "4NHQUGzhtTLFvgF5SZesLK"])
- albumImage    - The link to the image of the album (ex. https://i.scdn.co/image/ab67616d0000b273b7c6ba06170910b38d202cf4)


### KeyChart  
- 0 -> C
- 1 -> C#
- 2 -> D
- 3 -> D#
- 4 -> E
- 5 -> F
- 6 -> F#
- 7 -> G
- 8 -> G#
- 9 -> A
- 10 -> A#
- 11 -> B


## Related Projects


## Usage


## Examples


## Developement



