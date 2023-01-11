---
title: Read Me
date: 2022-01-10
author: Allan Berry
---

# Brachio Read Me

Brachio is the working title for a project I've played with for a couple of years now, off and on.


## Run Dev Server

pnpm run dev


## Push to production

Production is set up at Netlify, so with the right origin, a simple git push to GitHub (origin) should do it. Netlify pulls the repo from GitHub on each push.  Pretty slick.

git push


## Importing

The database is a MongoDB instance at MongoDB Atlas.

mongoimport "mongodb+srv://ajb-db-1.c310m.mongodb.net" --db=brachio --username admin --password xxxx --collection arl --file /Users/allanberry/Projects/ajb-brachio/data/to_atlas/arls.json  --jsonArray

## API

TODO: endpoints

https://bcw-images.s3.us-west-1.amazonaws.com/brachio/visits/v1_0/ca_utoronto_library_3185385819_20050908182525/w320.png
https://vim9ip3utf.execute-api.us-west-1.amazonaws.com/latest/iiif/2/test%2Fuic.png/full/300,/0/default.png