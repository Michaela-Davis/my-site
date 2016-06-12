'use strict';
const React = require('react');
const Card = require('../../molecules/card/card');

const LandingList = (props) => {
  let list = props.items.map((item, i) => {
    return (
      <aside className="landing-list__item" key={i}>
        <Card {...item} />
      </aside>
    );
  });
  return (
    <section className="landing-list">
      {list}
    </section>
  );
};

module.exports = LandingList;
