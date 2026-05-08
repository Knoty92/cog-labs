import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

export type Submission = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  service: string;
  createdAt: string;
};

const DATA_FILE = join(tmpdir(), "cog-labs-submissions.json");

function ensureDataFile() {
  if (!existsSync(DATA_FILE)) {
    writeFileSync(DATA_FILE, "[]", "utf-8");
  }
}

export function getSubmissions(): Submission[] {
  ensureDataFile();
  try {
    return JSON.parse(readFileSync(DATA_FILE, "utf-8"));
  } catch {
    return [];
  }
}

export function addSubmission(data: Omit<Submission, "id" | "createdAt">): Submission {
  ensureDataFile();
  const submissions = getSubmissions();
  const submission: Submission = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  submissions.push(submission);
  writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2), "utf-8");
  return submission;
}
