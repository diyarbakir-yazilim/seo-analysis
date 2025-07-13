import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnalysisData } from "@/types/AnalysisData";

interface DataType {
  data: AnalysisData;
}

const BusinessTab = ({ data }: DataType) => {
  return (
    <>
      {" "}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Business Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Business Name
            </label>
            <p className="text-sm">
              {data?.businessInfo.name || "Not specified"}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Business Type
            </label>
            <p className="text-sm">
              {data?.businessInfo.type || "Not specified"}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Address
            </label>
            <p className="text-sm">
              {data?.businessInfo.address || "Not specified"}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Phone
            </label>
            <p className="text-sm">
              {data?.businessInfo.phone || "Not specified"}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Website
            </label>
            <p className="text-sm">
              {data?.businessInfo.website || "Not specified"}
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Email Addresses
            </label>
            <div className="flex flex-wrap gap-2 mt-1">
              {data?.contactInfo?.emails?.length > 0 ? (
                data.contactInfo.emails?.map((email, index) => (
                  <Badge key={index} variant="outline">
                    {email}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No emails found</p>
              )}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Phone Numbers
            </label>
            <div className="flex flex-wrap gap-2 mt-1">
              {data?.contactInfo.phones.length > 0 ? (
                data?.contactInfo.phones.map((phone, index) => (
                  <Badge key={index} variant="outline">
                    {phone}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No phone numbers found
                </p>
              )}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Addresses
            </label>
            <div className="flex flex-wrap gap-2 mt-1">
              {data?.contactInfo.addresses.length > 0 ? (
                data?.contactInfo.addresses.map((address, index) => (
                  <Badge key={index} variant="outline">
                    {address}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No addresses found
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default BusinessTab;
