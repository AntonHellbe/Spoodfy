import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PlaylistMenu extends Component {

    renderImage({ images }) {
        if (typeof images[0] !== 'undefined') {
            return (
            <img
                className="playlistAvatar"
                src={ images[0].url }
                alt="avatar"
            />);
        }

        return (
            <img
                className="playlistAvatar"
                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHIArAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQIEBQYDBwj/xAA4EAABAwMDAgMEBwgDAAAAAAABAAIDBBEhBRIxBkETUWEiMnHwBxRCgZHB0RUjM1JicqGxJTTx/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAgEQEBAAIDAAIDAQAAAAAAAAAAAQIREiExAyITUWFB/9oADAMBAAIRAxEAPwD2HhcXn2l3XNwHkts0gKFnNS6w0vTagwTyEyA22sFypOldUaTqZDaeqaJDjZJ7JTcONXoCd3TWe1wngKkFk5IEqgEJUII9bUxUdLLUzuDYomFzifIL5u1jU5de1qprp9x8Z/si/utHAXp/00a99S0dmkwPtNVuBfbnYDx99l5VpY8MNeb3t7IP+1zzu3X44nNEdPCXOx6Wwt19DlYW11bTDEVRGJWj+oGx/wBrznUC+QBsZduPlbK3H0ZAw9QUbPKN7SfS1/yXPG/Z3zn0r2ZCXlC9DxkSFOskKBtkhCemkIGWRZOsiyqGpju6ekIUV4N1PRyQdY6jBKTcyb235schRKrTpgRJGTcZBabWW8+lHSHvqaTUYBZzh4Ujrdxlv+ysTSahUB5grg6Nrcbu7lys7enDuLXpzrrVNFc2Kv31lGMEOP7xo8we69Y0LXtO1ymE+n1DXj7TDhzfiF5RHTUlc3aC84+fVUz/AKx05qUdVpc0jXNdctHl8PJWXTGWMvj6FCUrEaT1i2rgZJ4jcjIKl1XUYmZaJwAODbla5Rz41p3VETHbXSNB+KjVup09LDvc8O8gCslLqADrOdn1Ky/UGsyhuxjifv8AMqclmLPfSNUP1TWhVOddjIx8LXNgPxCzArHQtLnHtxbA+HkrTU6tzg3xWbhfe63JH/t12ZHA5gErQyU2O0DI+fm+Vh0nSq0475zKXkjkX4/Fb3pd01BVUlTCBJJ4rQ/HALhf/F1k5NOYZIzTR5c/JJLsZ/QrS9ERzfteVniSSySe7GeAMBZsv+Osymu3uQGEtkjBZoHolXd5BZCEIhLJLJyRUNskTkiDmgBATwgrta05mp6dNSvtd7bsJ7OHBXkeoxugkdT1tPu2HaSBlpXtjhheX9fUFZR61JqERfJBLDu8K2C4YI/Nc87rt2+G96ZymjfTF7oH2idlznC+0KrrnPndJK4FsY+045Prjhd9IqRqkngysfHI0lr4rEAjz9SiqDY3mBhc1l7BzTnhZ3t0ymqraOqkeLRuLTa/Frj9Ve6fUzMhducfMHuodNQiRjJQxrZLbvEaLDPorAwuc6waGtc0YvlpB4Rzdn1cu1znvuO1+VFkcJy4Ozs4PZSaOilqGT7GFxY0mw+fRMpoiwPa++75wgr/AKk10xlsXeGxu0WxfnPrn8VHfTStke8j2j/Pz88/5V1QVTRG4bQXNIaCQO3CkfWadzy15aX8XuPzTYpaYy0znF2zexti0uxfC13R2lMhrP2iyYtc73WWtZUL2wl2zZE13kc/PxutZocZjbcOLbchEr0SnkEkYcuqrdGlL43C97WyrNdY5kQlSIhEJUiBEicUiDkwXXSyRjbBPsgYQuFbRRVlOYpm3B4PcKVZI73SivGqzp6fStVqKhr704JEY5c5RW0bpKhznkN/lP5Wxhb7XKfxpbAcOvlZGtjmjlcI2biXZtyVzsdN2o5nbSs2xgWbweLfeoBfJ9ca637s25HCz/VEWpRUxrawSCmZUBjo4X2Oz+62Md+1+FK6IFTU0lVqMMsrqWmqLfVp3byY/wCl/wDMAfgT5LH5MZOW/wCLr7cXsHROnxPonuewEuJyebHsqvqTpt8VS99OBsfkAcBaPpYhsJ8MjwyARZXGoQienItc8hdNMb1XgPUlJXUw+pUIIqp43P3N5DQc2Wa6Zi0/U+o46CCnndSy4b4790jTbJJGOb8ei9a1zTKodRQ1lJGC6GIxnebN9o8H5/Rc6TQBS1j66DTabT6qRv7yobJvse+1tgL+p/BefPL5JbjJ1fG9S6u0Kk6fp6Kmje17yQdu4m5cRgqzhkbTOABJ3efH6LlUujY1lPAP3UYsBuz8T53TAdzS08Dz7LrDe276ZlEsJxYq8WT6RkPivZ9kDk91q11njnfSoQhVCISoRDShOSIECVIlRQhCEGf1uEMk3fZcsxM3F7E2N7ea3GsQeLTEgZblYx4BaQ49zZYreKPPTR1DZGtjp5o5/wCNSz3AJt7wcL2P3LjQaCY6eOkpYqego2SeIYad28yO7biQLDvgdk8McyYbQSDgWWp0ChDyHHgHuuX4cLluxrnlIldOUZpKYtIsMBotwFd4sucto2YFgFwdUALrtmY2+OVbRMm3Obh9uPNZPVKaojvuv7PAC2FFVR1L3+E5r2sNiRxdc9UpY5oi7AIGTeyb2ZY8bqvMqgRxtdLK0iJnO42uq6nrX1U/dsd8AhbKp0yOogcGRGTP2Xd/wVGNKlbUbRRujHm55WWo1vSJa4vee4WqBB4WZ0iidTUI2E7ubrvTa0YZTDVjab8rcvTnl60KSy5wzMmaHMcCCuoWkIhLZIUAhCEQiEIRQlQhNhHAEEEXv5rKa9pjmbnQsJa7It2WssmSxtlYWPFwcKXtXmtDSyx1V31Ybn3Mux963+ksZHANvfhVcuiUkdRv8Lc6/dWlOHRNtc2WJ0tTX8WdwqSvpm07S6mdtaSS5l8D1Hkp8s3buoU7HTja4+yeUuq38eVxqTRGKnp2RRgBoHbhSDLuaQLC/pdV8cIib7xAHZI6ozZoTciXeV26MhDGkX3OJucWTDTh7rkLoxxfzypMYupLtL0RkYDbAKm1vT/FYXMBv6LRMbhEkIc2xWoyxGkarLps/hym8ZNrHstvTTsnjD2HBCw3UdIaeYyNAAvmxUzprVDE8Qyn2Dwqt/bZoTWO3NuE5VkhSWSoQNSoQrQJUJVAiEIQcJY7uuk24tZdncpC1RUGeK6gu3tdYeSuXtuoskFzeyxY1KrLuLjclPaxS/q2bp7adTi1ycoWqZEEMisuzGWWpGLXVgTiMIbhKeFpGc6lpd8BcLA/C91iaaUxSlriQWnC9L1IXgddt8LzrUImtq3bRbKlWN7odaKmkbc3c3CtFiOkKwtm8MnBwtsOFpKEIQqhEIQlCoQhQCEIQNdyndkIUDSuaEKKQJQhCB4XQcJEIHoQhURqv+E5ed6t/wBooQpSen9OH/kG/wBy9GZ7oQhax8XL0qEIVZf/2Q==" //eslint-disable-line
                alt="avatar"
            />
        );
    }
    render() {
        return (
            <ul className="playlists" style={ { listStyle: 'none' } }>
                {this.props.playlists.map((playlist) => (
                    <li
                        className="playlist"
                        style={ { paddingTop: '5px' } }
                        key={ playlist.id }
                    >   
                        <Link className="link" to={ `/playlists/${playlist.id}` } onClick={ () => this.props.updateActivePlaylist(playlist) }>
                        { this.renderImage(playlist) }
                            <p>{playlist.name}</p>
                        </Link>
                    </li>
                    
                ))}
            </ul>
        );
    }
}

export default PlaylistMenu;