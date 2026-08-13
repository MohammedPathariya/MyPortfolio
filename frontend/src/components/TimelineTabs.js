import React from 'react';
import portfolio from '../data/portfolio.generated';
import './TimelineTabs.css';

const byNewestEndDate = (left, right) => right.endDate.localeCompare(left.endDate);

const BackgroundGroup = ({ title, items, detailKey, titleKey, institutionKey }) => (
  <div className="background-group">
    <h3>{title}</h3>
    <div className="background-list">
      {items.sort(byNewestEndDate).map((item) => (
        <article className="background-entry" key={item.id}>
          <div className="background-meta">
            <span className="background-period">{item.period}</span>
            <span className="background-location">{item.location}</span>
          </div>
          <div>
            <h4>{item[titleKey]}</h4>
            <p className="background-institution">{item[institutionKey]}</p>
            <p className="background-detail">{item[detailKey][0]}</p>
          </div>
        </article>
      ))}
    </div>
  </div>
);

export default function TimelineTabs() {
  return (
    <section id="background" className="background-section">
      <div className="section-heading">
        <h2>The path here</h2>
        <span>research / engineering / systems</span>
      </div>
      <div className="background-groups">
        <BackgroundGroup
          title="Experience"
          items={[...portfolio.experience]}
          detailKey="points"
          titleKey="title"
          institutionKey="organization"
        />
        <BackgroundGroup
          title="Education"
          items={[...portfolio.education]}
          detailKey="details"
          titleKey="degree"
          institutionKey="institution"
        />
      </div>
    </section>
  );
}
