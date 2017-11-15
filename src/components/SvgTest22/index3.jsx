import React from 'react';
import SRD from 'storm-react-diagrams';
// import './a.css';
import './style.less';

class SvgTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.test = this.test.bind(this);
  }

  test() {
  }
	// ReactDOM.render(React.createElement(SRD.DiagramWidget,{diagramEngine: engine}), document.body);
  render() {
    const s = sa => console.log(sa);
    const engine = new SRD.DiagramEngine();
    s(engine)
    engine.registerNodeFactory(new SRD.DefaultNodeFactory());
    engine.registerLinkFactory(new SRD.DefaultLinkFactory());

        //2) setup the diagram model
    const model = new SRD.DiagramModel();

        //3-A) create a default node
    const node1 = new SRD.DefaultNodeModel('Node 1', 'rgb(0,192,255)');
    const port1 = node1.addPort(new SRD.DefaultPortModel(false, 'out-1', 'Out'));
    node1.x = 100;
    node1.y = 100;
    s('-------nodel')
    s(node1)

        //3-B) create another default node
    const node2 = new SRD.DefaultNodeModel('Node 2', 'rgb(192,255,0)');
    const port2 = node2.addPort(new SRD.DefaultPortModel(true, 'in-1', 'IN'));
    node2.x = 400;
    node2.y = 100;

        //3-C) link the 2 nodes together
    const link1 = new SRD.LinkModel();
    link1.setSourcePort(port1);
    link1.setTargetPort(port2);
    s('-------link1')
    s(link1)

        //4) add the models to the root graph
    model.addNode(node1);
    model.addNode(node2);
    model.addLink(link1);
    s('---model----model')
    s(model)

        //5) load model into engine
    engine.setDiagramModel(model);
    s('---engine----engine')
    s(engine)
    // ReactDOM.render(React.createElement(SRD.DiagramWidget,{diagramEngine: engine}), document.body);
    return (
      <SRD.DiagramWidget diagramEngine={engine} />
    );
  }
}

export default SvgTest;

