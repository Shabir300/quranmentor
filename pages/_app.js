import '../styles/globals.css'
// import '@shoelace-style/shoelace/dist/themes/light.css';
// import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path';


function MyApp({ Component, pageProps }) {
  const isBrowser = typeof window !== 'undefined';
  return (
    <>
      
      <Component {...pageProps} />
    </>
  )
}


export default MyApp;

// setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.3.0/dist/');