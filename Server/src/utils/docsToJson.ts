import { google } from "googleapis";
import { JWT } from "google-auth-library";
import path from 'path';
import cloudinary from "../config/cloudinary"

interface NoteWithImages {
  type: "text" | "image";
  value?: string;
  url?: string;
  alt?: string;
}

interface Subtopic {
  subtopic: string;
  content: NoteWithImages[];
  videos: string[];
  assignments: string[];
}

interface DocumentJSON {
  title: string;
  description: string;
  category: string;
  phase: string;
  subtopics: Subtopic[];
}

export async function fetchGoogleDocAsJson(docId: string): Promise<DocumentJSON | undefined> {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(__dirname, "./service-account.json"),
      scopes: [
        "https://www.googleapis.com/auth/documents.readonly",
        "https://www.googleapis.com/auth/drive.readonly",
      ],
    });

    const client = (await auth.getClient()) as JWT;
    const docs = google.docs({ version: "v1", auth: client });
    const res = await docs.documents.get({ documentId: docId });

    const content = res.data.body?.content || [];
    const inlineObjects = res.data.inlineObjects || {};

    const jsonResult: DocumentJSON = {
      title: "",
      description: "",
      category: "",
      phase: "",
      subtopics: [],
    };

    let currentSubtopic: Subtopic | null = null;
    let currentSection: "notes" | "videos" | "assignments" | null = null;
    let imageIndex = 0;

    for (const element of content) {
      const paragraph = element.paragraph;
      if (!paragraph) continue;

      const style = paragraph.paragraphStyle?.namedStyleType || "";

      // HEADINGS
      const combinedText = (paragraph.elements || [])
        .map((el) => el.textRun?.content?.trim() || "")
        .join("")
        .trim();

      if (style === "TITLE") {
        jsonResult.title = combinedText;
        continue;
      }

      if (style === "SUBTITLE") {
        jsonResult.description = combinedText;
        continue;
      }

      if (style === "HEADING_2") {
        jsonResult.phase = combinedText;
        continue;
      }

      if (style === "HEADING_3") {
        jsonResult.category = combinedText;
        continue;
      }

      if (style === "HEADING_1") {
        if (currentSubtopic) {
          // Filter out subtopics with empty content, videos, or assignments
          if (
            currentSubtopic.content.length > 0 ||
            currentSubtopic.videos.length > 0 ||
            currentSubtopic.assignments.length > 0
          ) {
            jsonResult.subtopics.push(currentSubtopic);
          }
        }
        currentSubtopic = {
          subtopic: combinedText,
          content: [],
          videos: [],
          assignments: [],
        };
        currentSection = null;
        continue;
      }

      // SECTION DETECTION
      if (/^notes:?$/i.test(combinedText)) {
        currentSection = "notes";
        continue;
      }
      if (/^(youtube videos|videos):?$/i.test(combinedText)) {
        currentSection = "videos";
        continue;
      }
      if (/^assignments:?$/i.test(combinedText)) {
        currentSection = "assignments";
        continue;
      }

      if (!currentSubtopic) continue;

      // BULLET HANDLING
      if (paragraph.bullet && currentSection === "videos" && combinedText) {
        currentSubtopic.videos.push(combinedText);
        continue;
      }

      if (paragraph.bullet && currentSection === "assignments" && combinedText) {
        currentSubtopic.assignments.push(combinedText);
        continue;
      }

      // NOTES SECTION - TEXT + IMAGES IN ORDER
      if (currentSection === "notes") {
        for (const el of paragraph.elements || []) {
          // TEXT ELEMENT
          if (el.textRun?.content?.trim()) {
            const text = el.textRun.content.trim();
            if (text) {
              currentSubtopic.content.push({
                type: "text",
                value: text,
              });
            }
          }

          // IMAGE ELEMENT
          const inlineObjId = el.inlineObjectElement?.inlineObjectId;
          const embedded = inlineObjId ? inlineObjects[inlineObjId]?.inlineObjectProperties?.embeddedObject : null;
          const imageUri = embedded?.imageProperties?.contentUri;

          if (imageUri) {
            try {
              const uploadResult = await cloudinary.uploader.upload(imageUri, {
                folder: "google-docs-images",
                public_id: `${docId}_${imageIndex}`,
                overwrite: true,
              });

              currentSubtopic.content.push({
                type: "image",
                url: uploadResult.secure_url,
                alt: `Image ${imageIndex}`,
              });

              imageIndex++;
            } catch (err) {
              console.error(`Image upload failed for ${imageUri}:`, err);
            }
          }
        }
      }
    }

    // Filter out subtopics with no content
    if (currentSubtopic && (currentSubtopic.content.length > 0 || currentSubtopic.videos.length > 0 || currentSubtopic.assignments.length > 0)) {
      jsonResult.subtopics.push(currentSubtopic);
    }

    return jsonResult;
  } catch (error) {
    console.error("Error processing Google Doc:", error);
    return undefined;
  }
}
