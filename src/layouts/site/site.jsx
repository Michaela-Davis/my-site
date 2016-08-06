const React = require('react');
const Markdown = require('../../global/markdown');
const SiteHeader = require('../../organisms/site-header/site-header');
const SiteFooter = require('../../organisms/site-footer/site-footer');
const Meta = require('../../molecules/meta/meta');
const Image = require('../../atoms/image');
const Home = require('./../../templates/home/home');
const PortfolioItem = require('./../../templates/portfolio-item/portfolio-item');
const LandingList = require('../../organisms/landing-list/landing-list');
const Search = require('./../../templates/search/search');
const util = require('../../0-base/util');
const path = require('path');

const Site = class extends React.Component {
  constructor(props) {
    super(props);
    this.newPage = this.newPage.bind(this);
  }

  newPage() {
    document.body.classList.remove('is-loading');

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // @todo only do this when going to a new page and trigger AFTER render
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    this.newPage();
  }

  componentDidUpdate() {
    this.newPage();
  }

  render() {
    const linkTags = (this.props.css ? this.props.css.map(css => (
      <link rel="stylesheet" href={css} key={css} />)
    ) : '');
    let img = null;
    if (this.props.featuredImage) {
      let myPath = (
        util.isPathRootRelative(this.props.featuredImage) ||
        util.isPathRemote(this.props.featuredImage)
      ) ? this.props.featuredImage
        : path.join(this.props.path, this.props.featuredImage);
      img = <Image src={myPath} className="featuredImage" />;
    }

    let Template;
    switch (this.props.template) {
      case 'home':
        Template = Home;
        break;
      case 'portfolio-item':
        Template = PortfolioItem;
        break;
      case 'search':
        Template = Search;
        break;
      default:
        Template = null;
        break;
    }

    let content;
    if (Template) {
      content = <Template {...this.props} />;
    } else if (this.props.landingPage) {
      content = (<LandingList
        {...this.props}
        items={this.props.site.pages.filter(page => page.section === this.props.section)}
      />);
    }

    return (
      <div className="site container">
        {linkTags}
        <SiteHeader {...this.props} />
        <main className="site__main page">
          <header className="page__header">
            {this.props.title ? (<h2 className="page__title">{this.props.title}</h2>) : ''}
            <Meta {...this.props} className="page__meta" />
          </header>
          <article className="page__contents">
            {img}
            <Markdown contents={this.props.contents} />
            {content}
          </article>
        </main>

        <SiteFooter {...this.props} />
      </div>
    );
  }
};

Site.propTypes = {
  css: React.PropTypes.arrayOf(React.PropTypes.string),
  featuredImage: React.PropTypes.string,
  path: React.PropTypes.string,
  title: React.PropTypes.string,
  template: React.PropTypes.string,
  contents: React.PropTypes.string,
  section: React.PropTypes.string,
  landingPage: React.PropTypes.bool,
  site: React.PropTypes.shape({
    pages: React.PropTypes.array,
  }),
};

module.exports = Site;
