import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { selectAllPages, fetchPages, PageState, AppDispatch, selectPagesStatus, Page } from './store/store';
import ResponsiveAppBar from './components/NavBar';
import GeneratedPage from './components/GeneratedPage';

import logo from './logo.svg';
import './App.css';


function App() {
  const dispatch = useDispatch<AppDispatch>();
  const pages: Page[] = useSelector(selectAllPages);
  const pagesStatus = useSelector(selectPagesStatus);


  (() => {
    const pagesCopy = Object.assign({}, pages);
    const pagesArray = Object.values(pagesCopy);
  })();

  useEffect(() => {
    if (pagesStatus === 'idle') {
      dispatch(fetchPages())
    }
  }, [pagesStatus, dispatch])


  return (
    <div className="App">
      {pages.length && (<BrowserRouter>
        <ResponsiveAppBar pages={pages} />
        <Routes>
          {pages.map((page) => (
            <Route key={page.routeName} path={page.routeName} element={<GeneratedPage component={page.components} />} />
          ))}
          <Route path="*" element={<Navigate to={pages[0].routeName} replace />} />
        </Routes>
      </BrowserRouter>)}
    </div>
  );
}

export default App;