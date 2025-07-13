'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Globe } from 'lucide-react';

import ScoreOverview from './ScoreOverview';
import OverviewTab from './OverviewTab';
import ContentTab from './ContentTab';
import TechnicalTab from './TechnicalTab';
import SocialTab from './SocialTab';
import PerformanceTab from './PerformanceTab';
import BusinessTab from './BusinessTab';
import InformationTab from './InformationTab';
import AccessibilityTab from './AccessibilityTab';
import ScreenshotTab from './ScreenshotTab';
import { AnalysisData } from '@/types/AnalysisData';


const urlSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid URL' })
});

type FormData = z.infer<typeof urlSchema>;


export default function SeoAnalyzer() {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AnalysisData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(urlSchema),
    defaultValues: {
      url: ''
    }
  });

  const onSubmit = async (formData: FormData) => {

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch('/api/scrape-seo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: formData.url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || 'Failed to scrape website');
      }

      const result = await response.json();
      setData(result);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Website Analysis
          </CardTitle>
          <CardDescription>
            Enter a website URL to analyze its Search Engine Optimization potential
          </CardDescription>        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com"
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full hover:cursor-pointer">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Analyze Website'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {data && (
        <div className="space-y-6">

          {/* SEO Score Overview */}
          <ScoreOverview data={data} />

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-9 md:grid-cols-9 overflow-x-auto [&>*]:cursor-pointer">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
              <TabsTrigger value="information">Information</TabsTrigger>
              <TabsTrigger value="accessibility">Access</TabsTrigger>
              <TabsTrigger value="screenshot">Visual</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <OverviewTab data={data} />
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <ContentTab data={data} />
            </TabsContent>

            <TabsContent value="technical" className="space-y-4">
              <TechnicalTab data={data} />
            </TabsContent>

            <TabsContent value="social" className="space-y-4">
              <SocialTab data={data} />
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <PerformanceTab data={data} />
            </TabsContent>

            <TabsContent value="business" className="space-y-4">
              <BusinessTab data={data} />
            </TabsContent>

            <TabsContent value="information" className="space-y-4">
              <InformationTab data={data} />
            </TabsContent>

            <TabsContent value="accessibility" className="space-y-4">
              <AccessibilityTab data={data} />
            </TabsContent>

            <TabsContent value="screenshot" className="space-y-4">
              <ScreenshotTab data={data} />
            </TabsContent>

          </Tabs>
        </div>
      )}
    </div>

  );
};