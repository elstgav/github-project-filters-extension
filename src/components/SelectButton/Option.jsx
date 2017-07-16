import React from 'react'
import PropTypes from 'prop-types'

import Icon   from 'components/Icon'

import OptionVal from './OptionVal'


export default class Option extends React.Component {
  static defaultProps = {
    id:       null,
    selected: false,
  }

  static propTypes = {
    selected: PropTypes.bool,
    onClick:  PropTypes.func.isRequired,
    option:   PropTypes.shape(OptionVal.propTypes.option).isRequired,
  }

  constructor(props) {
    super(props)
    this.state = { isHovered: false }
  }

  onMouseEnter = () => this.setState({ isHovered: true  })
  onMouseLeave = () => this.setState({ isHovered: false })

  onClick = () => {
    this.props.onClick(this.props.option.id)
  }

  render() {
    return (
      <li
        aria-selected={this.props.selected}
        className={`select-menu-item ${this.props.selected && 'selected'} ${this.state.isHovered && 'navigation-focus'}`}
        onClick={this.onClick}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        role="option"
      >
        <Icon icon="check" className="select-menu-item-icon" />
        <OptionVal option={this.props.option} />
      </li>
    )
  }
}
