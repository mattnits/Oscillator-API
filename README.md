# Oscillator-API
Current Version (0.1)    
  
This API is designed on top of the [Spotify Web Api](https://developer.spotify.com/discover/) and allows users to quickly
query songs and get recommendations based off of those queries. The API's design was intended for DJ's so that they could
find tracks to mix based off key and tempo however it can provide many different uses for anyone.

API was built and maintained by Matthew Nitsopoulos.
Please credit me when using the API in other projects.

## Contents
---
* [Getting Started](##GettingStarted)
* [Features](##Features)  
* [Data References](##DataReferences)
* [Related Projects](##RelatedProjects)  
* [Usage](##Usage)  
* [Examples](##Examples)  
* [Development](##Development)  

## Getting Started
---
To test if the API is working, click [this](https://api-oscillator.herokuapp.com/) or copy "https://api-oscillator.herokuapp.com/" into the browser of your choice!  
<br>
It may take a few moments but if everything worked correctly you should recieve a screen like this:
![](test.png)

## Features
---
The API has two main features at this time:
### **Search**:
**Paramaters**  
- song - (REQUIRED) - The name of the song that is being searched for  
- artist - (REQUIRED) - The name of the artist that is being searched for  

**Returns** 
- JSON Object - A JSON object full of songs and their features  

**Example**  
<br>
If I want to search for Thunderstruck by AC/DC I would use:
https://api-oscillator.herokuapp.com/search?artist=AC%2FDC&song=Thunderstruck
<br>

### **RecommendExact**:
**Paramaters**  
- songID - (REQUIRED)   - The spotify ID of the song that is being used 
- artistID - (REQUIRED) - The spotify ID of the artist that is being used 
- key - (OPTIONAL)      - The key of music that will be used (NOTE: Value is an Integer between 0 and 11. Refer to [KeyChart] for more)
- bpm - (OPTIONAL)      - The spotify ID of the artist that is being used 

**Returns** 
- JSON Object - A JSON object full of songs and their features  

**Example**  
<br>
If I want to search for Thunderstruck by AC/DC I would use:
https://api-oscillator.herokuapp.com/search?artist=AC%2FDC&song=Thunderstruck

##Data References
---
###KeyChart

## Related Projects
---

## Usage
---

## Examples
---

## Developement
---


