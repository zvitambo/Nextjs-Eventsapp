import React, {Fragment} from 'react'
import Header from '../layout/main-header';


export const  Layout = (props) => {
    return (
        <Fragment>
            <Header/>
            <main>
                {props.children}
            </main>
        </Fragment>
    )
}
export default Layout;