import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code } from "lucide-react";
import { AnalysisData } from "@/types/AnalysisData";

interface DataType {
  data: AnalysisData;
}

const OverviewTab = ({ data }: DataType) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Title
              </label>
              <p className="text-sm">{data?.title || "No title found"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Description
              </label>
              <p className="text-sm">
                {data?.description || "No description found"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Language
              </label>
              <p className="text-sm">{data?.lang || "Not specified"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Canonical URL
              </label>
              <p className="text-sm">{data?.canonicalUrl || "Not specified"}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Word Count</span>
              <span className="text-sm font-medium">
                {data?.wordCount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total Links</span>
              <span className="text-sm font-medium">{data?.totalLinks}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Images</span>
              <span className="text-sm font-medium">{data?.imagesCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">H1 Tags</span>
              <span className="text-sm font-medium">{data?.h1Count}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Load Time</span>
              <span className="text-sm font-medium">{data?.loadTime}ms</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Technology Stack */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Code className="w-4 h-4" />
            Technology Stack
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {data?.techStack?.length > 0 ? (
              data?.techStack?.map((tech, index) => (
                <Badge key={index} variant="secondary">
                  {tech}
                </Badge>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No technologies detected
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default OverviewTab;
