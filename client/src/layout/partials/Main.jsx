import React from 'react'

export default function Main({children}) {
    return (
        <main id='main' className='container ' style={{ width: "1200px", marginTop: "150px" }}>
         
            {children}


        </main>
    )
}
