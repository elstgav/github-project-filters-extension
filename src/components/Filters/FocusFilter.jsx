import React from 'react'
import PropTypes from 'prop-types'

import { App } from 'src/models'

import Button from 'components/Button'
import BaseFilter from 'components/Filters/BaseFilter'

export default class FocusFilter extends BaseFilter {
  static propTypes = {
    ...BaseFilter.propTypes,

    onChange:    PropTypes.func.isRequired,
  }

  static defaultState = {
    toggled: false,
  }

  onClick = () => {
    this.setState({
      toggled: !this.state.toggled,
    }, this.props.onChange)
  }

  shouldDisplayCard(card) {
    if (!this.state.toggled) return true

    const assignees = JSON.parse(card.dataset.cardAssignee || '[]')
    return assignees.length === 0 || assignees.includes(App.currentUser)
  }

  shouldDisplayColumn(column) {
    if (!this.state.toggled) return true
    return column.dataset.id !== '1239586' // Backlog column
  }

  render() {
    return (
      <Button active={this.state.toggled} onClick={this.onClick} className="mr-2">
        Focus
      </Button>
    )
  }
}
