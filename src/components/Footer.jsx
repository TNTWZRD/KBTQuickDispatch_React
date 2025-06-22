import github_icon from "../assets/github.svg";
import { useTheme } from "../utilities/theme";

const Footer = () => {
    const { theme, toggleTheme, isDark } = useTheme();
    return (
        <div className="footer flex bg-gray-800 text-white py-4 mt-auto">
            <div className="flex mx-auto text-center items-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()}{" "} Daniel Jajliardo. All rights reserved.
                </p>
                <a href="https://github.com/TNTWZRD"
                    className="ml-4 hover:text-gray-300 transition-colors theme-focus-visible"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub Profile" >
                    <img src={github_icon}
                        alt="GitHub Icon"
                        className="h-5 w-5 align-middle"/>
                </a>
            </div>
        </div>
    )

}

export default Footer