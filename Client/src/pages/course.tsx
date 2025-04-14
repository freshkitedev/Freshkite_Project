import LoginModal from "../components/auth/loginModel"
import Navbar from "../components/common/navbar"
import ProblemSolving from "../components/specific/courses/problemSolving"
import WebDev from "../components/specific/courses/webDev"

export default function Courses() {
    return (
        <div  className="bg-slate-200 dark:bg-slate-900">
            <Navbar />
            <h1 className=" text-slate-800 dark:text-slate-200 text-center font-sans text-5xl my-5">Courses</h1>
            <WebDev/>
            <ProblemSolving /> 
            <LoginModal />
        </div>
    )
}