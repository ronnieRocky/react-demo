

const Shape = (id,type,x,y)=>{ 
    return {
            id : id,
            type : type,
            locale: "",
            x : x,
            y : y,
            h : 100,
            w : 100,
            link : [],
            connect:[],
            fill : "white",
            stroke : "green",
            mx : x,
            my : y,
    };
};

export default Shape