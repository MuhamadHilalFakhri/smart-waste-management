<?php
namespace App\Actions;
use App\Models\{Report,User};
use App\Jobs\PredictReport;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\{Str,Facades\DB};
class SaveReport {
 public function execute(User $u,array $data,?UploadedFile $photo,?Report $report=null):Report {
 return DB::transaction(function()use($u,$data,$photo,$report){
 $new=!$report;$report??=new Report(['user_id'=>$u->id,'number'=>(string)Str::uuid(),'status'=>'pending']);
 $report->fill($data);
 if($photo){$report->photo_path=$photo->store('reports','local');$report->photo_version=(string)Str::uuid();}
 $report->save();
 if($new)$report->histories()->create(['user_id'=>$u->id,'from_status'=>null,'to_status'=>'pending']);
 if($photo){$report->prediction()->updateOrCreate([],['status'=>'pending','label'=>null,'confidence'=>null,'probabilities'=>null,'model_version'=>null]);PredictReport::dispatch($report->id,$report->photo_version)->afterCommit();}
 return $report->load(['prediction','histories']);
 });
 }
}