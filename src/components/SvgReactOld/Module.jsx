const Module = (id, type, x, y) => {
  return {
    id,
    type,
    locale: '',
    x,
    y,
    h: 50,
    w: 50,
    link: [],
    connect: [],
    fill: 'white',
    stroke: 'green',
    mx: x,
    my: y,
  };
};

export default Module
