import React from 'react'
import createPersistedState from '../src'
import { render, fireEvent, cleanup, act } from '@testing-library/react'
import { renderHook, act as hookAct } from '@testing-library/react-hooks'

import storage from '../src/storages/local-storage'
import { local as asyncStorage } from '../src/storages/browser-storage'

const [useSyncPersistedState, clearSync] = createPersistedState('test', storage)
const [useAsyncPersistedState, clearAsync] = createPersistedState('test', asyncStorage)

describe('Integration Tests', () => {
  beforeEach(() => {
    cleanup()
    localStorage.clear()
  })

  it('should create async hook if provided async storage', async function () {
    const { result } = renderHook(() => useAsyncPersistedState('foo', 'bar'))

    hookAct(() => {
      const set = result.current[1]('baz')
      expect(set).resolves.toEqual(undefined)
    })

    hookAct(() => {
      expect(clearAsync()).resolves.toEqual(undefined)
    })
  })

  it('Component should rerender from change to local storage', () => {
    const initialValue = 0
    const testComponentId = 'test_count_component'
    const testButtonId = 'test_count_button'

    const Counter = () => {
      const [count] = useSyncPersistedState('count', initialValue)

      return <span data-testid={testComponentId}>{count}</span>
    }
    const Button = () => {
      const [, setCount] = useSyncPersistedState('count', initialValue)

      return (
        <button
          onClick={() => setCount(prev => prev + 1)}
          data-testid={testButtonId}
        >
          Test Button
        </button>
      )
    }

    const testButton = render(<Button />)
    const testComponent = render(<Counter />)

    expect(testComponent.getByTestId(testComponentId).textContent).toBe(String(initialValue))

    act(() => {
      fireEvent.click(testButton.getByTestId(testButtonId))
    })

    expect(testComponent.getByTestId(testComponentId).textContent).toBe(String(initialValue + 1))
  })

  it('Component should render with persisted state', () => {
    const initialValue = 0
    const testComponentId = 'test_count_component'
    const testButtonId = 'test_count_button'

    const Component = () => {
      const [count] = useSyncPersistedState('count', initialValue)

      return <span data-testid={testComponentId}>{count}</span>
    }
    const TestButton = () => {
      const [, setCount] = useSyncPersistedState('count', initialValue)

      return (
        <button
          onClick={() => {
            setCount(prev => prev + 1)
          }}
          data-testid={testButtonId}
        >
          Test Button
        </button>
      )
    }

    const testButton = render(<TestButton />)

    act(() => { fireEvent.click(testButton.getByTestId(testButtonId)) })

    const testComponent = render(<Component />)

    expect(testComponent.getByTestId(testComponentId).textContent).toBe(String(initialValue + 1))
  })

  it('Should clear persisted state', () => {
    const initialValue = 0
    const testComponentId = 'test_count_component'
    const testButtonId = 'test_count_button'
    const clearButtonId = 'test_clear_button'

    const Component = () => {
      const [count] = useSyncPersistedState('count', initialValue)

      return <span data-testid={testComponentId}>{count}</span>
    }
    const TestButton = () => {
      const [, setCount] = useSyncPersistedState('count', initialValue)

      return (
        <button
          onClick={() => {
            setCount(prev => prev + 1)
          }}
          data-testid={testButtonId}
        >
          Test Button
        </button>
      )
    }
    const ClearButton = () => {
      return (
        <button
          onClick={() => {
            clearSync()
          }}
          data-testid={clearButtonId}
        >
          Clear Button
        </button>
      )
    }

    const testButton = render(<TestButton />)
    const clearButton = render(<ClearButton />)
    const testComponent = render(<Component />)

    expect(testComponent.getByTestId(testComponentId).textContent).toBe(String(initialValue))

    act(() => {
      fireEvent.click(testButton.getByTestId(testButtonId))
    })

    expect(testComponent.getByTestId(testComponentId).textContent).toBe(String(initialValue + 1))

    act(() => {
      fireEvent.click(clearButton.getByTestId(clearButtonId))
    })

    expect(testComponent.getByTestId(testComponentId).textContent).toBe(String(initialValue))
  })

  it('Should change state when set initial value', () => {
    const initialValue = 0
    const testComponentId = 'test_count_component'
    const testButtonId = 'test_count_button'
    const testInitialButtonId = 'test_count_initial_button'

    const Counter = () => {
      const [count] = useSyncPersistedState('count', initialValue)

      return <span data-testid={testComponentId}>{count}</span>
    }
    const Button = () => {
      const [, setCount] = useSyncPersistedState('count', initialValue)

      return (
        <button
          onClick={() => { setCount(initialValue + 1) }}
          data-testid={testButtonId}
        >
          Test Button
        </button>
      )
    }
    const InitialButton = () => {
      const [, setCount] = useSyncPersistedState('count', initialValue)

      return (
        <button
          onClick={() => { setCount(initialValue) }}
          data-testid={testInitialButtonId}
        >
          Test Button
        </button>
      )
    }

    const testButton = render(<Button />)
    const testInitialButton = render(<InitialButton />)
    const testComponent = render(<Counter />)

    expect(testComponent.getByTestId(testComponentId).textContent).toBe(String(initialValue))

    act(() => {
      fireEvent.click(testButton.getByTestId(testButtonId))
    })

    expect(testComponent.getByTestId(testComponentId).textContent).toBe(String(initialValue + 1))

    act(() => {
      fireEvent.click(testInitialButton.getByTestId(testInitialButtonId))
    })

    expect(testComponent.getByTestId(testComponentId).textContent).toBe(String(initialValue))
  })
})
