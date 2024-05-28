import React from 'react'

export default function Header() {
    return (
    // css the header to be with grey background and text to be white
    // the nav links should be inline and the text should be red

    
    <header className='bg-gray-300 ray- text-white'>
        <nav className='inline'>
            <a href='/home' className='text-red-700 font-bold  uppercase text-center p-4 m-4 '>Home</a>
            <a href='/about' className='text-red-700 font-bold  uppercase text-center p-4 m-4 '>About</a>
            </nav>
    </header>
    
  )
}
