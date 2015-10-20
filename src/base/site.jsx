var React = require('react');
var Header = require('../components/header');

var Site = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
        </head>
        
        <body>
          <Header />
          {this.props.children}
        </body>
      </html>
    )
  }
});
      
module.exports = Site;
      