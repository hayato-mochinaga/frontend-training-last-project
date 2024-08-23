import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './app/layout';
import { ForecastContainer } from './features/forecast/ForecastContainer';
import Start from './Start';
import LoadingAnimation from './components/molecules/Loading/LoadingAnimation';

const AppRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/start" element={<Start />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<ForecastContainer />} />
        </Route>
          <Route path="loading" element={<LoadingAnimation/>} />
      </Routes>
    </>
  );
};

export default AppRoutes;
