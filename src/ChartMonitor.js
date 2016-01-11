import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import * as themes from 'redux-devtools-themes';
import { ActionCreators } from 'redux-devtools';
import deepmerge from 'deepmerge';

import reducer from './reducers';
import Chart from './Chart';
const { reset, rollback, commit, sweep, toggleAction } = ActionCreators;

const styles = {
  container: {
    fontFamily: 'monaco, Consolas, Lucida Console, monospace',
    position: 'relative',
    overflowY: 'hidden',
    width: '100%',
    height: '100%',
    minWidth: 300
  }
};

class ChartMonitor extends Component {
  static update = reducer;

  static propTypes = {
    dispatch: PropTypes.func,
    computedStates: PropTypes.array,
    actionsById: PropTypes.object,
    stagedActionIds: PropTypes.array,
    skippedActionIds: PropTypes.array,
    monitorState: PropTypes.shape({
      initialScrollTop: PropTypes.number
    }),

    preserveScrollTop: PropTypes.bool,
    select: PropTypes.func.isRequired,
    theme: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ])
  };

  static defaultProps = {
    select: (state) => state,
    theme: 'nicinabox',
    preserveScrollTop: true
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    this.handleToggleAction = this.handleToggleAction.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleRollback = this.handleRollback.bind(this);
    this.handleSweep = this.handleSweep.bind(this);
    this.handleCommit = this.handleCommit.bind(this);
  }

  handleRollback() {
    this.props.dispatch(rollback());
  }

  handleSweep() {
    this.props.dispatch(sweep());
  }

  handleCommit() {
    this.props.dispatch(commit());
  }

  handleToggleAction(id) {
    this.props.dispatch(toggleAction(id));
  }

  handleReset() {
    this.props.dispatch(reset());
  }

  getTheme() {
    let { theme } = this.props;
    if (typeof theme !== 'string') {
      return theme;
    }

    if (typeof themes[theme] !== 'undefined') {
      return themes[theme];
    }

    console.warn('DevTools theme ' + theme + ' not found, defaulting to nicinabox');
    return themes.nicinabox;
  }

  getChartStyle() {
    const theme = this.getTheme();

    return {
      width: '100%',
      height: '100%',
      node: {
        colors: {
          'default': theme.base0B,
          collapsed: theme.base0B,
          parent: theme.base0E
        },
        radius: 7
      },
      text: {
        colors: {
          'default': theme.base0D,
          hover: theme.base06
        }
      }
    };
  }

  getChartOptions(props = this.props) {
    const { computedStates } = props;

    const tooltipOptions = {
      disabled: false,
      offset: {left: 30, top: 10},
      indentationSize: 2,
      style: {
        'background-color': 'lightgrey',
        'opacity': '0.7',
        'border-radius': '5px',
        'padding': '5px'
      }
    };

    const defaultOptions = {
      state: computedStates[computedStates.length - 1].state,
      isSorted: false,
      heightBetweenNodesCoeff: 1,
      widthBetweenNodesCoeff: 1.3,
      tooltipOptions,
      style: this.getChartStyle()
    };

    return deepmerge(defaultOptions, props);
  }

  render() {
    const theme = this.getTheme();

    return (
      <div style={{...styles.container, backgroundColor: theme.base07}}>
        <Chart {...this.getChartOptions()} />
      </div>
    );
  }
}

export default ChartMonitor;
