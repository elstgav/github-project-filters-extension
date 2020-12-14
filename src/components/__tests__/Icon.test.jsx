import Icon from 'components/Icon'
import EnzymeTestWrapper from 'test/support/EnzymeTestWrapper'

const test = new EnzymeTestWrapper(Icon)

describe('Icon', () => {
  beforeEach(() => {
    test.props.icon = Object.keys(Icon.paths)[0] // Pick an existing icon for the test
  })

  it('displays a <svg> element', () => {
    expect(test.Icon.find('svg')).toHaveLength(1)
    expect(test.Icon.find('path').prop('d')).toBe(Icon.paths[test.props.icon])
    expect(test.Icon.props().className).toBe(`octicon octicon-${test.props.icon}`)
    expect(test.Icon).toMatchSnapshot()
  })

  it('has a configurable className', () => {
    test.props.className = 'foo'
    expect(test.Icon.props().className).toBe(`octicon octicon-${test.props.icon} foo`)
  })

  it('sets [aria-hidden] to true unless there’s an [aria-label]', () => {
    expect(test.Icon.prop('aria-hidden')).toBe(true)

    test.Icon.setProps({ ariaLabel: 'Foo' })

    expect(test.Icon.prop('aria-hidden')).toBe(false)
    expect(test.Icon.prop('aria-label')).toBe('Foo')
  })

  it('has configurable size', () => {
    test.props.height = 10
    test.props.width  = 10

    expect(test.Icon.props()).toMatchObject({ height: 10, width: 10 })
  })

  it('defaults to a square size if height is not set', () => {
    test.props.width = 42

    expect(test.Icon.props().height).toBe(42)
  })
})
