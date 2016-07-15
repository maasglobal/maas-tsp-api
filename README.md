# MaaS TSP (Transport Service Provider) API

This is the MaaS Transport service provider API repository, containing a test suite, reference implementation and specifications. Using these documents, a third party transport service provider can implement a MaaS compatible API.

Up-to-date documentation is published at [API docs](http://maasglobal.github.io/maas-tsp-api/).

For a brief walk through of a booking process [see here](specs/Booking.md)

## Building the documentation

Building the documentation:

    npm run-script build  # builds the documentation
    npm start	          # starts the development server
    
Updating the documentation (MaaS contributors) [using git subtrees for gh-pages](https://gist.github.com/cobyism/4730490):

    git subtree push --prefix docs origin gh-pages
