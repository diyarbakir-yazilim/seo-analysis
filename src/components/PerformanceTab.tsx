import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "lucide-react";
import { AnalysisData } from "@/types/AnalysisData";

interface DataType {
  data: AnalysisData;
}

const PerformanceTab = ({ data }: DataType) => {
  return (
    <>
      {" "}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{data?.loadTime ?? 'N/A'}ms</div>
              <div className="text-sm text-muted-foreground">Load Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {data?.pageSpeed?.toFixed(2) ?? 'N/A'}ms
              </div>
              <div className="text-sm text-muted-foreground">Page Speed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{data?.scriptsCount ?? 'N/A'}</div>
              <div className="text-sm text-muted-foreground">Scripts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{data?.imagesCount ?? 'N/A'}</div>
              <div className="text-sm text-muted-foreground">Images</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Link className="w-4 h-4" />
              Internal Links ({data?.internalLinks?.length ?? 0})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {data?.internalLinks?.slice(0, 10).map((link, index) => (
                <div key={index} className="text-sm">
                  <span className="font-medium">{link.text || "No text"}</span>
                  <div className="text-xs text-muted-foreground truncate">
                    {link.href}
                  </div>
                </div>
              ))}
              {data?.internalLinks?.length > 10 && (
                <div className="text-xs text-muted-foreground">
                  +{data?.internalLinks?.length - 10} more links
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Link className="w-4 h-4" />
              External Links ({data?.externalLinks?.length ?? 0})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {data?.externalLinks?.slice(0, 10).map((link, index) => (
                <div key={index} className="text-sm">
                  <span className="font-medium">{link?.text || "No text"}</span>
                  <div className="text-xs text-muted-foreground truncate">
                    {link?.href}
                  </div>
                </div>
              ))}
              {data?.externalLinks?.length > 10 && (
                <div className="text-xs text-muted-foreground">
                  +{data?.externalLinks?.length - 10} more links
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default PerformanceTab;
