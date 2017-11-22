Web Interface
=============

Install
-------

1. Install node (nodejs.org), the version I used is node v0.10.22 and npm 1.3.14
2. Backend

  cd malwurl-server && npm install

3. Frontend

4. Configure your webserver to serve the frontend folder  

Configure
---------



Run
---

1. Backend

  cd malwurl-server && npm start

2. Frontend: visit http://[your-ip]:3000

Known bugs
----------

* On the index page

Description:
  1. start htop
  2. stop htop
  3. switch to another page
  4. go back to the In Progress page
  5. start htop
  It should retrieve data again

  work around by the user:
  1. then stop htop
  2. start again

* On the dataset page, datasets should be sorted by last upload date
* No form validation and file type validation for new datasets
* Sometimes if the dataset is big (100,000 lines for e.g.), after uploading a dataset, you need to reload the page to see the new dataset
* No form validation for new experiment, used default value to try to diminish damages
* In malwurl-server, extend method for models doesn't like same method names for different objects

* For experiment progress bar, when you know you are at 100% thanks to websockets, we don't update the store object. We need to refresh the page to have the experiment in the completed tab.

* The experiment completion date is kind of fake, it's the date where a visitor browsed on the interface and see the finished task for the first time

Credits
-------

htop feature adapted from https://github.com/krampstudio/node-htop

