export const ageRatings = [
  "safe",
  "suggestive",
  "borderline",
  "explicit",
] as const;

export type AgeRating = (typeof ageRatings)[number];

export const sortedAgeRatings = [...ageRatings].sort((a, b) =>
  a.localeCompare(b)
) as readonly AgeRating[];

export const NSFW_RATINGS = ["explicit", "borderline"] as const;
export type NSFWRating = (typeof NSFW_RATINGS)[number];
