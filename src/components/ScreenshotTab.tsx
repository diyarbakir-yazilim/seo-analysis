import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnalysisData } from "@/types/AnalysisData";

interface DataType {
  data: AnalysisData;
}

const ScreenshotTab = ({ data }: DataType) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Website Screenshot</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        {data?.screenshot ? (
          <img
            src={data?.screenshot}
            alt="Website Screenshot"
            className="max-w-full h-auto rounded-md"
          />
        ) : (
          <p className="text-sm text-muted-foreground">
            No screenshot available
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ScreenshotTab;
