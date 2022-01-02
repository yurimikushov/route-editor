import { FC } from 'react'
import { RouteEditorProvider } from 'services/routeEditor'
import { SuggestionsProvider } from 'services/suggestions'
import Home from 'pages/Home'

const App: FC = () => {
  return (
    <RouteEditorProvider>
      <SuggestionsProvider>
        <Home />
      </SuggestionsProvider>
    </RouteEditorProvider>
  )
}

export default App
