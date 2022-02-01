#!/bin/bash

cd back-end
git init
git add .
git commit -am "deploy"
git push --force https://git.heroku.com/final-capstone-back-end.git main
rm -rf .git
cd ..