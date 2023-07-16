import hero from './tables.jpg'
import logo from './little-lemon.jpg'


export default function Aside() {
    return (
        <>
         <aside>
            <img src={logo} alt="Little Lemon Logo" />
            <img src={hero} alt="Hero" />
        </aside>
        </>
    )
}