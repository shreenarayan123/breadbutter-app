interface Project {
  title: string;
  clientNeed: string;
  location: string;
  budget: number;
  customerId: string;
  stylePref: string[];
  category: string;
}

interface Talent {
  id: string;
  name: string;
  city: string;
  category: string[];
  skils: string[];
  experience: number;
  budgetRange: string;
  portfolioUrl: string;
}

function matchScore(gig: Project, talent: Talent) {
  let score = 0;
  const reasons: string[] = [];

  if (gig.location.toLowerCase() === talent.city.toLowerCase()) {
    score += 2;
    reasons.push("Location match (+2)");
  }

  const budgetRegex = /\$?(\d+)\s*-\s*\$?(\d+)/;
  const match = talent.budgetRange.match(budgetRegex);

  if (match) {
    const minBudget = parseInt(match[1], 10);
    const maxBudget = parseInt(match[2], 10);

    if (gig.budget >= minBudget && gig.budget <= maxBudget) {
      score += 3;
      reasons.push("Budget within talent range (+3)");
    }
  }

  const clientSkills = gig.clientNeed.toLowerCase().split(/\s+/);
  const skillOverlap = clientSkills.filter((skill) =>
    talent.skils.map((s) => s.toLowerCase()).includes(skill)
  );

  if (skillOverlap.length > 0) {
    const points = skillOverlap.length * 5;
    score += points;
    reasons.push(`Skill overlap ${skillOverlap} (+${points})`);
  }

  const gigCategories = gig.category.toLowerCase().split(/\s+/);
  const categoryOverlap = gigCategories.filter((cat) =>
    talent.category.map((c) => c.toLowerCase()).includes(cat)
  );

  if (categoryOverlap.length > 0) {
    score += 4;
    reasons.push("Category match (+4)");
  }

  const styleMatch = gig.stylePref.filter((style) =>
    talent.skils.map((s) => s.toLowerCase()).includes(style.toLowerCase())
  );

  if (styleMatch.length > 0) {
    const points = styleMatch.length * 3;
    score += points;
    reasons.push(`Style preference match ${styleMatch} (+${points})`);
  }

  if (talent.experience > 5) {
    score += 2;
    reasons.push("Experience bonus (>5 years) (+2)");
  }

  return { score, reasons };
}

export { matchScore };
