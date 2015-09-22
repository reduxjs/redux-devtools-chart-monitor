import React, { PropTypes, Component } from 'react';
import * as themes from 'redux-devtools/lib/react/themes';
import deepmerge from 'deepmerge';
import Chart from './Chart';

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

export default class ChartMonitor extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    computedStates: PropTypes.array.isRequired,
    currentStateIndex: PropTypes.number.isRequired,
    monitorState: PropTypes.object.isRequired,
    stagedActions: PropTypes.array.isRequired,
    skippedActions: PropTypes.object.isRequired,
    reset: PropTypes.func.isRequired,
    commit: PropTypes.func.isRequired,
    rollback: PropTypes.func.isRequired,
    sweep: PropTypes.func.isRequired,
    toggleAction: PropTypes.func.isRequired,
    jumpToState: PropTypes.func.isRequired,
    setMonitorState: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
    visibleOnLoad: PropTypes.bool
  };

  static defaultProps = {
    select: (state) => state,
    monitorState: {isVisible: true},
    theme: 'nicinabox',
    visibleOnLoad: true
  };

  getTheme() {
    let theme;

    if (typeof this.props.theme === 'string') {
      if (typeof themes[this.props.theme] !== 'undefined') {
        theme = themes[this.props.theme];
      } else {
        console.warn('DevTools theme ' + this.props.theme + ' not found, defaulting to nicinabox');
        theme = themes.nicinabox;
      }
    } else {
      theme = this.props.theme;
    }

    return theme;
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

    const defaultOptions = {
      state: computedStates[computedStates.length - 1].state,
      isSorted: false,
      heightBetweenNodesCoeff: 1,
      widthBetweenNodesCoeff: 1.3,
      tooltipOptions: {disabled: true},
      style: this.getChartStyle()
    };

    return deepmerge(defaultOptions, props);
  }

  componentWillMount() {
    let visibleOnLoad = this.props.visibleOnLoad;
    const { monitorState } = this.props;
    this.props.setMonitorState({
      ...monitorState,
      isVisible: visibleOnLoad
    });
  }

  render() {
    const theme = this.getTheme();

    return (
      <div style={{...styles.container, backgroundColor: theme.base00}}>
        <Chart {...this.getChartOptions()} />
      </div>
    );
  }
}
