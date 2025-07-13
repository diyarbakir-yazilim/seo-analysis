import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnalysisData } from "@/types/AnalysisData";

interface DataType {
  data: AnalysisData;
}

const ContentTab = ({ data }: DataType) => {
  const getReadabilityLevel = (score: number): string => {
    if (score >= 90) return "Very Easy";
    if (score >= 80) return "Easy";
    if (score >= 70) return "Fairly Easy";
    if (score >= 60) return "Standard";
    if (score >= 50) return "Fairly Difficult";
    if (score >= 30) return "Difficult";
    return "Very Difficult";
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Content Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Reading Level
              </label>
              <p className="text-sm">
                {getReadabilityLevel(data?.contentReadability.fleschScore)}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Flesch Score
              </label>
              <p className="text-sm">{data?.contentReadability.fleschScore}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Avg. Words/Sentence
              </label>
              <p className="text-sm">
                {data?.contentReadability.averageWordsPerSentence}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Heading Structure</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {data?.headings.length > 0 ? (
                data?.headings.map((heading, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Badge variant="outline" className="text-xs">
                      {heading.level.toUpperCase()}
                    </Badge>
                    <span className="text-sm flex-1 truncate">
                      {heading.text}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No headings found
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Structured Data */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Structured Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {data?.schemaTypes.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {data?.schemaTypes.map((type, index) => (
                  <Badge key={index} variant="secondary">
                    {type}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No structured data found
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Content Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm bg-muted/50 p-3 rounded-md max-h-40 overflow-y-auto">
            {data?.mainContent.substring(0, 500)}...
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ContentTab;
