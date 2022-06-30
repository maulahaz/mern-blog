import './TopBar.css';

export default function TopBar() {
  return (
    <div className='top'>
        <div className="topLeft">
            <i className="topIcon fab fa-facebook-square"></i>
            <i className="topIcon fab fa-twitter-square"></i>
            <i className="topIcon fab fa-instagram-square"></i>
        </div>
        <div className="topCenter">
            <ul className="topList">
                <li className="topListItem">HOME</li>
                <li className="topListItem">MENU 1</li>
                <li className="topListItem">MENU 2</li>
                <li className="topListItem">MENU 3</li>
            </ul>
        </div>
        <div className="topRight">
            <img src="https://source.unsplash.com/iEEBWgY_6lA" className="topImage" alt="" />
            <i className="topSearchIcon fas fa-search"></i>
        </div>
    </div>
  )
}
