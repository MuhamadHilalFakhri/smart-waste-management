<?php
namespace App\Policies;
use App\Models\{User,Report};
class ReportPolicy {
 public function view(User $u,Report $r):bool{return $u->role==='admin'||$r->user_id===$u->id;}
 public function update(User $u,Report $r):bool{return $u->role==='admin'||($r->user_id===$u->id&&$r->status==='pending');}
 public function delete(User $u,Report $r):bool{return $this->update($u,$r);}
}