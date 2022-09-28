import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
// omit other imports
import { selectAllPages, fetchPages, PageState, AppDispatch, selectPagesStatus, Page } from './store/store';
import ResponsiveAppBar from './components/NavBar';

import logo from './logo.svg';
import './App.css';


function App() {
  const dispatch = useDispatch<AppDispatch>();
  const pages: Page[] = useSelector(selectAllPages);
  const pagesStatus = useSelector(selectPagesStatus);


  (() => {
    const pagesCopy = Object.assign({}, pages);
    const pagesArray = Object.values(pagesCopy);
    console.log('pages', pagesArray);
  })();

  useEffect(() => {
    if (pagesStatus === 'idle') {
      dispatch(fetchPages())
    }
  }, [pagesStatus, dispatch])


  return (
    <div className="App">
      {pages.length && <ResponsiveAppBar pages={pages} />}
    </div>
  );
}

export default App;
