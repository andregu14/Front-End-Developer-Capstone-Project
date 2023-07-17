import hero from './tables.jpg'
import logo from './little-lemon.jpg'


export default function Aside() {
    return (
        <>
         <aside>
            <img className='logo' src={logo} alt="Little Lemon Logo" />
            <img className='hero' src={hero} alt="Hero" />
        </aside>
        </>
    )
}