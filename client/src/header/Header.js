import './Header.css';

export default function Header() {
  return (
    <div className='header'>
        <div className="headerTitle">
            <span className='headerTitleSm'>React & Node</span>
            <span className='headerTitleBg'>Blog Apps</span>
        </div>
        <img src="https://source.unsplash.com/Gc_Kw3jc8Ps" className='headerImg' alt="" />
    </div>
  )
}
