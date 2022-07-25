import React, { Suspense, lazy } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
// import Home from './Home'
// import About from './About'

const Home = lazy(() => import(/*webpackChunkName:'home'*/'./Home'))//路由懒加载
const About = lazy(() => import(/*webpackChunkName:'about'*/'./About'))//路由懒加载

export default function App() {
  return (
    <div>
      <h1>App</h1>
      <ul>
        <li><Link to='/home'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
      </ul>

      <Suspense fallback={<div>loading....</div>}>
        <Routes>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/about' element={<About />}></Route>
        </Routes>
      </Suspense>
    </div>
  )
}
