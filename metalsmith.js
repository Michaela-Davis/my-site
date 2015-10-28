var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var permalinks = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');
//var layouts = require('metalsmith-layouts');
var templates = require('metalsmith-react-templates');
var define = require('metalsmith-define');
var fileMetadata = require('metalsmith-filemetadata');
var dateInFile = require('metalsmith-date-in-filename');
var branch = require('metalsmith-branch');

var metalsmith = Metalsmith(__dirname)
  .source('./source/_posts')
  //.source('./tests')
  .clean(false)
  .destination('./public')
  .use(branch('**/*.md')
    .use(markdown())
  )
  .use(branch('**/*.{md,html}')
    .use(dateInFile())
    //.use(permalinks({
    //  pattern: ':date/:title',
    //  date: 'YYYY'
    //}))
    .use(fileMetadata([
      {
        pattern: '**/*.{md,html}',
        preserve: true,
        metadata: {
          section: 'blog',
          rtemplate: 'post.jsx'
        }
      }
    ]))
    //.use(function(files, metalsmith, done) {
    //console.log(files);
    //  console.log(metalsmith.metadata());
    //})
    .use(templates({
      isStatic: false,
      directory: './src/templates',
      requireIgnoreExt: ['.scss'],
      babel: true
      //baseFile: 'base.html'
    }))
  )
  .build(function (err, files) {
    if (err) {
      console.log('Error!');
      console.log(err);
      console.log(files);
      throw err;
    }
  });
