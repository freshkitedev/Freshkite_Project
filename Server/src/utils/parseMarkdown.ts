export function parseMarkdownContent(markdown: string) {
try {
    const titleMatch = markdown.match(/## Title:\s*(.*)/);
    const descriptionMatch = markdown.match(/## Description:\s*(.*)/);

    const title = titleMatch?.[1]?.trim() || "";
    const description = descriptionMatch?.[1]?.trim() || "";

    const subtopicRegex =
        /### (.+?)\n+#### Notes:\n+([\s\S]*?)#### YouTube Videos:\n+([\s\S]*?)#### Assignments:\n+([\s\S]*?)(?=(###|$))/g;

    const subtopics = [];
    const seen = new Set<string>(); // prevent duplication

    let match: RegExpExecArray | null;
    while ((match = subtopicRegex.exec(markdown)) !== null) {
        const subtopicTitle = match[1].trim();

        if (seen.has(subtopicTitle)) continue;
        seen.add(subtopicTitle);

        const notes = match[2]
            .split("\n")
            .map((line) => line.replace(/^- /, "").trim())
            .filter((line) => line);

        const videos = match[3]
            .split("\n")
            .map((line) => line.replace(/^- /, "").trim())
            .filter((line) => line.startsWith("http"));

        const assignments = match[4]
            .split("\n")
            .map((line) => line.replace(/^- /, "").trim())
            .filter(
                (line) =>
                    line &&
                    !line.startsWith("##") &&
                    !line.startsWith("###") &&
                    !line.startsWith("####")
            );

            if (match[4].includes("##") || match[4].includes("###")) {
                console.warn(
                    `Possible malformed assignment detected in "${subtopicTitle}". Filtered markdown headers from assignments.`
                );
            }

            subtopics.push({
                subtopic: subtopicTitle,
                notes,
                videos,
                assignments,
            });
    }

    return {
        title,
        description,
        subtopics,
    };
} catch (error) {
    console.error("Error parsing markdown content:", error);
    return {
        title: "",
        description: "",
        subtopics: [],
    };
}
}
