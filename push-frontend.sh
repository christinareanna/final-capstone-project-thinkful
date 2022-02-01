#!/bin/bash

cd front-end
git init
git add .
git commit -am "deploy"
git push --force https://git.heroku.com/final-capstone-front-end.git main
rm -rf .git
cd ..