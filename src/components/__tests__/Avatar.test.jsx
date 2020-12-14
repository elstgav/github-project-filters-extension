import Avatar from 'components/Avatar'
import EnzymeTestWrapper from 'test/support/EnzymeTestWrapper'

import { cachedUser } from 'test/fixtures'

const test = new EnzymeTestWrapper(Avatar)

describe('Avatar', () => {
  beforeEach(() => {
    test.props = { user: cachedUser }
  })

  it('displays a single <img>', () => {
    expect(test.Avatar.find('img')).toHaveLength(1)
    expect(test.Avatar.props().className).toBe('avatar')
    expect(test.Avatar).toMatchSnapshot()
  })

  it('has a default size', () => {
    expect(test.Avatar.props()).toMatchObject({ height: 20, width: 20 })
  })

  it('has a configurable className', () => {
    test.props.className = 'foo'
    expect(test.Avatar.props().className).toBe('avatar foo')
  })

  it('has configurable size', () => {
    test.props.size = 40
    expect(test.Avatar.props()).toMatchObject({ height: 40, width: 40 })
  })

  it('sets the alt tag to the user’s login', () => {
    expect(test.Avatar.props()).toHaveProperty('alt', `@${test.props.user.login}`)
  })

  it('sets the img src to the user’s avatar', () => {
    expect(test.Avatar.props()).toHaveProperty('src', test.props.user.avatar)
  })
})
