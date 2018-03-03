import React from 'react'
import Test from '../components/test.js';
import Link from 'next/link'

export default () => (
  <ul>
    <li><Link href='/b' as='/a'><a>a</a></Link></li>
    <li><Link href='/a' as='/b'><a>b</a></Link></li>
    <Test/>
  </ul>
)
