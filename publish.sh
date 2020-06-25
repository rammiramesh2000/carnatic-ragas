#!/usr/bin/env bash

python parse.py
git add *
git commit -m 'add songs'
git push origin master