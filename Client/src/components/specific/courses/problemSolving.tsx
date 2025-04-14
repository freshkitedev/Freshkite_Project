import CourseTemplate from "../../common/courseTemplate";

export default function ProblemSolving() {
    const courses = [
        {
            title: 'Basic Problen Solving',
            description: 'Master If | Loop | Sorting | Serching | Recursion | Patern Printing',
            image: '/images/basic_problem_solving.png',
            Link: '/courses/BasicProblemSolving'
        },
        {
            title: 'DSA',
            description: 'Follow a structured path to learn all of the core data structures & algorithms.',
            image: '/images/Dsa.webp',
            Link: '/courses/HtmlCssJs'
        },
    ];
    return (
        <div className="flex flex-row  bg-slate-200 dark:bg-gray-900 min text-black dark:text-white">
            {/* Header Section */}
            <section className="text-start py-16 ml-auto mr-32 my-auto">
                <h1 className="text-4xl font-bold">Problem Solving</h1>
                <p className="text-lg mt-4 text-gray-700 dark:text-gray-400 max-w-md">
                    Master the fundamentals of
                    Problem Solving through a comprehensive and structured path.
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