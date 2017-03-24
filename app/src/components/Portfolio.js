import React from 'react/lib/React';

const Portfolio = ({
  routeParams: {id}
}) =>  {
  const allList = [
    { id: 0, text: 'portfolio #0' },
    { id: 1, text: 'portfolio #1' }
  ];
  const filterList = id ? allList.filter(v => v.id === +id) : allList;
  const renderList = filterList.map(v =>
    <li key={v.id}>{v.text}</li>
  );
  return (
    <div>
      <h2>Portfolio</h2>
      <ul>{renderList}</ul>
    </div>
  );
};

export default Portfolio;