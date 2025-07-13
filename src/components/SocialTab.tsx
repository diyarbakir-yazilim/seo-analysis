import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { AnalysisData } from "@/types/AnalysisData";

interface DataType {
  data: AnalysisData;
}

const SocialTab = ({ data }: DataType) => {
  return (
    <>
      {" "}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Open Graph</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Title
              </label>
              <p className="text-sm">{data?.ogTitle || "Not specified"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Description
              </label>
              <p className="text-sm">{data?.ogDescription || "Not specified"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Image
              </label>
              <p className="text-sm">{data?.ogImage || "Not specified"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Type
              </label>
              <p className="text-sm">{data?.ogType || "Not specified"}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Twitter Card</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Title
              </label>
              <p className="text-sm">{data?.twitterTitle || "Not specified"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Description
              </label>
              <p className="text-sm">
                {data?.twitterDescription || "Not specified"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Image
              </label>
              <p className="text-sm">{data?.twitterImage || "Not specified"}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="w-4 h-4" />
            Social Media Links
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {data?.socialMediaLinks?.length > 0 ? (
              data?.socialMediaLinks?.map((link, index) => (
                <div key={index} className="flex items-center justify-between">
                  <Badge variant="outline" className="capitalize">
                    {link.platform}
                  </Badge>
                  <span className="text-sm font-mono truncate max-w-xs">
                    {link.url}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No social media links found
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default SocialTab;
