# Pothole Patrol

Pothole Patrol is a comprehensive pothole management system for Chicago, built using real data from 30,000 pothole service requests submitted this year. With it, residents can report potholes, Chicago administrators can oversee pothole repair, and city crew members can access their daily repair assignments and update admins on their progress.

* View our backend and web repo: https://github.com/team-311/pothole-patrol-web
* See our deployed app on Heroku: https://pothole-patrol-fullstack.herokuapp.com

## Why

Pothole Patrol was created by four city of Chicago residents as their capstone project at FullStack Academy. As city residents, they were all too familiar with the condition of Chicago's asphalt-patchworked streets and were excited to develop a tool that could be used to address the issue. 

## Unique Features 

* Users have the chance to upvote potholes that already exist in the city of Chicago's database, which helps provide visibility into which ones are the most urgent. 
* Pothole Patrol's scheduling system finds the most urgent potholes and sends them for repair most quickly. It was implemented by using an algorithm that ranks potholes based on their upvotes and the number of days they’ve been open and sends them to work crews who are nearby. 

## Tech and Frameworks

* React / Redux
* React Native
* Expo 
* Victory JS 
* Node JS
* Sequelize 
* PostgreSQL
* PostGIS
* Google Maps Platform APIs 

## Using the App

#### For residents 

Using our app, residents can both report new potholes or upvote potholes that already exist. 
They can also view potholes that they've already reported or upvoted to keep track of their status. 

#### For city administrators 

City admins can view high-level analytics regarding potholes in Chicago. 
They can also navigate to view individual potholes and check and update their status. 
Or view orders for pothole repair and contact the crews assigned. 

#### For city crew members 

Crew members can view their orders assignments for the day and the first pothole they have been assigned. 
They can view directions to the pothole, see its details, and mark it as completed when it is done. 
They can request the next pothole, which will be assigned to them based on its priority level. 
At the end of the day, they can close out their work order. 
At any time, they can view their completed work orders and their details. 

<iframe src="https://giphy.com/embed/Ta1Rt7mjIhoSSTnzQR" width="268" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/Ta1Rt7mjIhoSSTnzQR">via GIPHY</a></p>
