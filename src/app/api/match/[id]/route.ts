import { getSingleProject } from "@/actions/project";
import { getAllTalents } from "@/actions/talent";
import { matchScore } from "@/lib/match";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  context: Promise<{ params: { id: string } }>
) {
  const { params } = await context;
  const gigId = params.id;

  const gig = await getSingleProject(gigId);
  if (!gig) {
    return new Response(`Project not found`, { status: 404 });
  }

  const talents = await getAllTalents();
  const results = talents?.map((talent) => {
    const { score, reasons } = matchScore(gig, talent);
    return { talent, score, reasons };
  });
  const filteredResults = results
    ?.filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score);

  return new Response(JSON.stringify(filteredResults), { status: 200 });
}
