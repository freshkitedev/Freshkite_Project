import Link from "next/link"
import LoginBtn from "../auth/login"
import ToggleTheme from "./theme"
export default function Navbar() {
    return (
        <div>
            <nav className=" bg-slate-50 dark:bg-gray-800 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-slate-800 dark:text-white text-lg font-sans font-bold">
                        <Link href="/">
                                <img
                                    src="/images/freshkite_edited.webp"
                                    alt="Your image alt text"
                                    width={200}
                                    height={200}
                                ></img>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4 ml-auto cursor-pointer">
                        <LoginBtn />
                        <ToggleTheme />
                    </div>
                </div>
            </nav>

        </div>
    )
}