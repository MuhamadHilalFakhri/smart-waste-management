<?php
namespace App\Services;
use Illuminate\Support\Facades\{Http,Storage};
class PredictionClient {
 public function predict(string $path):array {
 $stream=Storage::disk('local')->readStream($path);
 try{$result=Http::withToken(config('ml.token'))->timeout(30)->attach('file',$stream,basename($path))->post(config('ml.url').'/predict')->throw()->json();return \Illuminate\Support\Facades\Validator::make($result,['label'=>'required|in:organic,paper,plastic','confidence'=>'required|numeric|between:0,1','probabilities'=>'required|array:organic,paper,plastic','probabilities.*'=>'required|numeric|between:0,1','model_version'=>'required|string|max:100'])->validate();}finally{if(is_resource($stream))fclose($stream);}
 }
}