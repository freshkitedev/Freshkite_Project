import CourseTemplate from "../../common/courseTemplate";
export default function WebDev() {
    // const [courses, setCourses] = useState([]);

    // useEffect(() => {
    //     // Fetch courses data from backend
    //     fetch('http://localhost:5000/courses')
    //         .then(response => response.json())
    //         .then(data => setCourses(data))
    //         .catch(error => console.error('Error fetching courses:', error));
    // }, []);
    const courses = [
        {
            title: 'HTML CSS & JavaScript for Beginners',
            description: 'Learn the foundations of coding interviews.',
            image: '/images/Html_Css_Js.png',
            Link: '/courses/HtmlCssJs'
        },
        {
            title: 'MERN Stack for Beginners',
            description: 'Learn React JS, Node JS, Express, and MongoDB.',
            image: '/images/Mern-Stack-Developer.png',
            Link: '/courses/Mern'
        },
    ];
    return (
        <div className="flex flex-row  bg-slate-200 dark:bg-gray-900 min text-black dark:text-white">
            {/* Header Section */}
            <section className="text-start py-16 ml-auto mr-32 my-auto">
                <h1 className="text-4xl font-bold">Web Development</h1>
                <p className="text-lg mt-4 text-gray-700 dark:text-gray-400 max-w-md">
                    Master the fundamentals of
                    web development through a comprehensive and structured path.
                </p>
            </section>

            <section className="flex flex-wrap justify-center gap-8 py-8 mr-auto my-auto">
                {courses.map((course, index) => (
                    <CourseTemplate
                        key={index}
                        title={course.title}
                        description={course.description}
                        image={course.image}
                        Link={course.Link}
                    />
                ))}
            </section>
        </div>
    )
}