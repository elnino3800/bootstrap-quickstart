# angular-quickstart

Quickstart app with angular 1, bootstrap-sass and routing with ui-route.
It's prepared for multiple angular module.

##Prerequisites
You need:
* Node - [https://nodejs.org/](https://nodejs.org/)
* Git - [https://git-scm.com/](https://git-scm.com/)

##Geting started

###Clone
```
git clone --depth=1 https://github.com/elnino3800/angular-quickstart.git <your-project-name>
cd <your-project-name>
```
        
###Install
```
npm install
```

###Run
```
gulp
```
(run default gulp task) - run watching sass files, start browser-sync server and open browser with running app

###Build
```
gulp build
```
create dist directory with minification, uglification, copyfication, ... :)
    
##Gulp
Task runner for develop, deploy, test, etc. [http://gulpjs.com/](http://gulpjs.com/)
    
###Gulp tasks:
* sass - compile scss(sass) file into css
* watch - watching folder with scss files changes and run sass task on change
* browserSync - run server and open browser - serving files from src directory
* browserSyncDist - run server and open browser - serving files from dist directory
* dist - shortcut for browserSyncDist task

* build - build distribution
    * clean - clean dist directory
    * html - copy html from src to dist directory
    * templates - copy html templates from src/app directory and create angular module with template cache
    * fonts - copy fonts from src to dist directory
    * images - copy images from src to dist directory
    * buildIndex - process index.html from src, merge css and js to one file. Do uglification and minification. Ad revision number to js and css.
    * cleanBuild - clean after build