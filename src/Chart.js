import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';
import visualizer from 'd3-state-visualizer';

class Chart extends Component {
  static propTypes = {
    state: PropTypes.object,
    rootKeyName: PropTypes.string,
    pushMethod: PropTypes.string,
    tree: PropTypes.shape({
      name: PropTypes.string,
      children: PropTypes.array
    }),
    id: PropTypes.string,
    style: PropTypes.object,
    size: PropTypes.number,
    aspectRatio: PropTypes.number,
    isSorted: PropTypes.bool,
    heightBetweenNodesCoeff: PropTypes.number,
    widthBetweenNodesCoeff: PropTypes.number,
    transitionDuration: PropTypes.number,
    onClickText: PropTypes.func,
    tooltipOptions: PropTypes.shape({
      disabled: PropTypes.bool,
      left: PropTypes.number,
      top: PropTypes.number,
      offset: PropTypes.shape({
        left: PropTypes.number,
        top: PropTypes.number
      }),
      indentationSize: PropTypes.number,
      style: PropTypes.object
    })
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.renderChart = visualizer.charts.tree(findDOMNode(this), this.props);
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

export default Chart;
