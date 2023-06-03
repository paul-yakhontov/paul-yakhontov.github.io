import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  HashRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { selectAllPages, fetchPages, AppDispatch, selectPagesStatus, Page } from './store/store';
import ResponsiveAppBar from './components/NavBar';
import GeneratedPage from './components/GeneratedPage';

import './App.css';


function App() {
  const dispatch = useDispatch<AppDispatch>();
  const pages: Page[] = useSelector(selectAllPages);
  const pagesStatus = useSelector(selectPagesStatus);

  useEffect(() => {
    document.title = 'Pavlo Yakhontov';

    const metaTags = [
      { name: 'description', content: 'Personal website' },
      { property: 'og:title', content: 'Pavlo Yakhontov' },
      { property: 'og:description', content: 'Personal website' },
    ];

    metaTags.forEach(metaTag => {
      const element = document.createElement('meta');
      Object.entries(metaTag).forEach(([key, value]) => {
        element.setAttribute(key, value);
      });
      document.head.appendChild(element);
    });

    if (pagesStatus === 'idle') {
      dispatch(fetchPages())
    }
  }, [pagesStatus, dispatch]);

  return (
    <div className="App">
      {pages.length && (<HashRouter>
        <ResponsiveAppBar pages={pages} />
        <Routes>
          {pages.map((page) => (
            <Route key={page.routeName} path={page.routeName} element={<GeneratedPage useWaves={page.useWaves} component={page.components} />} />
          ))}
          <Route path="*" element={<Navigate to={pages[0].routeName} replace />} />
        </Routes>
      </HashRouter>)}
    </div>
  );
}

export default App;
