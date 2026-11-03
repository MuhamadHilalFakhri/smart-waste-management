import {Link, usePage, router} from '@inertiajs/react';
import type {ReactNode} from 'react';
import './waste.css';
export default function Shell({title,children}:{title:string;children:ReactNode}) {
 const {auth} = usePage().props as unknown as {auth:{user:{name:string;role:string}}};
 return <div className="waste"><header><Link href="/dashboard" className="brand">Smart Waste<span>Pengelolaan laporan sampah</span></Link><nav><Link href="/dashboard">Dashboard</Link><Link href="/reports">Laporan</Link>{auth.user.role==='admin'&&<Link href="/users">Pengguna</Link>}<button onClick={()=>router.post('/logout')}>Keluar</button></nav></header><main><div className="heading"><div><p className="eyebrow">{auth.user.role==='admin'?'ADMINISTRATOR':'RUANG PELAPOR'}</p><h1>{title}</h1></div><p>{auth.user.name}</p></div>{children}</main><footer>Smart Waste · Laporan yang tercatat, penanganan yang terpantau.</footer></div>;
}