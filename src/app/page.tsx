import SeoAnalyzer from '@/components/SeoAnalyzer';

export default function Home() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          SEO Data Collector
        </h1>
        <SeoAnalyzer />
      </div>
    </div>
  );
}
