import github_icon from "../assets/github.svg";

const Footer = () => {
    return (
        <div className="flex bg-gray-800 text-white py-4 mt-auto fixed bottom-0 w-full">
            <div className="flex mx-auto text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()}{" "} Daniel Jajliardo. All rights reserved.
                </p>
                <a href="https://github.com/TNTWZRD"
                    className="underline hover:text-blue-400"
                    target="_blank"
                    rel="noopener noreferrer" >
                    <img src={github_icon}
                        alt="GitHub Icon"
                        className="h-5 w-5 align-middle ms-2"/>
                </a>
            </div>
        </div>
    )

}

export default Footer