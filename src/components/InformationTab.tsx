import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnalysisData } from "@/types/AnalysisData";

interface DataType {
  data: AnalysisData;
}

const InformationTab = ({ data }: DataType) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Technical Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <label className="text-sm font-medium text-muted-foreground">
            Tech Stack
          </label>
          <p className="text-sm">
            {data?.techStack?.join(", ") || "Not specified"}
          </p>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">
            Load Time
          </label>
          <p className="text-sm">
            {data?.loadTime ? `${data?.loadTime} ms` : "Not specified"}
          </p>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">
            Mobile Optimized
          </label>
          <p className="text-sm">{data?.mobileOptimized ? "Yes" : "No"}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">
            Schema Types
          </label>
          <p className="text-sm">
            {data?.schemaTypes?.join(", ") || "Not specified"}
          </p>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">
            Content Readability
          </label>
          <p className="text-sm">
            {data?.contentReadability?.fleschScore || "Not specified"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InformationTab;
