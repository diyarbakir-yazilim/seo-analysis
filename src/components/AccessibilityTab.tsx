import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnalysisData } from "@/types/AnalysisData";

interface DataType {
  data: AnalysisData;
}

const AccessibilityTab = ({ data }: DataType) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Accessibility Features</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <label className="text-sm font-medium text-muted-foreground">
            Alt Text Missing
          </label>
          <p className="text-sm">
            {data?.altTextMissing ?? 0} images missing alt text
          </p>        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">
            Viewport Meta
          </label>
          <p className="text-sm">{data?.viewport ? "Present" : "Missing"}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">
            Theme Color
          </label>
          <p className="text-sm">{data?.themeColor || "Not specified"}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccessibilityTab;
