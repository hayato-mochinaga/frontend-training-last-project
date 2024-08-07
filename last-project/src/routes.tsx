import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './app/layout';
import { ForecastContainer } from './features/forecast/ForecastContainer';




const AppRoutes: React.FC = () => {
  return (
    <>
      <Routes >

        <Route path="/" element={
          <Layout  />
        }>
          <Route index element={<ForecastContainer />} />
          <Route path="aqua" element={<div>aqua</div>} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;