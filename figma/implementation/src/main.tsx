import React from 'react'
import { createRoot } from 'react-dom/client'
// Those two implemation are a first attempt with GTP-5 mini
// import App from './App'
// import ChooseAFile from './pages/choose-a-file';

// import GeminiChooseAFile from './pages/gemini-choose-a-file';
// import FileChooser from './pages/file-chooser';
// import FileChoosed from './pages/file-choosed';
// Buttons and framing seems weird in this imlementation
// import MobileUserSpace from './pages/mobile-user-space';
// import UserSpace from './pages/user-space';

// import Login from './pages/login';
// import Register from './pages/register';

// https://www.figma.com/design/cdfjz8zVVlUQWjCLqOsHG2/OCR---P4---DataShare?node-id=56-779&m=dev
// import DownloadWithPasswordEmpty from './pages/download-with-password-empty';

// https://www.figma.com/design/cdfjz8zVVlUQWjCLqOsHG2/OCR---P4---DataShare?node-id=58-591&m=dev
// import DownloadWithPasswordFilled from './pages/download-with-password-filled';
// import DownloadWithoutPassword from './pages/download-without-password';
import NoDownloadAvailable from './pages/no-download-available';

import './styles.css'

const applicationRoot = document.getElementById('root');
if(applicationRoot !== null) {
  createRoot(applicationRoot).render(
    <React.StrictMode>
      <NoDownloadAvailable />
    </React.StrictMode>
  )
} else {
  throw new Error("Root element not found");
}
