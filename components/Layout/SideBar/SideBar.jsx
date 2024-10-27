import { FiMenu } from 'react-icons/fi'
import Link from 'next/link'

export default function Sidebar() {
  return (
    <nav className="drawer fixed z-10 mt-5 ml-5 w-min">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label
          htmlFor="my-drawer"
          className="btn drawer-button btn-ghost btn-circle transition-transform duration-200 hover:scale-110"
        >
          <FiMenu className="text-3xl" />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-72 p-4">
          <Link href="/" className="font-bold text-4xl text-center p-3">
            TASK
          </Link>
          {/* Sidebar content here */}
          <ul className="menu bg-base-200 rounded-box w-56">
            <li>
              <a>Portfolio</a>
            </li>
            <li>
              <details>
                <summary>API</summary>
                <ul>
                  <li>
                    <Link href="/weather">Weather</Link>
                  </li>
                  <li>
                    <Link href="/crypto">Crypto</Link>
                  </li>
                  <li>
                    <Link href="/gold">Gold</Link>
                  </li>
                  <li>
                    <Link href="/oil">Oil</Link>
                  </li>
                  <li>
                    <Link href="/exchange">Exchange</Link>
                  </li>
                  <li>
                    <details>
                      <summary>Parent</summary>
                      <ul>
                        <li>
                          <a>Submenu 1</a>
                        </li>
                        <li>
                          <a>Submenu 2</a>
                        </li>
                      </ul>
                    </details>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </ul>
      </div>
    </nav>
  )
}
