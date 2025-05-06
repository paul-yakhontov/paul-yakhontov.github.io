import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import {
  HashRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import {
  selectAllPages,
  fetchPages,
  AppDispatch,
  selectPagesStatus,
  Page
} from 'store/store';
import NavBar from 'components/Nav/NavBar';
import GeneratedPage from 'components/Page/GeneratedPage';
import './App.css';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const pages: Page[] = useSelector(selectAllPages);
  const pagesStatus = useSelector(selectPagesStatus);

  useEffect(() => {
    if (pagesStatus === 'idle') {
      dispatch(fetchPages());
    }
  }, [pagesStatus, dispatch]);

  return (
    <>
      <Helmet>
        <title>Pavlo Yakhontov — Senior Software Engineer</title>
        <meta property="og:title"       content="Pavlo Yakhontov — Senior Software Engineer" />
        <meta property="og:description" content="Building cross-platform apps with React & React Native. Check out CV." />
        <meta property="og:image"       content="https://paul-yakhontov.github.io/og-image.png" />
      </Helmet>

      <div className="App">
        {pages.length > 0 && (
          <HashRouter>
            <NavBar pages={pages} />
            <Routes>
              {pages.map(page => (
                <Route
                  key={page.routeName}
                  path={page.routeName}
                  element={
                    <GeneratedPage
                      component={page.components}
                    />
                  }
                />
              ))}
              <Route
                path="*"
                element={<Navigate to={pages[0].routeName} replace />}
              />
            </Routes>
          </HashRouter>
        )}
      </div>
    </>
  );
}

export default App;
