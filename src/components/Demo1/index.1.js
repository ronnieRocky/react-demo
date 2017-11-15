import React from 'react';
import ReactDOM from 'react-dom';
import * as RJD from 'react-js-diagrams';
import './style.css';

/**
 *
 * Simple test showing the Object oriented way of using this library.
 * It creates 2 nodes and links them together with a single link
 *
 */
export default class Demo1 extends React.Component {
  constructor(props) {
    super(props);

    // Setup the diagram engine
    this.engine = new RJD.DiagramEngine();
    this.engine.registerNodeFactory(new RJD.DefaultNodeFactory());
    this.engine.registerLinkFactory(new RJD.DefaultLinkFactory());
    // Setup the diagram model
    this.model = new RJD.DiagramModel();
  }

  componentDidMount() {
    setTimeout(() => {
      this.testSerialization();
    }, 1000);
  }

  createNode(options) {
    const { name, color, x, y } = options;
    const node = new RJD.DefaultNodeModel(name, color);
    node.x = x;
    node.y = y;
    return node;
  }

  createPort(node, options) {
    const { isInput, id, name } = options;
    return node.addPort(new RJD.DefaultPortModel(isInput, id, name));
  }

  linkNodes(port1, port2) {
    const link = new RJD.LinkModel();
    console.log(link)
    link.setSourcePort(port1);
    link.setTargetPort(port2);
    return link;
  }

  testSerialization() {
    const { engine, model } = this;

    // We need this to help the system know what models to create form the JSON
    engine.registerInstanceFactory(new RJD.DefaultNodeInstanceFactory());
    engine.registerInstanceFactory(new RJD.DefaultPortInstanceFactory());
    engine.registerInstanceFactory(new RJD.LinkInstanceFactory());

// // Serialize the model
//     const str = JSON.stringify(model.serializeDiagram());

// // Deserialize the model
//     const model2 = new RJD.DiagramModel();
//     model2.deSerializeDiagram(JSON.parse(str), engine);
//     engine.setDiagramModel(model2);
  }

  render() {
    const { engine, model } = this;

    // Create first node and port
    const node1 = this.createNode({
      name: 'Node 1',
      color: 'rgb(0, 192, 255)',
      x: 100,
      y: 100,
    });
    const port1 = this.createPort(node1, {
      isInput: false,
      id: 'out-1',
      name: 'Out',
    });

    // Create second node and port
    const node2 = this.createNode({
      name: 'Node 2',
      color: 'rgb(192, 255, 0)',
      x: 400,
      y: 100,
    });
    const port2 = this.createPort(node2, {
      isInput: true,
      id: 'in-1',
      name: 'In',
    });

    // Create second node and port
    const node3 = this.createNode({
      name: 'Node 3',
      color: 'rgb(122, 215, 10)',
      x: 300,
      y: 300,
    });
    const port3 = this.createPort(node3, {
      isInput: true,
      id: 'in-2',
      name: 'In2',
    });

    // Add the nodes and link to the model
    model.addNode(node1);
    model.addNode(node2);
    model.addLink(this.linkNodes(port1, port2));

// Load the model into the diagram engine
    engine.setDiagramModel(model);
    console.log(model)
// Render the canvas
    return <RJD.DiagramWidget
      diagramEngine={engine}
    />;
  }
}

