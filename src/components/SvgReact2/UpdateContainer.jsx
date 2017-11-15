import React from 'react';
import Rect from './Shape/Rect';
import Line from './Shape/Line';
import DraggableCore from 'react-draggable';
import Template from './Template';
import DragandZoom from './DragandZoom';
import { getTempcom, onDirect, onLineMath, onMiddleMath, onDirectMath, onTBLR, onPathTBLR } from './utils/Math';
import { rendomId, moduleFactory } from './utils/Func';

var temid;
export default class updateContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        isShow: false,
        totalContainer: [],
        moduleContainer: [],
        lineContainer: [],
        firstId: "",
        clickId: "",
        lastId: "",
        x: 0,
        y: 0,
        };
        
        this.click = this.click.bind(this);
        this.onDrag = this.onDrag.bind(this);
        this.onDragging = this.onDragging.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
    }


  click(id){

    if(temid===id){
      this.setState({
          isShow: !this.state.isShow,
          clickId: id,
        });
    }else{
       this.setState({
          isShow: true,
          clickId: id,
        });
    }
    temid=id;
  }

  onDrag(bol){
    this.setState({
      isShow: bol,
    });
  }

  onDragEnd(x, y){
    this.setState({
      x: x,
      y: y,
    });
  }

  onDragging (id, mx, my) {
    const con = this.state.moduleContainer;
    for (let i = 0; i < con.length; i++) {
      if (con[i].id === id) {
        if (con[i].mx !== mx || con[i].my !== my) {
          con[i].mx = mx;
          con[i].my = my;
        }

        const link = con[i].link;
        const self = { x: con[i].mx + con[i].x, y: con[i].my + con[i].y };

        const sid = con[i].id;
        const sourceConnect = con[i].connect;

        for (let j = 0; j < link.length; j++) {
          const tx = link[j].mx + link[j].x;
          const ty = link[j].my + link[j].y;
          const target = { x: tx, y: ty };

          const tid = link[j].id;
          const direct = onDirect(self, target);
          const tempcon = getTempcom(self.x, self.y, target.x, target.y, direct, link.length, j, con[i].locale);

          const skv = {};
          skv.key = sid;
          skv.value = tempcon;

          const tkv = {};
          tkv.key = tid;
          tkv.value = tempcon;

          const targetConnect = link[j].connect;
          targetConnect.filter(e => e.key === skv.key).forEach(ev => {
            ev.value.length = 0;
            ev.value = [...skv.value];
          });
          link[j].connect = targetConnect;

          sourceConnect.filter(e => e.key === tkv.key).forEach(ev => {
            ev.value.length = 0;
            ev.value = [...tkv.value];
          });
          con[i].connect = sourceConnect;
        }
      }

      let tem = [];
      for (let s = 0; s < con.length; s++) {
        for (let n = 0; n < con[s].connect.length; n++) {
          tem = [...tem, ...con[s].connect[n].value];
        }
      }

      this.setState({
        lineContainer: [...tem],
      });
    }
  }
  
  
    render(){
        const { module } = this.props;
        return(
            <DragandZoom shape={module}  onDragEnd={this.onDragEnd} onDrag={this.onDrag} onDragging={this.onDragging}  onClick={this.click} />
        )
    }
}