import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import { loadVariableStyles } from "./utils";
import { Provider } from 'react-redux';
import { store } from './store';
import ToastDialog from './components/common/ToastDialog';
import {I18nextProvider, initReactI18next} from "react-i18next";
import i18n from "i18next";
import translate_EN from './translations/EN.json';

loadVariableStyles();

//TRANSLATOR
i18n.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: { ...translate_EN },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <BrowserRouter>        
            <ToastDialog />
            <App />
          </BrowserRouter>
        </Provider>
      </I18nextProvider>
  </React.StrictMode>
);