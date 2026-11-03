import { useEffect, useState } from "react";
import { api, type Page, type Report } from "../../api";
type Statistics = { total: number; statuses: Record<string, number> };
export function useReports(
  token: string | null,
  setError: (error: string) => void,
  setScreen: (view: string) => void,
) {
  const [reports, setReports] = useState<Page<Report>>();
  const [stats, setStats] = useState<Statistics>();
  const [selected, setSelected] = useState<Report>();
  async function load(page = 1) {
    const [reports, stats] = await Promise.all([
      api<Page<Report>>("reports?page=" + page),
      api<Statistics>("dashboard"),
    ]);
    setReports(reports);
    setStats(stats);
  }
  async function detail(id: number) {
    setSelected(await api<Report>("reports/" + id));
    setScreen("detail");
  }
  useEffect(() => {
    let cancelled = false;
    if (!token) {
      Promise.resolve().then(() => {
        if (!cancelled) {
          setReports(undefined);
          setStats(undefined);
          setSelected(undefined);
        }
      });
      return () => {
        cancelled = true;
      };
    }
    Promise.all([
      api<Page<Report>>("reports?page=1"),
      api<Statistics>("dashboard"),
    ])
      .then(([reports, stats]) => {
        if (!cancelled) {
          setReports(reports);
          setStats(stats);
        }
      })
      .catch((error: Error) => {
        if (!cancelled) setError(error.message);
      });
    return () => {
      cancelled = true;
    };
  }, [token, setError]);
  return { reports, stats, selected, load, detail };
}
