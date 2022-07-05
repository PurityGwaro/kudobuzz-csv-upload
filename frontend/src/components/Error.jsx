import React from 'react'
import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <div>
        <h1>Sorry,.... that directory does not exist</h1>
        <Link to="/">Go back to home</Link>
    </div>
  )
}
