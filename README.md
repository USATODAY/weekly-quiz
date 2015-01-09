#weekly-quiz

Weekly News Quiz


Copyright 2015 USA TODAY. All rights reserved. No part of these materials may be reproduced, modified, stored in a retrieval system, or retransmitted, in any form or by any means, electronic, mechanical or otherwise, without prior written permission from USA TODAY.
##Development

The requirements for this project are Node.js, Bower and Grunt. 

To install node with Hombrew:
`brew install node`

Or head over to the [Node website](http://nodejs.org/) and install from there.
Once Node is installed, install Grunt with
`npm install -g grunt-cli`

and install Bower with 
`npm install -g bower`

Once those dependencies are set up, from this repository run `npm install`, then run `bower install`, then run `grunt`

##Javascript tests

Tests are stored in the spec folder, and written using the [Jasmine](http://jasmine.github.io/) spec. To run tests, run `grunt test`. 

##Deployment

This project assumes you want to deploy to the Gannett-CDN in part and will be publishing via Static-O-Matic. When you're ready to deploy, run `grunt deploy`. This assumes you have USA TODAY's FTP credentials stored on your machine. 

##Assetts

Images, videos, and other assetts should be stored outside this repo on the CDN. Please use absolute URLs for all linked assetts. This will aid in the publishing process.