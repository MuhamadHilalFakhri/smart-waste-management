<?php
namespace App\Services;
use Illuminate\Support\Facades\{Http,Storage};
class PredictionClient {
 public function predict(string $path):array {
 $stream=Storage::disk('local')->readStream($path);
 try{return Http::withToken(config('ml.token'))->timeout(30)->attach('file',$stream,basename($path))->post(config('ml.url').'/predict')->throw()->json();}finally{if(is_resource($stream))fclose($stream);}
 }
}