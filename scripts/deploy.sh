#!/usr/bin/env bash

# * https://blog.bloomca.me/2017/12/15/how-to-push-folder-to-github-pages.html

rm -rf gh-pages
cp -r build gh-pages
cd gh-pages
git init && git add .
git commit -m "Initial commit"
git remote add origin https://github.com/retho/organizer-pwa.git
git push --force origin master:gh-pages
