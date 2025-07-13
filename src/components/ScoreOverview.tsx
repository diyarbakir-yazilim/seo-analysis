import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { AnalysisData } from "@/types/AnalysisData";

interface DataType {
  data: AnalysisData;
}

const ScoreOverview = ({ data }: DataType) => {

  const calculateSeoScore = (data: AnalysisData): number => {
    let score = 0;
    
    // Title optimization (0-15 points)
    if (data?.title && data?.title.length > 10 && data?.title.length < 60) score += 15;
    else if (data?.title && data?.title.length > 0) score += 8;
    
    // Description optimization (0-15 points)
    if (data?.description && data?.description.length > 120 && data?.description.length < 160) score += 15;
    else if (data?.description && data?.description.length > 0) score += 8;
    
    // Heading structure (0-10 points)
    if (data?.h1Count === 1) score += 5;
    if (data?.headings && data?.headings.length > 3) score += 5;
    
    // Structured data (0-15 points)
    if (data?.structuredData && data?.structuredData.length > 0) score += 15;
    
    // Content quality (0-10 points)
    if (data?.wordCount > 300) score += 5;
    if (data?.contentReadability?.fleschScore > 60) score += 5;    
    // Technical SEO (0-15 points)
    if (data?.ssl) score += 3;
    if (data?.mobileOptimized) score += 3;
    if (data?.canonicalUrl) score += 3;
    if (data?.robots) score += 3;
    if (data?.altTextMissing === 0) score += 3;
    
    // Open Graph (0-10 points)
    if (data?.ogTitle && data?.ogDescription) score += 10;
    else if (data?.ogTitle || data?.ogDescription) score += 5;
    
    // Internal linking (0-10 points)
    if (data?.internalLinks && data?.internalLinks.length > 10) score += 10;
    else if (data?.internalLinks && data?.internalLinks.length > 5) score += 5;
    
    return Math.min(score, 100);
  };

  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          SEO Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div
            className={`text-4xl font-bold ${getScoreColor(
              calculateSeoScore(data)
            )}`}
          >
            {calculateSeoScore(data)}/100
          </div>
          <div className="flex-1">
            <Progress value={calculateSeoScore(data)} className="h-3" />
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Overall optimization score for search engine visibility
        </p>
      </CardContent>
    </Card>
  );
};

export default ScoreOverview;
