import Button from 'components/Button'
import EnzymeTestWrapper from 'test/support/EnzymeTestWrapper'

const test = new EnzymeTestWrapper(Button)

describe('Button', () => {
  beforeEach(() => {
    test.props = { children: 'Foo' }
  })

  it('displays a <button> element', () => {
    expect(test.Button.find('button')).toHaveLength(1)
    expect(test.Button.props().className).toBe('btn btn-default')
    expect(test.Button.text()).toBe('Foo')
    expect(test.Button).toMatchSnapshot()
  })

  it('has a configurable className', () => {
    test.props.className = 'foo'
    expect(test.Button.props().className).toBe('btn btn-default foo')
  })

  describe('when isActive', () => {
    beforeEach(() => {
      test.props.isActive = true
    })

    it('adds a selected class', () => {
      expect(test.Button.props().className).toBe('btn btn-default selected')
    })
  })
})
