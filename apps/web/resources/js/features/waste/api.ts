export async function api<T = unknown>(path: string, init: RequestInit = {}): Promise<T> {
 const response = await fetch('/data/' + path, {...init, headers: {Accept:'application/json','X-CSRF-TOKEN':document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '', ...(init.body instanceof FormData ? {} : {'Content-Type':'application/json'}), ...init.headers}});
 if (!response.ok) { const error = await response.json().catch(() => ({})); throw new Error(Object.values(error.errors ?? {}).flat().join(' ') || error.message || 'Permintaan gagal.'); }
 return response.status === 204 ? undefined as T : response.json();
}
export type Report = {id:number;number:string;description:string;category:string|null;status:string;latitude:string;longitude:string;created_at:string;prediction?:{status:string;label:string|null;confidence:number|null};histories?:{id:number;to_status:string;note:string|null;created_at:string}[]};
export type Page<T> = {data:T[];current_page:number;last_page:number;total:number};
export const statuses: Record<string,string> = {pending:'Pending',in_progress:'In Progress',completed:'Completed',rejected:'Rejected'};
export const categories: Record<string,string> = {organic:'Organic Waste',plastic:'Plastic Waste',paper:'Paper Waste'};
