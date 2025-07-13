import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Smartphone } from "lucide-react";
import { AnalysisData } from "@/types/AnalysisData";

interface DataType {
  data: AnalysisData;
}

const TechnicalTab = ({ data }: DataType) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security & Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                SSL Certificate
              </span>
              <Badge variant={data?.ssl ? "default" : "destructive"}>
                {data?.ssl ? "Enabled" : "Disabled"}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Mobile Optimized
              </span>
              <Badge
                variant={data?.mobileOptimized ? "default" : "destructive"}
              >
                {data?.mobileOptimized ? "Yes" : "No"}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Robots Meta</span>
              <span className="text-sm font-medium">
                {data?.robots || "Not specified"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Page Speed</span>
              <span className="text-sm font-medium">
                {data?.pageSpeed?.toFixed(2) ?? 'N/A'}ms
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              Mobile & Accessibility
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Viewport Meta
              </span>
              <span className="text-sm font-medium">
                {data?.viewport ? "Present" : "Missing"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Alt Text Missing
              </span>
              <span className="text-sm font-medium">
                {data?.altTextMissing ?? 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Charset</span>
              <span className="text-sm font-medium">{data?.charset ?? 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Theme Color</span>
              <span className="text-sm font-medium">
                {data?.themeColor || "Not specified"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Redirects */}
      {data?.redirects.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Redirects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {data?.redirects?.map((redirect, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="truncate">{redirect.from}</span>
                  <Badge variant="outline">{redirect.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default TechnicalTab;
