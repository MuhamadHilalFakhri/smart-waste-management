<?php
namespace App\Http\Controllers;
use App\Models\Report;
use App\Actions\SaveReport;
use App\Http\Requests\SaveReportRequest;
use App\Jobs\PredictReport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\{Gate,DB,Storage};
use Illuminate\Validation\ValidationException;
class ReportController {
 public function index(Request $r){$q=Report::visibleTo($r->user())->with('prediction');if($s=$r->query('search'))$q->where(fn($q)=>$q->where('number','like',"%$s%")->orWhere('description','like',"%$s%"));foreach(['status','category'] as $key)if($v=$r->query($key))$q->where($key,$v);foreach(['from'=>'>=','to'=>'<='] as $k=>$op)if($v=$r->query($k))$q->whereDate('created_at',$op,$v);return $q->latest()->paginate(15)->withQueryString();}
 public function show(Report $report){Gate::authorize('view',$report);return $report->load(['prediction','histories']);}
 public function store(SaveReportRequest $r,SaveReport $action){return response()->json($action->execute($r->user(),$r->safe()->except('photo'),$r->file('photo')),201);}
 public function update(SaveReportRequest $r,Report $report,SaveReport $action){Gate::authorize('update',$report);return $action->execute($r->user(),$r->safe()->except('photo'),$r->file('photo'),$report);}
 public function destroy(Report $report){Gate::authorize('delete',$report);$report->delete();return response()->noContent();}
 public function photo(Report $report){Gate::authorize('view',$report);return Storage::disk('local')->response($report->photo_path);}
 public function retry(Report $report){Gate::authorize('update',$report);$report->prediction()->update(['status'=>'pending']);PredictReport::dispatch($report->id,$report->photo_version);return response()->json(['message'=>'Prediksi dijadwalkan.'],202);}
 public function status(Request $r,Report $report){abort_unless($r->user()->role==='admin',403);$d=$r->validate(['status'=>'required|in:in_progress,completed,rejected','note'=>'nullable|string|max:2000']);return DB::transaction(function()use($r,$report,$d){$report=Report::lockForUpdate()->findOrFail($report->id);$allowed=['pending'=>['in_progress','rejected'],'in_progress'=>['completed','rejected']];if(!in_array($d['status'],$allowed[$report->status]??[])||($d['status']==='rejected'&&empty($d['note'])))throw ValidationException::withMessages(['status'=>'Transisi tidak valid atau alasan penolakan kosong.']);$report->histories()->create(['user_id'=>$r->user()->id,'from_status'=>$report->status,'to_status'=>$d['status'],'note'=>$d['note']??null]);$report->update(['status'=>$d['status']]);return $report;});}
 public function dashboard(Request $r){$q=Report::visibleTo($r->user());return ['total'=>(clone $q)->count(),'statuses'=>(clone $q)->selectRaw('status, count(*) as total')->groupBy('status')->pluck('total','status'),'categories'=>(clone $q)->selectRaw('category, count(*) as total')->groupBy('category')->get(),'trend'=>(clone $q)->where('created_at','>=',now()->subDays(29))->selectRaw('DATE(created_at) as date, count(*) as total')->groupByRaw('DATE(created_at)')->orderBy('date')->get()];}
}