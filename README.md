# asd-kamieniarstwo
It's just a simple webpage for a customer.
### First installation 
`npm build` - downloads all the libares.
### Gulp comands 
`gulp` - it runs the local server on port "3000" with reloading on save and compiles scss.
`gulp minbuild` - it's the fastes npm build without deleting unused classes adding prefixes minifying files and generating favicons 
`gulp build` - it's a full build (with one takes half minute) of the website, includes:
- generating favicon,
- compiling scss deleting unused classes, adding prefixes and minifying it.
- transpile js to old one using babel 
- minifying html
- coping json files


