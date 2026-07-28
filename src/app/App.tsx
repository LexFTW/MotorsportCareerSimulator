import { MantineProvider } from '@app/providers/MantineProvider'
import { SmoothScrollProvider } from '@app/providers/SmoothScrollProvider'
import { CareerModePage } from '@pages/career-mode'
import { Provider } from 'react-redux'
import { store } from '@app/store'

export function App() {
  return (
    <Provider store={store}>
      <MantineProvider>
        <SmoothScrollProvider>
          <CareerModePage />
        </SmoothScrollProvider>
      </MantineProvider>
    </Provider>
  )
}