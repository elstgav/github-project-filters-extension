import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import { User } from 'src/models'

import SelectButton from 'components/SelectButton'
import BaseFilter from 'components/Filters/BaseFilter'

export default class AssigneeFilter extends BaseFilter {
  static ALL_ASSIGNEES = { id: '@all',        val: 'All'        }
  static UNASSIGNED    = { id: '@unassigned', val: 'Unassigned' }

  static propTypes = {
    ...BaseFilter.propTypes,

    assignees: PropTypes.arrayOf(PropTypes.instanceOf(User)),
    onChange:  PropTypes.func.isRequired,
  }

  static defaultState = {
    selectedAssignee: AssigneeFilter.ALL_ASSIGNEES,
  }

  onChange = (assignee) => {
    this.setState({
      selectedAssignee: assignee,
    }, this.props.onChange)
  }

  hydrateCachedState(cachedState) {
    const hydratedState = super.hydrateCachedState(cachedState)
    if (isEmpty(hydratedState)) return hydratedState
    if (hydratedState.selectedAssignee.id.startsWith('@')) return hydratedState

    hydratedState.selectedAssignee = new User(cachedState.selectedAssignee)

    return hydratedState
  }

  shouldDisplayCard(card) {
    const assignees = JSON.parse(card.dataset.cardAssignee || '[]')

    if (this.state.selectedAssignee.id === AssigneeFilter.ALL_ASSIGNEES.id) return true
    if (this.state.selectedAssignee.id === AssigneeFilter.UNASSIGNED.id) return isEmpty(assignees)

    return assignees.includes(this.state.selectedAssignee.login.toLowerCase())
  }


  render() {
    const assigneeOptions = [
      AssigneeFilter.ALL_ASSIGNEES,
      AssigneeFilter.UNASSIGNED,
      ...this.props.assignees,
    ]

    return (
      <SelectButton
        className="mr-2"
        type="Assignee"
        options={assigneeOptions}
        onChange={this.onChange}
        initialSelection={this.state.selectedAssignee}
      />
    )
  }
}
