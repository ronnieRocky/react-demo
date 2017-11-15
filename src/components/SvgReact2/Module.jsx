

const Module = (id, type, x, y) => {
    return {
        id: id,
        type: type,
        locale: "",
        x: x,
        y: y,
        h: 50,
        w: 50,
        link: [],
        connect: [],
        fill: "white",
        stroke: "green",
        mx: x,
        my: y,
    };
};

export default Module