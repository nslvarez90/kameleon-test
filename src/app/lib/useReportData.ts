// hooks/useReportData.ts
import { useEffect, useState } from 'react';

type ReportData = {
  reports: Array<{
    id: string;
    name: string;
    cards: { total: number; average: number };
    line: Array<{ date: string; value: number }>;
    bar: Array<{ category: string; value: number }>;
  }>;
};

export function useReportData() {
  const [data, setData] = useState<ReportData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/report.json');
        if (!response.ok) {
          throw new Error('Failed to load report data');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
}