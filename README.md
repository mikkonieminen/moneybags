# Moneybags
A simple stock portfolio app for value investing.

## Getting started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
```
Node 4.x.x or later
```

### Development
Run these commands to run the application in development
```
npm install
npm run dev
```

### Configurations
Configurations for all environments can be found in the config-folder. If not using 
the default API update at least the API_BASE_URL variable.

## Deployment

### Running in production
Run the following command to build the application ready for production
```
npm run build
```
Copy the content from the dist-folder to your desired web-server.
