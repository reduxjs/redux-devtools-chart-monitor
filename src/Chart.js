import React, { PropTypes, Component } from 'react';
import visualizer from 'd3-state-visualizer';

export default class Chart extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    state: PropTypes.object,
    rootKeyName: React.PropTypes.string,
    pushMethod: React.PropTypes.string,
    tree: PropTypes.shape({
      name: PropTypes.string,
      children: PropTypes.array
    }),
    id: PropTypes.string,
    style: PropTypes.object,
    size: PropTypes.number,
    aspectRatio: PropTypes.number,
    isSorted: React.PropTypes.bool,
    heightBetweenNodesCoeff: React.PropTypes.number,
    widthBetweenNodesCoeff: React.PropTypes.number,
    transitionDuration: React.PropTypes.number,
    tooltipOptions: PropTypes.shape({
      left: PropTypes.number,
      top: PropTypes.number,
      offset: PropTypes.shape({
        left: PropTypes.number,
        top: PropTypes.number
      }),
      indentationSize: PropTypes.number
    })
  };

  componentDidMount() {
    this.renderChart = visualizer.charts.tree(React.findDOMNode(this), this.props);
    this.renderChart();
  }

  componentWillReceiveProps(nextProps) {
    const { state } = nextProps;
    this.renderChart(state);
  }

  render() {
    return <div/>;
  }
}
