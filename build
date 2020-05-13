#!/bin/sh

## Build the front-end Svelte app
cd frontend
npm i				# Install dependencies (frontend)
npm run build			# Compile Svelte code

## Install the frontend
cd ..
cp -a frontend/public backend/	# Copy the built Svelte code
cd backend/
npm i				# Install dependencies (backend)
npm start			# Start the server
