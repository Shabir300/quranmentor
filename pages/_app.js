import '../styles/globals.css'
// import '@shoelace-style/shoelace/dist/themes/light.css';
// import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path';
import store from '../app/store'
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }) {
  const isBrowser = typeof window !== 'undefined';
  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}


export default MyApp;

// setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.3.0/dist/');